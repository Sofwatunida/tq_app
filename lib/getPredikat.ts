export const getPredikat = (poin: number) => {
  if (poin >= 90) {
    return "A+";
  } else if (poin >= 75) {
    return "A";
  } else if (poin >= 60) {
    return "B";
  } else if (poin >= 40) {
    return "C";
  } else {
    return "D";
  }
};
