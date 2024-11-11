import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

gameInit();

// 게임 시작
function gameInit() {

  const randomNumber = randomNum();

  rl.question("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.\n", function(input) {
    switch (input) {
      case "1":
        gamePlay(randomNumber);
        break;
      case "9":
        console.log("애플리케이션이 종료되었습니다.");
        rl.close();
        break;
      default:
        break;
    }
    
  });

  rl.on("close", function() {
    process.exit();
  });
}

// 게임
function gamePlay(randomNumber:number) {
  rl.question("숫자를 입력해주세요: ", (input) => {
    switch (input) {
      case "2":
        console.log("애플리케이션이 종료되었습니다.");
        rl.close();
        break;
      default:
        if (validateNumber(Number(input)) === false) {
          console.log("1~9 서로 다른 임의의 수 3개를 선택");
          gamePlay(randomNumber);
        } else {
          if (numCompare(randomNumber, Number(input)).strike === 3) {
            console.log("*****HOMERUN*****\n");
            console.log("3개의 숫자를 모두 맞히셨습니다.\n-------게임 종료-------");
            rl.close();
          } else {
            const ball = numCompare(randomNumber, Number(input)).ball;
            const strike = numCompare(randomNumber, Number(input)).strike;
            console.log(`${ball}볼 ${strike}스트라이크`);
            gamePlay(randomNumber);
            
            // console.log(randomNumber);
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
function validateNumber(num:number) {
  const regExp = /^\d{3}$/; 
  if (
    !regExp.test(String(num)) // 3자리 확인
    || 
    String(num).split("").some((num) => num === "0") // 0 거르기
    || 
    [...new Set(String(num))].length !== 3 // 중복값 거르기
  ) {
    return false;
  } else {
    return true;
  }
}

// 랜덤 숫자 생성
function randomNum() {
  // Math.random() => 0~1(1은 미포함) 구간에서 부동소수점의 난수를 생성
  let comNum;
  do {
    comNum = Math.floor(Math.random() * 900 + 100);
  } while (validateNumber(comNum) === false);
  return comNum;
};

// 숫자 비교
function numCompare(comNum:number, userNum:number) {
  const comNumArr = String(comNum).split("");
  const userNumArr = String(userNum).split("");

  const result = {
    strike: 0,
    ball: 0,
    noting: 0,
  }

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

