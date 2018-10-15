import casual from 'casual'

import coordinates from './data/coordinates.json'

export default function() {
  return casual.random_element(coordinates)
}
