import { GameRecord } from "./types";

export function showStats(gameRecord : GameRecord) {
  if (gameRecord.totalGames === 0) {
    console.log("\n====================\n게임 기록이 없습니다\n====================\n");
  } else {
    console.log("\n==========<< 게임통계 >>==========\n");

    console.log(`유저가 입력한 최소 [시도 횟수]값 : ${getStats(gameRecord).tryLimitInfo.minLimit}회`
    +`(${getStats(gameRecord).tryLimitInfo.minId}회차 게임)\n`);
    console.log(`유저가 입력한 최대 [시도 횟수]값 : ${getStats(gameRecord).tryLimitInfo.maxLimit}회`
    +`(${getStats(gameRecord).tryLimitInfo.maxId}회차 게임)\n`);
    console.log(`유저가 입력한 평균 [시도 횟수]값 : ${getStats(gameRecord).tryLimitInfo.aveLimit}회\n`);

    console.log(`유저의 최소 시도 횟수 : ${getStats(gameRecord).tryCountInfo.minTry}회`
    +`(${getStats(gameRecord).tryCountInfo.minId}회차 게임)\n`);
    console.log(`유저의 최대 시도 횟수 : ${getStats(gameRecord).tryCountInfo.maxTry}회`
    +`(${getStats(gameRecord).tryCountInfo.maxId}회차 게임)\n`);
    console.log(`유저의 평균 시도 횟수 : ${getStats(gameRecord).tryCountInfo.aveTry}회\n`);
    
    console.log(`유저의 승리 횟수 : ${getStats(gameRecord).ratingInfo.userWins}회\n`);
    console.log(`유저의 승률 : ${getStats(gameRecord).ratingInfo.userRate}%\n`);
    console.log(`컴퓨터의 승리 횟수 : ${getStats(gameRecord).ratingInfo.computerWins}회\n`);
    console.log(`컴퓨터의 승률 : ${getStats(gameRecord).ratingInfo.computerRate}%`);

    console.log("\n==========<< 통계종료 >>==========\n");
  }
}

function getStats(gameRecord : GameRecord) {
  const tryLimits = gameRecord.gameResults.map((game) => game.tryLimit);
  const tryLimitInfo = {
    maxLimit: Math.max(...tryLimits),
    minLimit: Math.min(...tryLimits),
    aveLimit: Math.floor(tryLimits.reduce((total, current) => total + current) / tryLimits.length),
    maxId: gameRecord.gameResults.filter((game) => game.tryLimit === Math.max(...tryLimits)).map((game) => game.id),
    minId: gameRecord.gameResults.filter((game) => game.tryLimit === Math.min(...tryLimits)).map((game) => game.id),
  }

  const tryCounts = gameRecord.gameResults.map((game) => game.tryCount);
  const tryCountInfo = {
    maxTry: Math.max(...tryCounts),
    minTry: Math.min(...tryCounts),
    aveTry: Math.floor(tryCounts.reduce((total, current) => total + current) / tryCounts.length),
    maxId: gameRecord.gameResults.filter((game) => game.tryCount === Math.max(...tryCounts)).map((game) => game.id),
    minId: gameRecord.gameResults.filter((game) => game.tryCount === Math.min(...tryCounts)).map((game) => game.id),
  }

  const winners = gameRecord.gameResults.map((game) => game.winner);
  const ratingInfo = {
    userWins: winners.filter((winner) => winner === "유저").length,
    userRate: Math.floor((winners.filter((winner) => winner === "유저").length / gameRecord.totalGames) * 100),
    computerWins: winners.filter((winner) => winner === "컴퓨터").length,
    computerRate: Math.floor((winners.filter((winner) => winner === "컴퓨터").length / gameRecord.totalGames) * 100)
  }

  return { tryLimitInfo, tryCountInfo, ratingInfo }
}
