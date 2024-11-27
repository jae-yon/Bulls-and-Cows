export type Player = "컴퓨터" | "유저";

export type BallNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export enum Command {
  start = 1,
  record = 2,
  stats = 3,
  end = 9,
}

export enum Message {
  gameEnd = "\n==========<< 게임을 종료합니다 >>==========\n",
  gameStart = "\n==========<< 게임을 시작합니다 >>==========\n",
  inputError = "\n입력을 잘못했습니다!! 다시 입력해주세요.\n",
  userNumberError = "\n===<< 1~9 사이의 숫자 중 3개를 중복없이 입력해야합니다! >>===\n",
  userVictory = "\n축하합니다! 당신이 승리하였습니다!\n",
  computerVictory = "회 안에 맞추지 못하였습니다. 컴퓨터가 승리하였습니다.\n",
}

export interface Computer {
  numbers: BallNumber[];
}

export interface User {
  numbers: BallNumber[];
  tryLimit: number;
  tryCount: number;
}

export interface GameRecord {
  totalGames: number;
  gameResults : {
    id: number;
    startTime: string;
    endTime: string;
    tryLimit: number;
    tryCount: number;
    winner: Player;
    computerNumber: BallNumber[];
    logs: {
      userNumber: BallNumber[];
      resultMessage : string;
    }[];
  }[];
};