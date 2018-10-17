import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import Button from 'components/button'

const TOURNAMENT = gql`
  query tournament($id: ID!) {
    tournament(id: $id) {
      id
      isFollowing
    }
  }
`

const FOLLOW_TOURNAMENT = gql`
  mutation FollowTournament($tournamentId: ID!, $unfollow: Boolean) {
    followTournament(tournamentId: $tournamentId, unfollow: $unfollow) {
      id
      isFollowing
    }
  }
`

const FollowTournamentButton = ({ tournamentId }) => (
  <Query query={TOURNAMENT} variables={{ id: tournamentId }}>
    {({ data: { tournament: { isFollowing } = {} } = {} } = {}) => (
      <Mutation mutation={FOLLOW_TOURNAMENT}>
        {followTournament => (
          <Button
            style="primary"
            outline={isFollowing}
            block={true}
            onClick={() => {
              followTournament({
                variables: {
                  tournamentId,
                  unfollow: isFollowing
                },
                optimisticResponse: {
                  __typename: 'Mutation',
                  followTournament: {
                    id: tournamentId,
                    __typename: 'Tournament',
                    isFollowing: !isFollowing
                  }
                }
              })
            }}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </Mutation>
    )}
  </Query>
)

FollowTournamentButton.displayName = 'FollowTournamentButton'

export default FollowTournamentButton
