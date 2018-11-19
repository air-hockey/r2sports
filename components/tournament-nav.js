import { Component, createRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { InfoOutline } from 'styled-icons/material/InfoOutline'
import { Newspaper } from 'styled-icons/fa-regular/Newspaper'
import { Trophy } from 'styled-icons/fa-solid/Trophy'
import { Share } from 'styled-icons/fa-solid/Share'

const Icon = Element => styled(Element)`
  height: 1.5em;
  display: block;
  margin: 0 auto;
`

const InfoIcon = Icon(InfoOutline)
const FeedIcon = Icon(Newspaper)
const ResultsIcon = Icon(Trophy)
const ShareIcon = Icon(Share)

const Nav = styled.nav`
  margin-top: ${p => p.theme.size.s};
  padding: ${p => p.theme.size.s} 0;
  border-bottom: thin solid ${p => p.theme.color.lightGray};

  & > ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

const NavItem = styled.li`
  font-size: ${p => p.theme.font.size.s};
  cursor: pointer;

  & > svg {
    height: 1.5em;
    display: block;
    margin: 0 auto;
  }

  & > a {
    color: ${p => (p.active ? p.theme.color.accent : p.theme.color.darkGray)};
    text-decoration: none;
  }
`

class TournamentNav extends Component {
  constructor(props) {
    super(props)

    this.scrollTo = this.scrollTo.bind(this)

    this.nav = createRef()
  }

  scrollTo() {
    const { top } = this.nav.current.getBoundingClientRect()

    window.scroll({
      top: top + scrollY - 48,
      behavior: 'smooth'
    })
  }

  render() {
    const { slug, onShareClick = () => {}, path } = this.props

    return (
      <Nav ref={this.nav}>
        <ul>
          <NavItem active={!path}>
            <Link
              scroll={false}
              prefetch
              as={`/tournaments/${slug}`}
              href={`/tournaments/tournament?slug=${slug}`}
            >
              <a onClick={this.scrollTo}>
                <InfoIcon />
                Info
              </a>
            </Link>
          </NavItem>
          <NavItem active={path === 'feed'}>
            <Link
              scroll={false}
              prefetch
              as={`/tournaments/${slug}/feed`}
              href={`/tournaments/tournament?slug=${slug}&path=feed`}
            >
              <a onClick={this.scrollTo}>
                <FeedIcon />
                Feed
              </a>
            </Link>
          </NavItem>
          <NavItem active={path === 'results'}>
            <Link
              scroll={false}
              prefetch
              as={`/tournaments/${slug}/results`}
              href={`/tournaments/tournament?slug=${slug}&path=results`}
            >
              <a onClick={this.scrollTo}>
                <ResultsIcon />
                Results
              </a>
            </Link>
          </NavItem>
          <NavItem onClick={onShareClick}>
            <a>
              <ShareIcon />
              Share
            </a>
          </NavItem>
        </ul>
      </Nav>
    )
  }
}

export default TournamentNav
