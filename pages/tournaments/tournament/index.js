import { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'
import { formatDate, relativeDateString } from 'lib/util'
import { withRouter } from 'next/router'

import Head from 'next/head'
import { InfoOutline } from 'styled-icons/material/InfoOutline'
import { Newspaper } from 'styled-icons/fa-regular/Newspaper'
import { Trophy } from 'styled-icons/fa-solid/Trophy'
import { Share } from 'styled-icons/fa-solid/Share'
import { Clock } from 'styled-icons/feather/Clock'
import { MapPin } from 'styled-icons/feather/MapPin'
import Parallax from 'components/parallax'
import Button from 'components/button'
import Map from 'components/map'

const Headline = styled.div`
  display: flex;
  align-items: center;
`

const DateBlock = styled.div`
  margin: ${p => p.theme.size.m} 0;
  padding: 0 ${p => p.theme.size.m};
  border-right: thin solid ${p => p.theme.color.lightGray};
  line-height: ${p => p.theme.font.lineHeight.condensed};
`

const Month = styled.span`
  display: block;
  font-size: ${p => p.theme.font.size.l};
  text-align: center;
  color: ${p => p.theme.color.accent};
`

const Day = styled.span`
  display: block;
  font-size: ${p => p.theme.font.size.xl};
  text-align: center;
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: ${p => p.theme.font.weight.semiBold};
  margin: ${p => p.theme.size.s};
  line-height: ${p => p.theme.font.lineHeight.small};
`

const Section = styled.section`
  padding: ${p => p.theme.size.m} ${p => p.theme.size.s};
  margin-top: ${p => p.theme.size.m};
  background: ${p => p.theme.color.white};
  box-shadow: ${p => p.theme.shadow.xs};

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
  }
`

const Nav = styled.nav`
  margin-top: ${p => p.theme.size.s};
  padding: ${p => p.theme.size.s} 0;
  border-bottom: thin solid ${p => p.theme.color.lightGray};

  & > ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

const NavItem = styled.li`
  font-size: ${p => p.theme.font.size.s};
  color: ${p => (p.active ? p.theme.color.accent : p.theme.color.darkGray)};

  & > svg {
    height: 1.5em;
    display: block;
    margin: 0 auto;
  }
`

const iconStyles = css`
  height: 1.5em;
  display: block;
  margin: 0 auto;
`

const InfoIcon = styled(InfoOutline)`
  ${iconStyles};
`

const FeedIcon = styled(Newspaper)`
  ${iconStyles};
`

const ResultsIcon = styled(Trophy)`
  ${iconStyles};
`

const ShareIcon = styled(Share)`
  ${iconStyles};
`

const TimeIcon = styled(Clock)`
  ${iconStyles};
`

const LocationIcon = styled(MapPin)`
  ${iconStyles};
`

const Detail = styled.dl`
  display: flex;
  align-items: center;
  margin: ${p => p.theme.size.m};
  line-height: ${p => p.theme.font.lineHeight.small};

  & > dt {
    color: ${p => p.theme.color.gray};
  }

  & > dd {
    margin-left: ${p => p.theme.size.s};
  }
`

const DetailSubLine = styled.span`
  display: block;
  font-size: ${p => p.theme.font.size.s};
  font-style: italic;
  color: ${p => p.theme.color.darkGray};
`

const Description = styled.div`
  font-size: ${p => p.theme.font.size.s};
  margin: ${p => p.theme.size.m};
`

const Participants = styled.div`
  padding: 0 ${p => p.theme.size.m};

  & > ul {
    margin: 0;
    padding: 0;
  }
`

const Participant = styled.div`
  display: flex;
  align-items: center;
  padding: ${p => p.theme.size.s} 0;
  line-height: ${p => p.theme.font.lineHeight.condensed};
`

const ParticipantAvatar = styled.img`
  height: 2em;
  width: 2em;
  border-radius: 1em;
`

const ParticipantDetails = styled.span`
  margin-left: ${p => p.theme.size.s};
`

const ParticipantName = styled.span`
  display: block;
`

const ParticipantLocation = styled.span`
  display: block;
  font-size: ${p => p.theme.font.size.s};
  font-style: italic;
  color: ${p => p.theme.color.darkGray};
`

const ParticipantRating = styled.span`
  margin: 0 ${p => p.theme.font.size.m} 0 auto;
  font-size: ${p => p.theme.font.size.s};
  color: ${p => p.theme.color.darkGray};
  text-align: center;

  & > span {
    color: ${p => p.theme.color.black};
    font-size: ${p => p.theme.font.size.m};
    margin-left: ${p => p.theme.size.xs};
  }
`

const tournamentQuery = gql`
  query tournament($slug: String!) {
    tournament(slug: $slug) {
      id
      name
      location {
        name
        city
        state
        coordinates {
          lat
          lng
        }
      }
      description
      startDate
      endDate
      cover
      participants {
        id
        fullName
        location
        rating
        avatar
      }
    }
  }
`
class Tournament extends Component {
  static async getInitialProps({
    query: { slug } = {},
    req: { hostname } = {}
  }) {
    return { slug, origin: `https://${hostname}` }
  }

  render() {
    const { slug, origin } = this.props

    return (
      <Query query={tournamentQuery} variables={{ slug }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          const {
            tournament: {
              cover,
              name,
              location: { name: location, city, state, coordinates },
              description,
              startDate,
              endDate,
              participants
            }
          } = data

          return (
            <>
              <Head>
                <title>{name}</title>
                <meta property="og:title" content={name} key="ogTitle" />
                <meta
                  property="og:url"
                  content={`${origin}/tournaments/${slug}/`}
                  key="ogUrl"
                />
                <meta property="og:type" content="article" key="ogType" />
                <meta
                  property="og:image"
                  content={`${origin}${cover}?width=1200&height=627`}
                  key="ogImage"
                />
                <meta
                  property="og:description"
                  content={description}
                  key="ogDescription"
                />
              </Head>
              <Parallax image={`${cover}?width=500`}>
                <Section>
                  <Headline>
                    <DateBlock>
                      <Month>{dayjs(startDate).format('MMM')}</Month>
                      <Day>{dayjs(startDate).format('DD')}</Day>
                    </DateBlock>
                    <Title>{name}</Title>
                  </Headline>
                  <Button style="primary" block={true}>
                    Follow
                  </Button>
                  <Button style="secondary" block={true}>
                    Register
                  </Button>
                  <Nav>
                    <ul>
                      <NavItem active={true}>
                        <InfoIcon />
                        Info
                      </NavItem>
                      <NavItem>
                        <FeedIcon />
                        Feed
                      </NavItem>
                      <NavItem>
                        <ResultsIcon />
                        Results
                      </NavItem>
                      <NavItem>
                        <ShareIcon />
                        Share
                      </NavItem>
                    </ul>
                  </Nav>
                  <Detail>
                    <dt>
                      <TimeIcon />
                    </dt>
                    <dd>
                      {formatDate(startDate, endDate)}
                      <DetailSubLine>
                        {relativeDateString(startDate)}
                      </DetailSubLine>
                    </dd>
                  </Detail>
                  <Detail>
                    <dt>
                      <LocationIcon />
                    </dt>
                    <dd>
                      {location}
                      <DetailSubLine>{`${city}, ${state}`}</DetailSubLine>
                    </dd>
                  </Detail>
                  <Description>{description}</Description>
                </Section>
                <Section>
                  {location}:<Map coordinates={coordinates} />
                </Section>
                <Section>
                  <Participants>
                    {participants.length} players have registered:
                    <ul>
                      {participants.map(
                        ({ id, fullName, location, avatar, rating }) => (
                          <Participant key={`participant-${id}`}>
                            <ParticipantAvatar src={avatar} />
                            <ParticipantDetails>
                              <ParticipantName>{fullName}</ParticipantName>
                              <ParticipantLocation>
                                {location}
                              </ParticipantLocation>
                            </ParticipantDetails>
                            <ParticipantRating>
                              rt.
                              <span>{rating}</span>
                            </ParticipantRating>
                          </Participant>
                        )
                      )}
                    </ul>
                  </Participants>
                </Section>
              </Parallax>
            </>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(Tournament)
