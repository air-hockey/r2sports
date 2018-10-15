import { MockList } from 'graphql-yoga'

import Player from './player'
import Match from './match'
import Location from './location'
import Coordinates from './coordinates'
import Tournament from './tournament'

export default {
  Query: () => ({
    feed: () => new MockList([2, 10]),
    tournaments: () => new MockList([2, 5])
  }),
  Mutation: () => ({
    followTournament: (_, { tournamentId }) => {
      const tournament = new Tournament()

      return {
        id: tournamentId,
        isFollowing: true,
        ...tournament
      }
    }
  }),
  Player,
  Match,
  Location,
  Coordinates,
  Tournament
}
