import readline from 'readline';
import { BallNumber, Command, Computer, User } from './types';
// 콘솔 입력 생성
const inputInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 명령 입력
function inputCommand(message: string): Promise<number> {
  return new Promise((resolve) => {
    inputInterface.question(message, (inputValue) => {
      resolve(parseInt(inputValue));
    });
  });
}
// 숫자 입력
function inputNumbers(message: string): Promise<BallNumber[]> {
  return new Promise((resolve) => {
    inputInterface.question(message, (inputValue) => {
      const userNumbers = inputValue.split("").map((value) => parseInt(value)) as BallNumber[];
      resolve(userNumbers);
    });
  });
}
// 랜덤 숫자 생성
function createRandomNumbers(): BallNumber[] {
  const baseNumbers: BallNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const randomNumbers: BallNumber[] = baseNumbers.sort(() => Math.random() - 0.5).slice(0, 3);
  return randomNumbers;
}
// 입력값 검사
function ValidateInputNumbers(userNumbers: BallNumber[]) {
  return (
    // 3자리 확인
    userNumbers.length === 3
    &&
    // 1~9 외의 값 확인
    userNumbers.every((num) => num >= 1 && num <= 9)
    &&
    // 중복값 확인 
    [...new Set(userNumbers)].length === 3
  );
}
// 스트라이크 찾기
function countStrike(computer : Computer, user : User) {
  return user.numbers.filter((userNumber, index) => index === computer.numbers.indexOf(userNumber)).length;
}
// 볼 찾기
function countBall(computer : Computer, user : User) {
  return user.numbers.filter((userNumber, index) => index !== computer.numbers.indexOf(userNumber) && computer.numbers.includes(userNumber)).length;
}
// 숫자 비교
function resultMessage(computer : Computer, user : User) {
  const strikes = countStrike(computer, user);
  const balls = countBall(computer, user);

  if (strikes === 3) {
    return "HOMERUN";
  } else if (strikes === 0 && balls === 0) {
    return "NOTIHING";
  } else {
    return `${strikes} 스트라이크 , ${balls} 볼`;
  }
}

init();

// 앱 시작
async function init() {
  const userCommand = await inputCommand("게임을 새로 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 종료하려면 9을 입력하세요.\n");

  switch (userCommand) {
    case Command.start:
      settingGame();
      break;
    case Command.record:
      console.log("게임종료");
      inputInterface.close();
      break;
    case Command.stats:
      console.log("게임종료");
      inputInterface.close();
      break;
    case Command.end:
      console.log("게임종료");
      inputInterface.close();
      break;
    default:
      console.log("입력실수");
      init();
      break;
  }
}

async function settingGame() {
  const tryLimit = await inputCommand("시도 횟수를 입력해주세요.\n");
  if (tryLimit) {
    const computer: Computer = { numbers : createRandomNumbers() };
    const user: User = { numbers : [], tryCount : 0, tryLimit : tryLimit }
    playGame(computer, user);
  } else {
    return settingGame();
  }
}

async function playGame(computer : Computer, user : User) {
  if (user.tryLimit !== user.tryCount) {
    const userNumbers: BallNumber[] = await inputNumbers("숫자를 입력해주세요 : ");
  
    if (ValidateInputNumbers(userNumbers)) {
      user.numbers = userNumbers;
      user.tryCount ++;
      if (resultMessage(computer, user) === "HOMERUN") {
        console.log(resultMessage(computer, user));
        return init();
      } else {
        console.log(resultMessage(computer, user));
        return playGame(computer, user);
      }
    } else {
      console.log("재입력");
      return playGame(computer, user);
    }
  } else {
    console.log("컴퓨터가 승리");
    return init();
  }
}