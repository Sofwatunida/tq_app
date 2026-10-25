-- =============================================================================
-- 002_hapus_user_cascade.sql
-- Hapus user di profiles => semua data turunannya ikut terhapus otomatis.
--
-- Masalah:
--   Menghapus baris di tabel profiles gagal dengan error:
--     "Unable to delete rows as one of them is currently referenced by a
--      foreign key constraint from the table hasil_kuis ..."
--   Karena FK hasil_kuis_user_id_fkey (dan FK lain ke profiles) memakai
--   ON DELETE NO ACTION (bawaan Supabase).
--
-- Solusi:
--   Semua foreign key yang mereferensikan public.profiles diubah menjadi
--   ON DELETE CASCADE. Jadi saat baris user dihapus (baik dari Table Editor
--   Dashboard, SQL Editor, maupun kode), data berikut ikut terhapus:
--     - hasil_kuis      (nilai kuis per level)
--     - progress_materi (progress membaca materi)
--     - tabel lain yang saat ini/mendatang mereferensikan profiles
--
-- Cara menjalankan:
--   1. Buka Supabase Dashboard > SQL Editor > New query
--   2. Tempel seluruh isi file ini
--   3. Klik Run
--
-- File ini aman dijalankan berulang kali (idempotent).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. ON DELETE CASCADE untuk semua FK ke public.profiles
--    Blok ini menemukan setiap foreign key yang mereferensikan profiles
--    lalu membuat ulang konstraintnya dengan ON DELETE CASCADE.
-- -----------------------------------------------------------------------------
do $$
declare
  rec        record;
  cols_local text;
  cols_ref   text;
  extras     text;
begin
  for rec in
    select c.conrelid,
           c.conrelid::regclass::text as rel_text,
           c.conname,
           c.condeferrable,
           c.condeferred,
           c.conkey,
           c.confrelid,
           c.confkey,
           c.confdeltype
      from pg_constraint c
     where c.contype = 'f'
       and c.confrelid = 'public.profiles'::regclass
  loop
    -- Sudah cascade? lewati supaya tetap idempotent.
    continue when rec.confdeltype = 'c';

    -- Susun daftar kolom lokal sesuai urutan konstraint.
    select string_agg(a.attname, ', ' order by u.ord)
      into cols_local
      from unnest(rec.conkey) with ordinality as u(attnum, ord)
      join pg_attribute a
        on a.attrelid = rec.conrelid
       and a.attnum = u.attnum;

    -- Susun daftar kolom profiles yang direferensikan.
    select string_agg(a.attname, ', ' order by u.ord)
      into cols_ref
      from unnest(rec.confkey) with ordinality as u(attnum, ord)
      join pg_attribute a
        on a.attrelid = rec.confrelid
       and a.attnum = u.attnum;

    -- Pertahankan atribut deferrable bila ada.
    extras := case
      when rec.condeferrable and rec.condeferred then ' deferrable initially deferred'
      when rec.condeferrable                     then ' deferrable'
      else ''
    end;

    execute format(
      'alter table %s drop constraint %I',
      rec.rel_text, rec.conname
    );
    execute format(
      'alter table %s add constraint %I foreign key (%s) references %s (%s) on delete cascade%s',
      rec.rel_text, rec.conname, cols_local,
      rec.confrelid::regclass::text, cols_ref, extras
    );
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- 2. profiles -> auth.users juga ON DELETE CASCADE (jika konstraintnya ada)
--    Dengan ini, menghapus user dari Dashboard > Authentication > Users akan
--    otomatis menghapus baris profiles beserta semua data turunannya.
-- -----------------------------------------------------------------------------
do $$
declare
  rec        record;
  cols_local text;
  cols_ref   text;
  extras     text;
begin
  for rec in
    select c.conrelid,
           c.conrelid::regclass::text as rel_text,
           c.conname,
           c.condeferrable,
           c.condeferred,
           c.conkey,
           c.confrelid,
           c.confkey,
           c.confdeltype
      from pg_constraint c
     where c.contype = 'f'
       and c.conrelid = 'public.profiles'::regclass
       and c.confrelid = 'auth.users'::regclass
  loop
    continue when rec.confdeltype = 'c';

    select string_agg(a.attname, ', ' order by u.ord)
      into cols_local
      from unnest(rec.conkey) with ordinality as u(attnum, ord)
      join pg_attribute a
        on a.attrelid = rec.conrelid
       and a.attnum = u.attnum;

    select string_agg(a.attname, ', ' order by u.ord)
      into cols_ref
      from unnest(rec.confkey) with ordinality as u(attnum, ord)
      join pg_attribute a
        on a.attrelid = rec.confrelid
       and a.attnum = u.attnum;

    extras := case
      when rec.condeferrable and rec.condeferred then ' deferrable initially deferred'
      when rec.condeferrable                     then ' deferrable'
      else ''
    end;

    execute format(
      'alter table %s drop constraint %I',
      rec.rel_text, rec.conname
    );
    execute format(
      'alter table %s add constraint %I foreign key (%s) references %s (%s) on delete cascade%s',
      rec.rel_text, rec.conname, cols_local,
      rec.confrelid::regclass::text, cols_ref, extras
    );
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- 3. Index untuk performa
--    Saat user dihapus, database harus cepat menemukan baris turunan yang
--    harus ikut dihapus. FK otomatis memakai index di kolom lokal bila ada
--    index yang cocok; index ini menutup pemakaian yang umum di aplikasi.
-- -----------------------------------------------------------------------------
create index if not exists hasil_kuis_user_id_idx
  on public.hasil_kuis (user_id);

create index if not exists progress_materi_user_id_idx
  on public.progress_materi (user_id);

-- -----------------------------------------------------------------------------
-- 4. Verifikasi (opsional): jalankan query ini untuk memastikan semua FK
--    ke profiles sudah ON DELETE CASCADE (kolom deltype harus selalu "c").
-- -----------------------------------------------------------------------------
-- select
--   c.conrelid::regclass::text as tabel,
--   c.conname                  as constraint_name,
--   c.confdeltype              as deltype  -- 'c' = cascade, 'a' = no action
-- from pg_constraint c
-- where c.contype = 'f'
--   and c.confrelid = 'public.profiles'::regclass;
