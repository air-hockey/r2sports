import casual from 'casual'
import dayjs from 'dayjs'

import Player from './player'

import rounds from './data/rounds.json'
import events from './data/events.json'

export default function() {
  let gamesAmount = casual.integer(1, 7)
  if (gamesAmount % 2 !== 1) gamesAmount++

  const challengerScores = []
  const defenderScores = []
  let challengerScore = 0
  let defenderScore = 0

  while (challengerScore < gamesAmount / 2 && defenderScore < gamesAmount / 2) {
    const challengerWon = casual.coin_flip

    challengerWon ? challengerScore++ : defenderScore++

    challengerScores.push(challengerWon ? 7 : casual.integer(0, 6))
    defenderScores.push(challengerWon ? casual.integer(0, 6) : 7)
  }

  const challenger = new Player()
  let defender = new Player()
  while (defender.fullName === challenger.fullName) {
    defender = new Player()
  }

  return {
    lastModified: dayjs(new Date())
      .subtract(casual.integer(0, 30), 'day')
      .subtract(casual.integer(0, 12), 'month')
      .subtract(casual.integer(0, 12), 'hour')
      .subtract(casual.integer(0, 60), 'minute')
      .subtract(casual.integer(0, 60), 'second')
      .format(),
    name: `${casual.random_element(events).name} - ${casual.random_element(
      rounds
    )}`,
    challenger,
    defender,
    challengerScores,
    defenderScores,
    challengerScore,
    defenderScore
  }
}
