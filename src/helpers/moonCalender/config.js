export const toneTextTable = [
  'magnetic', 'lunar', 'electric', 'self_existing', 'overtone',
  'rhythmic', 'resonant', 'galactic', 'solar', 'planetary',
  'spectral', 'crystal', 'cosmic'
]

export const sealTextTable = [
  'sun', 'dragon', 'wind', 'night', 'seed',
  'snake', 'world_bridge', 'hand', 'star', 'moon',
  'dog', 'monkey', 'human', 'skywoler', 'wizard',
  'eagle', 'warrior', 'earth', 'mirror', 'storm'
]

export const sealColorTable = {
  'red': [1, 5, 9, 13, 17],
  'white': [2, 6, 10, 14, 18],
  'blue': [3, 7, 11, 15, 19],
  'yellow': [0, 4, 8, 12, 16],
}

export const timeZones = {
  'right': [0, 1, 2, 3, 4, 5],
  'top': [6, 7, 8, 9, 10, 11],
  'left': [12, 13, 14, 15, 16, 17],
  'bottom': [18, 19, 20, 21, 22, 23]
}

export const positionTextTable = {
  'top': 'guide',
  'middle': 'important',
  'bottom': 'potential',
  'left': 'challenge',
  'right': 'support'
}

export const guideSealGroups = {
  0: [0, 12, 4, 16, 8],
  1: [1, 13, 5, 17, 9],
  2: [2, 14, 6, 18, 10],
  3: [3, 15, 7, 19, 11],
  4: [4, 16, 8, 0, 12],
  5: [5, 17, 9, 1, 13],
  6: [6, 18, 10, 2, 14],
  7: [7, 19, 11, 3, 15],
  8: [8, 0, 12, 4, 16],
  9: [9, 1, 13, 5, 17],
  10: [10, 2, 14, 6, 18],
  11: [11, 3, 15, 7, 19],
  12: [12, 4, 16, 8, 0],
  13: [13, 5, 17, 9, 1],
  14: [14, 6, 18, 10, 2],
  15: [15, 7, 19, 11, 3],
  16: [16, 8, 0, 12, 4],
  17: [17, 9, 1, 13, 5],
  18: [18, 10, 2, 14, 6],
  19: [19, 11, 3, 15, 7]
}

export const monthTable = {
  1: 0,
  2: 31,
  3: 59,
  4: 90,
  5: 120,
  6: 151,
  7: 181,
  8: 212,
  9: 243,
  10: 13,
  11: 44,
  12: 74
}

export const yearTable = {
  172: [2020, ]
}

export default {
  toneTextTable,
  sealTextTable,
  positionTextTable,
  guideSealGroups,
  sealColorTable,
  monthTable,
  yearTable,
  timeZones,
}