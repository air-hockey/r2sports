import { Component } from 'react'
import styled from 'styled-components'

const Cover = styled.div.attrs({
  style: ({ top }) => ({
    transform: `translateY(${top * 0.75}px)`
  })
})`
  height: 30vmax;
  background-image: url(${p => p.image});
  background-position: center;
  background-size: cover;
`

const Content = styled.div`
  box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  transform: translateZ(0);
  background: ${p => p.theme.color.lightGray};
`

export default class Parallax extends Component {
  constructor(props) {
    super(props)
    this.state = { scrollY: 0 }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.setState({ scrollY: window.scrollY })
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    this.setState({ scrollY: window.scrollY })
  }

  render() {
    const { children, image } = this.props
    const { scrollY } = this.state

    return (
      <>
        <Cover image={image} top={scrollY} />
        <Content>{children}</Content>
      </>
    )
  }
}
