import casual from 'casual'
import dayjs from 'dayjs'
import { MockList } from 'graphql-yoga'

const players = [
  { fullName: 'Mark Brouch', location: 'Honolulu, HI' },
  { fullName: 'Brandon Hedrick', location: 'Chicago, IL' },
  { fullName: 'Dan Meyer', location: 'Chicago, IL' },
  { fullName: 'Brian Quezada', location: 'Chicago, IL' },
  { fullName: 'Billy Stubbs', location: 'Chicago, IL' },
  { fullName: 'Matt Lemoyne', location: 'Chicago, IL' },
  { fullName: 'Allison DiMichele', location: 'Chicago, IL' },
  { fullName: 'Maris Benz', location: 'Seattle, WA' },
  { fullName: 'Eric Rood', location: 'Chicago, IL' },
  { fullName: 'Chase Thompson', location: 'Chicago, IL' },
  { fullName: 'Brian Niebhur', location: 'Chicago, IL' }
]

const events = [
  {
    name: '2018 AHPA World Championships',
    slug: '2018-ahpa-world-championships',
    location: 'Colorado Springs, CO',
    description:
      'The 2018 AHPA World Championship Open Tournament is a USAA-sanctioned world ranking tournament, featuring a 64 player double-elimination bracket.'
  },
  {
    name: '2018 Texas State Open',
    slug: '2018-texas-state-open',
    location: 'Houston, TX',
    description:
      'The 2018 Texas State Open Tournament is a USAA-sanctioned rated tournament featuring a 32 player double-elimination bracket.'
  },
  {
    name: '2018 USAA World Championships',
    slug: '2018-usaa-world-championships',
    location: 'Chicago, IL',
    description:
      'The 2018 USAA World Chapionship Open Tournament is a USAA-sanctioned world ranking tournament featuring a 64 player double-elimination bracket.'
  }
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
    const { fullName, location } = casual.random_element(players)

    const name = fullName.split(' ')

    return {
      firstName: name[0],
      lastName: name[1],
      fullName,
      location,
      rating: casual.integer(1200, 3000),
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
    const event = casual.random_element(events)
    const startDate = dayjs(new Date())
      .add(casual.integer(-30, 30), 'day')
      .add(casual.integer(-12, 12), 'month')
      .format()
    const endDate = dayjs(startDate)
      .add(casual.integer(0, 2), 'day')
      .format()

    return {
      ...event,
      startDate,
      endDate,
      cover: `/assets/images/${casual.random_element(coverPhotos)}`,
      participants: () => new MockList([24, 64])
    }
  }
}
