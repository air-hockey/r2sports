import Carousel from 'nuka-carousel'
import TournamentCard from 'components/tournament-card'

export default ({ tournaments }) => (
  <Carousel
    framePadding="0.5em"
    frameOverflow="visible"
    cellSpacing={8}
    edgeEasing="easeExpOut"
    withoutControls={true}
  >
    {tournaments.map(props => (
      <TournamentCard key={props.id} {...props} />
    ))}
  </Carousel>
)
