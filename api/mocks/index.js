import casual from 'casual'
import dayjs from 'dayjs'
import { MockList } from 'graphql-yoga'

const players = [
  'Mark Brouch',
  'Brandon Hedrick',
  'Dan Meyer',
  'Brian Quezada',
  'Billy Stubbs',
  'Matt Lemoyne',
  'Allison DiMichele',
  'Maris Benz',
  'Eric Rood',
  'Chase Thompson',
  'Brian Niebhur'
]

const events = [
  { name: '2018 AHPA World Championships', location: 'Colorado Springs, CO' },
  { name: '2018 Texas State Open', location: 'Houston, TX' },
  { name: '2018 USAA World Championships', location: 'Chicago, IL' }
]

const rounds = [
  'Round 1',
  'Round 2',
  'Round 3',
  'Round 4',
  'Quarterfinals',
  'Semifinals',
  'Finals'
]

const coverPhotos = ['air-hockey-1.jpg', 'air-hockey-2.jpg', 'air-hockey-3.jpg']

export default {
  Query: () => ({
    feed: () => new MockList([2, 10]),
    tournaments: () => new MockList([2, 5])
  }),
  Player: () => {
    const player = casual.random_element(players)

    const name = player.split(' ')

    return {
      firstName: name[0],
      lastName: name[1],
      fullName: player,
      avatar: `https://ui-avatars.com/api/?size=100&name=${name[0]}+${name[1]}`
    }
  },
  Match: () => {
    let gamesAmount = casual.integer(1, 7)
    if (gamesAmount % 2 !== 1) gamesAmount++

    const challengerScores = []
    const defenderScores = []
    let challengerScore = 0
    let defenderScore = 0

    while (
      challengerScore < gamesAmount / 2 &&
      defenderScore < gamesAmount / 2
    ) {
      const challengerWon = casual.coin_flip

      challengerWon ? challengerScore++ : defenderScore++

      challengerScores.push(challengerWon ? 7 : casual.integer(0, 6))
      defenderScores.push(challengerWon ? casual.integer(0, 6) : 7)
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
      challengerScores,
      defenderScores,
      challengerScore,
      defenderScore
    }
  },
  Tournament: () => {
    const { name, location } = casual.random_element(events)
    const startDate = dayjs(new Date())
      .add(casual.integer(-30, 30), 'day')
      .add(casual.integer(-12, 12), 'month')
      .format()
    const endDate = dayjs(startDate)
      .add(casual.integer(0, 2), 'day')
      .format()

    return {
      name,
      location,
      startDate,
      endDate,
      cover: `/assets/images/${casual.random_element(coverPhotos)}`
    }
  }
}
