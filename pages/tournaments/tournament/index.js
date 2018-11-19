import { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'
import { formatDate, relativeDateString } from 'lib/util'
import { withRouter } from 'next/router'

import Head from 'next/head'
import { Clock } from 'styled-icons/feather/Clock'
import { MapPin } from 'styled-icons/feather/MapPin'
import Parallax from 'components/parallax'
import Button from 'components/button'
import TournamentFollowButton from 'components/tournament-follow-button'
import TournamentNav from 'components/tournament-nav'
import Map from 'components/map'
import ShareModal from 'components/share-modal'

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

const Icon = Element => styled(Element)`
  height: 1.5em;
  display: block;
  margin: 0 auto;
`

const TimeIcon = Icon(Clock)
const LocationIcon = Icon(MapPin)

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

const TOURNAMENT = gql`
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
  constructor(props) {
    super(props)

    this.state = { isShareModalOpen: false }

    this.toggleShareModal = this.toggleShareModal.bind(this)
  }

  static async getInitialProps({
    query: { slug, path, scrollTo } = {},
    req: { hostname } = {}
  }) {
    return { slug, origin: `https://${hostname}`, path, scrollTo }
  }

  toggleShareModal() {
    this.setState({ isShareModalOpen: !this.state.isShareModalOpen })
  }

  render() {
    const { slug, origin, path } = this.props
    const { isShareModalOpen } = this.state

    return (
      <Query query={TOURNAMENT} variables={{ slug }}>
        {({
          data: {
            tournament: {
              id,
              cover,
              name,
              location: { name: location, city, state, coordinates },
              description,
              startDate,
              endDate,
              participants
            } = {}
          } = {}
        } = {}) => (
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
                <TournamentFollowButton tournamentId={id} />
                <Button style="secondary" block={true}>
                  Register
                </Button>
                <TournamentNav
                  path={path}
                  slug={slug}
                  onShareClick={this.toggleShareModal}
                />
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
            <ShareModal
              isOpen={isShareModalOpen}
              toggleOpen={this.toggleShareModal}
              message={`Check out this tournament on R2Sports: ${name}`}
              url={`${origin}/tournaments/${slug}`}
            />
          </>
        )}
      </Query>
    )
  }
}

export default withRouter(Tournament)
