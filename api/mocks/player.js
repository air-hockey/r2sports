import casual from 'casual'

import players from './data/players.json'

export default function() {
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
}
