import readline from 'readline';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 50;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

gameStart();

// 게임 실행
function gameStart() {
  const randomNumber = createRandomNumber();
  rl.question("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.\n", function(userInput) {
    switch (userInput) {
      case "1": 
        playBall(randomNumber);
        break;
      case "9":
        console.log("애플리케이션이 종료되었습니다.");
        rl.close();
        break;
      default:
        gameStart();
        break;
    }
  });
  rl.on("close", function() {
    process.exit();
  });
}
// 게임
function playBall(randomNumber:number) {
  rl.question("숫자를 입력해주세요: ", (userInput) => {
    switch (userInput) {
      case "2":
        console.log("애플리케이션이 종료되었습니다.");
        rl.close();
        break;
      default:
        if (validateNumber(Number(userInput)) === false) {
          console.log("1~9 중 서로 중복되지 않는 숫자 3개를 선택해주세요.\n");
          playBall(randomNumber);
        } else {
          if (compareNumber(randomNumber, Number(userInput)).strike === 3) {
            console.log("--------HOMERUN--------\n");
            console.log("-------게임 종료-------");
            rl.close();
          } else {
            const ball = compareNumber(randomNumber, Number(userInput)).ball;
            const strike = compareNumber(randomNumber, Number(userInput)).strike;
            console.log(`${ball}볼 ${strike}스트라이크\n`);
            playBall(randomNumber);
          }
        }
        break;
    }
  });
  rl.on("close", function() {
    process.exit();
  });
}
// 숫자 검증
function validateNumber(verification:number) {
  const regExp = /^\d{3}$/; 
  if (
    !regExp.test(String(verification)) // 3자리 확인
    || 
    String(verification).split("").some((num) => num === "0") // 0 거르기
    || 
    [...new Set(String(verification))].length !== 3 // 중복값 거르기
  ) {
    return false;
  } else {
    return true;
  }
}
// 랜덤 숫자 생성
function createRandomNumber() {
  // Math.random() => 0~1(1은 미포함) 구간에서 부동소수점의 난수를 생성
  let comNum:number;
  do {
    comNum = Math.floor(Math.random() * 900 + 100);
  } while (validateNumber(comNum) === false);
  return comNum;
}
// 숫자 비교
function compareNumber(comNum:number, userNum:number) {
  const comNumArr = String(comNum).split("");
  const userNumArr = String(userNum).split("");
  const result = { strike: 0, ball: 0, noting: 0 }
  comNumArr.map((comNum, comNumIndex) => {
    userNumArr.some((userNum, userNumIndex) => {
      if (userNum === comNum && userNumIndex === comNumIndex) {
        result.strike++;
      } else if (userNum === comNum && userNumIndex !== comNumIndex){
        result.ball++;
      } else {
        result.noting++;
      }
    });
  });
  return result;
}