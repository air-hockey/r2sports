import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import MatchCard from 'components/match-card'

const Section = styled.section`
  padding: ${p => p.theme.size.m} 0 0;
`

const feedQuery = gql`
  query feed {
    feed {
      id
      lastModified
      name
      challengerScores
      defenderScores
      challengerScore
      defenderScore
      challenger {
        fullName
        avatar
      }
      defender {
        fullName
        avatar
      }
    }
  }
`

const Feed = () => (
  <Section>
    <Query query={feedQuery}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        return data.feed.map(
          ({
            id,
            lastModified,
            name,
            challenger: { fullName: challengerName, avatar: challengerAvatar },
            defender: { fullName: defenderName, avatar: defenderAvatar },
            ...props
          }) => (
            <MatchCard
              key={`feed_${id}`}
              id={id}
              title={name}
              timestamp={lastModified}
              challengerName={challengerName}
              challengerAvatar={challengerAvatar}
              defenderName={defenderName}
              defenderAvatar={defenderAvatar}
              {...props}
            />
          )
        )
      }}
    </Query>
  </Section>
)

Feed.displayName = 'Feed'

export default Feed
