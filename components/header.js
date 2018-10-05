import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Newspaper } from 'styled-icons/fa-regular/Newspaper'
import { Menu } from 'styled-icons/material/Menu'
import { EventNote } from 'styled-icons/material/EventNote'

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 3em;
  padding: 0 ${p => p.theme.size.s};
  box-shadow: ${p => p.theme.shadow.xs};
  background: ${p => p.theme.color.primary};
  color: ${p => p.theme.color.white};
  position: sticky;
  top: 0px;

  > * {
    padding: 0 ${p => p.theme.size.m};
  }
`

const Logo = styled.span`
  margin-right: auto;
`

const FeedIcon = styled(Newspaper)`
  height: ${p => p.theme.size.l};
`

const TournamentsIcon = styled(EventNote)`
  height: ${p => p.theme.size.l};
`

const MenuIcon = styled(Menu)`
  height: ${p => p.theme.size.l};
`

const StyledLink = styled.a`
  background-color: ${p => (p.active ? p.theme.color.secondary : 'none')};
  height: 100%;
  display: flex;
  align-items: center;
  color: ${p => p.theme.color.white};
`

const ActiveLink = withRouter(({ children, router, href }) => {
  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <StyledLink
      href={href}
      onClick={handleClick}
      active={router.pathname.includes(href)}
    >
      {children}
    </StyledLink>
  )
})

export default () => (
  <Header>
    <Logo>R2sports</Logo>
    <ActiveLink href="/feed">
      <FeedIcon />
    </ActiveLink>
    <ActiveLink href="/tournaments">
      <TournamentsIcon />
    </ActiveLink>
    <MenuIcon />
  </Header>
)
