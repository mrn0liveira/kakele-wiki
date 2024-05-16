export const disableNavWithFooter = [
  '/login',
  '/register',
  '/error',
  '/reset',
  '/new-verification',
  '/new-password',
  '/dashboard/settings',
  '/dashboard/blog',
  '/dashboard/**',
  '/map',
];

// Types of Markers
export const CITY = 'CITY';
export const VILLAGE = 'VILLAGE';
export const FARM = 'FARM';
export const DUNGEON = 'DUNGEON';
export const CAVE = 'CAVE';
export const FORT = 'FORT';
export const PORTAL = 'PORTAL';
export const TOWN = 'TOWN';
export const UNKNOWN = 'UNKNOWN';

// Zoom Levels
export const NEAR = 5;
export const MID = 4;
export const FAR = 3;

export const BlessPercentages = {
  Legendary: {
    0: 0,
    1: 50,
    2: 83,
    3: 108,
    4: 128,
    5: 145,
    6: 159,
    7: 171,
    8: 182,
    9: 192,
    10: 200,
  },
  Rare: {
    0: 0,
    1: 12.5,
    2: 20.83,
    3: 27.08,
    4: 32.08,
    5: 36.25,
    6: 39.82,
    7: 42.95,
    8: 45.72,
    9: 48.22,
    10: 50,
  },
  Uncommon: {
    0: 0,
    1: 6.25,
    2: 10.42,
    3: 13.54,
    4: 16.04,
    5: 18.13,
    6: 19.91,
    7: 21.47,
    8: 22.86,
    9: 24.11,
    10: 25,
  },
  Common: {
    0: 0,
    1: 2.5,
    2: 4.17,
    3: 5.42,
    4: 6.42,
    5: 7.25,
    6: 7.96,
    7: 8.59,
    8: 9.14,
    9: 9.64,
    10: 10,
  },
};
