import { Component } from 'react'

export default class Player extends Component {
  static async getInitialProps({ query }) {
    console.log(query)
  }
  render() {
    return <div />
  }
}
