import casual from 'casual'

import locations from './data/locations.json'

export default function() {
  return casual.random_element(locations)
}
