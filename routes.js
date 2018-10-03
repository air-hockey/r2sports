import routes from 'next-routes'

export default routes()
  .add('player', '/player/:id')
  .add('tournaments/tournament', '/tournaments/:id')
  .add('tournaments/tournament/results', '/tournaments/:id/results')
