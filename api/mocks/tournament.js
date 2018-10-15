import casual from 'casual'
import dayjs from 'dayjs'
import { MockList } from 'graphql-yoga'

import events from './data/events.json'
import coverPhotos from './data/cover-photos.json'

export default function() {
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
