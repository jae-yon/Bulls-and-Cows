import { GameRecord } from "./types";

export const gameRecord: GameRecord = {
  totalGames: 0,
  gameResults: [],
}

export function initRecord(id:number) {
  gameRecord.gameResults.push(
    {
      id: id,
      startTime: "",
      endTime: "",
      tryLimit: 0,
      tryCount: 0,
      winner: "컴퓨터",
      computerNumber: [],
      logs: [],
    }
  );
}

export function showRecord() {
  if (gameRecord.totalGames === 0) {
    console.log("\n====================\n게임 기록이 없습니다\n====================\n");
  } else {
    console.log("\n==========<< 게임기록 >>==========\n");
    console.log(`게임 총 횟수 : ${gameRecord.totalGames}판\n`);
    gameRecord.gameResults.forEach((game) => {
      const message = `==========<< [${game.id}]째 게임 >>==========\n`
      +`\n승리한 플레이어 : ${game.winner}\n`
      +`\n시작 시간 : ${game.startTime}\n`
      +`\n종료 시간 : ${game.endTime}\n`
      +`\n시도 가능 횟수 : ${game.tryLimit}회\n`
      +`\n시도한 횟수 : ${game.tryCount}회\n`
      +`\n컴퓨터 숫자 : ${game.computerNumber}\n`
      +`\n==========[[ 유저 입력 결과 ]]==========\n`;
      console.log(message);
      game.logs.forEach((log) => {
        console.log(`입력 숫자 : ${log.userNumber} / 결과 : ${log.resultMessage}`);
      });
    });
    console.log("\n==========<< 기록종료 >>==========\n");
  }
}