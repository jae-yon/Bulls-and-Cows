export type BallNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export enum Command {
  start = 1,
  record = 2,
  stats = 3,
  end = 9,
}

export interface Computer {
  numbers: BallNumber[];
}

export interface User {
  numbers: BallNumber[];
  tryLimit: number;
  tryCount: number;
}