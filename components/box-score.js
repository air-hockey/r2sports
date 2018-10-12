import styled from 'styled-components'

const Table = styled.table`
  border-collapse: collapse;
`

const Scores = styled.tr`
  &:last-child > td {
    border-bottom: none;
  }

  & > td {
    border-bottom: thin solid ${p => p.theme.color.gray};
  }
`

const Player = styled.td`
  width: 100%;
  word-break: break-word;
`

const Score = styled.td`
  text-align: center;
  border-right: thin solid ${p => p.theme.color.gray};
  padding: 0 ${p => p.theme.size.xs};

  &:last-child {
    border-right: none;
  }
`

const BoxScore = ({
  id,
  challengerName,
  defenderName,
  challengerScores = [],
  defenderScores = []
}) => (
  <Table>
    <tbody>
      <Scores>
        <Player>{challengerName}</Player>
        {challengerScores.map((score, i) => (
          <Score key={`${id}-challenger-${i}`}>{score}</Score>
        ))}
      </Scores>
      <Scores>
        <Player>{defenderName}</Player>
        {defenderScores.map((score, i) => (
          <Score key={`${id}-defender-${i}`}>{score}</Score>
        ))}
      </Scores>
    </tbody>
  </Table>
)

BoxScore.displayName = 'BoxScore'

export default BoxScore
