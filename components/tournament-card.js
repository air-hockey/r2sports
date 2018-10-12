import styled from 'styled-components'
import { formatDate } from 'lib/util'

import routes from 'app/routes'

const { Link } = routes

const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  background: linear-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.75) 66%,
      rgba(0, 0, 0, 0.75) 100%
    ),
    url(${p => p.cover}?width=400), ${p => p.theme.color.darkGray};
  background-position: center;
  background-size: cover;
  height: 175px;
  color: ${p => p.theme.color.white};
  border-radius: ${p => p.theme.size.xs};
  padding: ${p => p.theme.size.m};
  text-align: right;
  line-height: ${p => p.theme.font.lineHeight.small};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.color.black};
  }
`

const Title = styled.h3`
  font-size: ${p => p.theme.font.size.l};
  margin: 0;
`

const Date = styled.span`
  font-style: italic;
  color: ${p => p.theme.color.accent};
`

const Location = styled.span`
  font-size: ${p => p.theme.font.size.s};
  margin-top: ${p => p.theme.size.m};
`

const TournamentCard = ({
  name,
  slug,
  location,
  startDate,
  endDate,
  cover
}) => (
  <Link route={`tournaments/${slug}`} prefetch>
    <Card cover={cover}>
      <Date>{formatDate(startDate, endDate)}</Date>
      <Title>{name}</Title>
      <Location>{location}</Location>
    </Card>
  </Link>
)

TournamentCard.displayName = 'TournamentCard'

export default TournamentCard
