export const inputs = [
  "porcentArena",
  "porcentLimos",
  "porcentArcilla",
  "phSuelo",
  "conductividadElectrica",
  "intercambioCationico",
];
export const inRange = (range, value) => value >= range[1] && value <= range[0];
export const ranges = {
  1: {
    arena: [100, 85],
    limo: [15, 0],
    arcilla: [10, 0],
  },
  2: {
    arena: [90, 70],
    limo: [30, 0],
    arcilla: [15, 0],
  },
  11: {
    arena: [85, 43],
    limo: [50, 0],
    arcilla: [20, 0],
  },
  3: {
    arena: [52, 23],
    limo: [50, 32],
    arcilla: [27, 7],
  },
  4: {
    arena: [50, 0],
    limo: [87, 50],
    arcilla: [27, 0],
  },
  5: {
    arena: [20, 0],
    limo: [100, 80],
    arcilla: [12, 0],
  },
  6: {
    arena: [80, 45],
    limo: [28, 0],
    arcilla: [35, 20],
  },
  10: {
    arena: [45, 20],
    limo: [53, 15],
    arcilla: [40, 27],
  },
  7: {
    arena: [20, 0],
    limo: [73, 40],
    arcilla: [40, 27],
  },
  8: {
    arena: [67, 45],
    limo: [20, 0],
    arcilla: [55, 35],
  },
  12: {
    arena: [20, 0],
    limo: [60, 40],
    arcilla: [60, 40],
  },
  9: {
    arena: [45, 0],
    limo: [40, 0],
    arcilla: [100, 40],
  },
};
