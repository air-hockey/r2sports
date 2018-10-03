import { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.h1``

export default class Tournament extends Component {
  static async getInitialProps({ query }) {
    console.log(query)
  }
  render() {
    return (
      <div>
        <Title>2018 AHPA World Championship Tournament</Title>
        <Link>Upcoming Matches</Link>
      </div>
    )
  }
}
