import React from "react";

const Register = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex  justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] ">
        <h1 className="font-medium text-lg ">Nama Pengguna</h1>
        <input
          type="text"
          className="mt-2 mb-2 p-2 border w-full border-gray-500 rounded-lg"
          placeholder="Nama"
        />
        <div>
         <div className="flex justify-center">
                       <button
            type="submit"
            className=" bg-blue-500 text-white px-6 py-2 rounded-lg "
          >
            Simpan
          </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Register;

