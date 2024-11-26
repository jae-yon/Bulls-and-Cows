import { init } from ".";
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
    console.log("\n==========게임기록==========\n");
    console.log(`게임 횟수 : ${gameRecord.totalGames}\n`);
    gameRecord.gameResults.forEach((game) => {
      const message = `=======< [${game.id}]째 게임 >=======\n`
      +`\n승리한 플레이어 : ${game.winner}\n`
      +`시작 시간 : ${game.startTime}\n`
      +`종료 시간 : ${game.endTime}\n`
      +`시도 가능 횟수 : ${game.tryLimit}번\n`
      +`시도한 횟수 : ${game.tryCount}번\n`
      +`컴퓨터 숫자 : ${game.computerNumber}\n`
      +`\n[유저 입력 결과]\n`;
      console.log(message);
      game.logs.forEach((log) => {
        console.log(`입력 숫자 : ${log.userNumber} / 입력 결과 : ${log.resultMessage}\n`);
      });
    });
    console.log("==========기록종료==========\n");
  }
  return init();
}