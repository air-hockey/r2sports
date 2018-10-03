import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import TournamentCarousel from 'components/tournament-carousel'

const Tournaments = styled.div``

const Title = styled.h1`
  padding: 0 ${p => p.theme.size.s};
`

const Section = styled.section`
  background-color: ${p => p.theme.color.white};
  border-top: solid thin ${p => p.theme.color.gray};
  border-bottom: solid thin ${p => p.theme.color.gray};
  margin-top: ${p => p.theme.size.m};
  padding: 0 ${p => p.theme.size.s};
`

const Subheading = styled.h2`
  padding: 0 ${p => p.theme.size.xs};
  margin: ${p => p.theme.size.s} 0;
  color: ${p => p.theme.color.darkGray};
  font-weight: ${p => p.theme.font.weight.bold};
`

const tournamentsQuery = gql`
  query tournaments($filter: TournamentFilter!) {
    tournaments(filter: $filter) {
      id
      name
      location
      startDate
      endDate
      cover
    }
  }
`

export default () => (
  <Tournaments>
    <Title>Tournaments</Title>
    <Section>
      <Subheading>Happening Now</Subheading>
      <Query query={tournamentsQuery} variables={{ filter: 'NOW' }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return <TournamentCarousel tournaments={data.tournaments} />
        }}
      </Query>
    </Section>
    <Section>
      <Subheading>Upcoming</Subheading>
      <Query query={tournamentsQuery} variables={{ filter: 'UPCOMING' }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return <TournamentCarousel tournaments={data.tournaments} />
        }}
      </Query>
    </Section>
    <Section>
      <Subheading>Previous</Subheading>
      <Query query={tournamentsQuery} variables={{ filter: 'PREVIOUS' }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return <TournamentCarousel tournaments={data.tournaments} />
        }}
      </Query>
    </Section>
  </Tournaments>
)
