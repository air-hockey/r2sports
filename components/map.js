import { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import getConfig from 'next/config'
import Head from 'next/head'
import { generateMapsLink } from 'lib/util'

import { MapMarkerAlt } from 'styled-icons/fa-solid/MapMarkerAlt'

const MapContainer = styled.div`
  height: 30vmax;
  width: 100%;
`

const MarkerIcon = styled(MapMarkerAlt)`
  width: 24px;
  height: 32px;
  color: rgb(244, 68, 68);
`

const {
  publicRuntimeConfig: { MAPBOX_API_KEY }
} = getConfig()

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapsLink: undefined
    }
  }
  componentDidMount() {
    const {
      coordinates: { lat, lng }
    } = this.props

    const mapboxgl = require('mapbox-gl')
    mapboxgl.accessToken = MAPBOX_API_KEY

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom: 12.5,
      interactive: false,
      attributionControl: false
    })

    this.tooltipContainer = document.createElement('div')
    new mapboxgl.Marker(this.tooltipContainer)
      .setLngLat([lng, lat])
      .addTo(this.map)

    ReactDOM.render(React.createElement(MarkerIcon), this.tooltipContainer)

    this.setState({ mapsLink: generateMapsLink(lat, lng) })
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    return (
      <>
        <Head>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.50.0/mapbox-gl.css"
            rel="stylesheet"
            key="mapbox"
          />
        </Head>
        <a href={this.state.mapsLink}>
          <MapContainer ref={el => (this.mapContainer = el)} />
        </a>
      </>
    )
  }
}

Map.displayName = 'Map'

export default Map
