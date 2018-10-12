import Carousel from 'nuka-carousel'
import TournamentCard from 'components/tournament-card'

const TournamentCarousel = ({ tournaments }) => (
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

TournamentCarousel.displayName = 'TournamentCarousel'

export default TournamentCarousel
