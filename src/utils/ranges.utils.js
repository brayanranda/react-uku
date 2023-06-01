export const inputs = [
  "porcentArena",
  "porcentLimos",
  "porcentArcilla",
  "phSuelo",
  "conductividadElectrica",
  "intercambioCationico",
  "aluminioIntercambiable",
  "materiaOrganica",
];
export const ranges = {
  1: {
    arena: [85, 100],
    limo: [0, 15],
    arcilla: [0, 10],
  },
  2: {
    arena: [70, 84],
    limo: [0, 30],
    arcilla: [10, 20],
  },

  3: {
    arena: [44, 84],
    limo: [0, 50],
    arcilla: [0, 20],
  },
  4: {
    arena: [46, 79],
    limo: [0, 28],
    arcilla: [20, 35],
  },
  5: {
    arena: [46, 65],
    limo: [0, 20],
    arcilla: [36, 54],
  },
  6: {
    arena: [0, 45],
    limo: [0, 40],
    arcilla: [40, 100],
  },
  7: {
    arena: [0, 19],
    limo: [41, 60],
    arcilla: [40, 60],
  },
  8: {
    arena: [20, 44],
    limo: [15, 51],
    arcilla: [26, 39],
  },
  9: {
    arena: [0, 19],
    limo: [41, 71],
    arcilla: [26, 39],
  },
  10: {
    arena: [24, 51],
    limo: [29, 49],
    arcilla: [8, 25],
  },
  11: {
    arena: [0, 50],
    limo: [50, 86],
    arcilla: [0, 25],
  },
  12: {
    arena: [0, 20],
    limo: [80, 100],
    arcilla: [0, 12],
  },
};
export const inRange = (range, value) => value >= range[1] && value <= range[0];
export function validarTerreno(arena, limo, arcilla) {
  for (const key in ranges) {
    const terreno = ranges[key];
    const arenaValida = arena >= terreno.arena[0] && arena <= terreno.arena[1];
    const limoValido = limo >= terreno.limo[0] && limo <= terreno.limo[1];
    const arcillaValida =
      arcilla >= terreno.arcilla[0] && arcilla <= terreno.arcilla[1];
    if (arenaValida && limoValido && arcillaValida) {
      return true;
    }
  }
  return false;
}
