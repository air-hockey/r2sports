import routes from 'next-routes'

export default routes()
  .add('player', '/player/:id')
  .add('tournaments/tournament', '/tournaments/:slug')
  .add('tournaments/tournament/results', '/tournaments/:slug/results')
