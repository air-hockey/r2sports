import styled from 'styled-components'
import dayjs from 'dayjs'

import BoxScore from 'components/box-score'

const Card = styled.article`
  padding: ${p => p.theme.size.m};
  box-shadow: ${p => p.theme.shadow.xs};
  background-color: ${p => p.theme.color.white};
  margin: 0 0 ${p => p.theme.size.m};
`

const Title = styled.h2`
  margin: 0;
  font-size: ${p => p.theme.font.size.s};
  font-weight: ${p => p.theme.font.weight.regular};
  line-height: ${p => p.theme.font.lineHeight.condensed};
`

const DateTime = styled.span`
  font-size: ${p => p.theme.font.size.s};
  font-style: italic;
  color: ${p => p.theme.color.darkGray};
`

const HeadToHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${p => p.theme.size.m} 0;
`

const Player = styled.div`
  text-align: center;
  width: 6em;
  align-self: start;
`

const Avatar = styled.img`
  display: block;
  height: 75px;
  width: 75px;
  border-radius: 50%;
  margin: 0 auto ${p => p.theme.size.xs};
  border: ${p => (p.winner ? `solid medium ${p.theme.color.accent}` : 'none')}};
`

const PlayerName = styled.div`
  font-size: ${p => p.theme.font.size.l};
  line-height: ${p => p.theme.font.size.l};
`

const Winner = styled.span`
  display: block;
  font-size: ${p => p.theme.font.size.s};
  font-style: italic;
  color: ${p => p.theme.color.accent};
`

const ScoreDescription = styled.span`
  display: block;
  text-align: center;
  font-size: ${p => p.theme.font.size.s};
  color: ${p => p.theme.color.darkGray};
`

const Score = styled.span`
  width: 2em;
  text-align: center;
  font-size: ${p => p.theme.font.size.xl};
`

const BoxScoreTitle = styled.span`
  display: block;
  text-align: center;
  margin-top: ${p => p.theme.size.m};
  font-size: ${p => p.theme.font.size.s};
  color: ${p => p.theme.color.darkGray};
  font-style: italic;
`

const MatchCard = ({
  id,
  title,
  timestamp,
  challengerName,
  challengerAvatar,
  defenderName,
  defenderAvatar,
  challengerScore,
  defenderScore,
  challengerScores,
  defenderScores
}) => (
  <Card>
    <Title>{title}</Title>
    <DateTime>{dayjs(timestamp).format('M/D/YYYY, h:mm:ssa')}</DateTime>
    <HeadToHead>
      <Player>
        <Avatar
          src={challengerAvatar}
          winner={challengerScore > defenderScore}
        />
        <PlayerName>{challengerName}</PlayerName>
        {challengerScore > defenderScore && <Winner>winner</Winner>}
      </Player>
      <div>
        <ScoreDescription>Final</ScoreDescription>
        <Score>
          {challengerScore}-{defenderScore}
        </Score>
      </div>
      <Player>
        <Avatar src={defenderAvatar} winner={challengerScore < defenderScore} />
        <PlayerName>{defenderName}</PlayerName>
        {challengerScore < defenderScore && <Winner>winner</Winner>}
      </Player>
    </HeadToHead>
    <BoxScoreTitle>Box Score</BoxScoreTitle>
    <BoxScore
      id={id}
      challengerName={challengerName}
      defenderName={defenderName}
      challengerScores={challengerScores}
      defenderScores={defenderScores}
    />
  </Card>
)

MatchCard.displayName = 'MatchCard'

export default MatchCard
