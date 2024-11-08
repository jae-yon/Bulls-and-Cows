import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

rl.on('line', (input:number) => {

  console.log("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.");
  
  // 숫자 3자리 문자열, 0, 중복
  if (validateNumber(input) === false) {
    console.log("다시 입력하세요.");
  } else {
    // 게임 시작
    const num = randomNum();
    gameStart(input, num);
  }

  rl.close();
});

// 컴퓨터 숫자
function randomNum() {
  // Math.random() => 0~1(1은 미포함) 구간에서 부동소수점의 난수를 생성
  let comNum;
  do {
    comNum = Math.floor(Math.random() * 900 + 100);
  } while (validateNumber(comNum) === false);
  return comNum;
};

function gameStart(userNum:number, comNum:number) {
  console.log(`${userNum}, ${comNum}`);
}