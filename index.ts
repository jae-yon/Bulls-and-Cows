import readline from 'readline';
import { showStats } from './stats';
import { gameRecord, initRecord, showRecord } from './record';
import { BallNumber, Command, Computer, Message, User } from './types';

const inputInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function inputCommand(message: string): Promise<number> {
  return new Promise((resolve) => {
    inputInterface.question(message, (inputValue) => {
      resolve(parseInt(inputValue));
    });
  });
}

function inputNumbers(message: string): Promise<BallNumber[]> {
  return new Promise((resolve) => {
    inputInterface.question(message, (inputValue) => {
      const userNumbers = inputValue.split("").map((value) => parseInt(value)) as BallNumber[];
      resolve(userNumbers);
    });
  });
}

init();

export async function init() {
  const userCommand = await inputCommand("게임을 새로 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 종료하려면 9을 입력하세요.\n");
  switch (userCommand) {
    case Command.start:
      resetGame();
      break;
    case Command.record:
      showRecord();
      init();
      break;
    case Command.stats:
      showStats(gameRecord);
      init();
      break;
    case Command.end:
      console.log(Message.gameEnd);
      inputInterface.close();
      break;
    default:
      console.log(Message.inputError);
      init();
      break;
  }
}

async function resetGame() {
  const tryLimit = await inputCommand("[시도 횟수]를 입력해주세요.\n");
  if (tryLimit) {
    const computer: Computer = { numbers : createRandomNumbers() };
    const user: User = { numbers : [], tryCount : 0, tryLimit : tryLimit };
    gameRecord.totalGames++;
    initRecord(gameRecord.totalGames);
    gameRecord.gameResults[gameRecord.totalGames-1].tryLimit = tryLimit;
    gameRecord.gameResults[gameRecord.totalGames-1].startTime = currentTime();
    gameRecord.gameResults[gameRecord.totalGames-1].computerNumber.push(...computer.numbers);
    console.log(Message.gameStart);
    playGame(computer, user);
  } else {
    console.log(Message.inputError);
    return resetGame();
  }
}

async function playGame(computer : Computer, user : User) {
  if (user.tryLimit !== user.tryCount) {
    const userNumbers: BallNumber[] = await inputNumbers("숫자를 입력해주세요 : ");
    if (ValidateInputNumbers(userNumbers)) {
      user.numbers = userNumbers;
      user.tryCount++;
      if (resultMessage(computer, user)) {
        gameRecord.gameResults[gameRecord.totalGames-1].logs.push({userNumber: user.numbers, resultMessage: resultMessage(computer, user)});
        gameRecord.gameResults[gameRecord.totalGames-1].tryCount = user.tryCount;
        console.log(`\n=========<< ${resultMessage(computer, user)} >>=========`);
        if (resultMessage(computer, user) === "HOMERUN") {
          gameRecord.gameResults[gameRecord.totalGames-1].winner = "유저";
          gameRecord.gameResults[gameRecord.totalGames-1].endTime = currentTime();
          console.log(Message.userVictory);
          return init();
        } else {
          return playGame(computer, user);
        }
      }
    } else {
      console.log(`${Message.inputError}`+`${Message.userNumberError}`);
      return playGame(computer, user);
    }
  } else {
    gameRecord.gameResults[gameRecord.totalGames-1].winner = "컴퓨터";
    gameRecord.gameResults[gameRecord.totalGames-1].endTime = currentTime();
    console.log(`\n[${user.tryLimit}]`+`${Message.computerVictory}`);
    return init();
  }
}

function currentTime() {
  const TIME_ZONE = 9 * 60 * 60 * 1000;
  const date = new Date();
  return new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
}

function createRandomNumbers(): BallNumber[] {
  const baseNumbers: BallNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const randomNumbers: BallNumber[] = baseNumbers.sort(() => Math.random() - 0.5).slice(0, 3);
  return randomNumbers;
}

function ValidateInputNumbers(userNumbers: BallNumber[]) {
  return (
    userNumbers.length === 3
    &&
    userNumbers.every((num) => num >= 1 && num <= 9)
    &&
    [...new Set(userNumbers)].length === 3
  );
}

function countStrike(computer : Computer, user : User) {
  return user.numbers.filter((userNumber, index) => index === computer.numbers.indexOf(userNumber)).length;
}

function countBall(computer : Computer, user : User) {
  return user.numbers.filter((userNumber, index) => index !== computer.numbers.indexOf(userNumber) && computer.numbers.includes(userNumber)).length;
}

function resultMessage(computer : Computer, user : User) {
  const strikes = countStrike(computer, user);
  const balls = countBall(computer, user);

  if (strikes === 3) {
    return "HOMERUN";
  } else if (strikes === 0 && balls === 0) {
    return "NOTIHING";
  } else {
    return `[${strikes}]STRIKE, [${balls}]BALL`;
  }
}