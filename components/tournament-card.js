import styled from 'styled-components'
import dayjs from 'dayjs'

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

export default ({ id, name, location, startDate, endDate, cover }) => {
  const formatDate = date =>
    dayjs(date).format(
      `MMM DD${
        dayjs(date).format('YYYY') !== dayjs().format('YYYY') ? ', YYYY' : ''
      }`
    )

  const date =
    dayjs(startDate).format('DD/MM/YYYY') ===
    dayjs(endDate).format('DD/MM/YYYY')
      ? formatDate(startDate)
      : `${formatDate(startDate)} - ${formatDate(endDate)}`

  return (
    <Link route={`tournaments/${id}`} prefetch>
      <Card cover={cover}>
        <Date>{date}</Date>
        <Title>{name}</Title>
        <Location>{location}</Location>
      </Card>
    </Link>
  )
}
