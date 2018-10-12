import App, { Container } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'
import withApolloClient from 'lib/with-apollo-client'
import theme from 'lib/theme'
import { ApolloProvider } from 'react-apollo'

import AppHeader from 'components/app-header'

const Wrapper = styled.div`
  min-height: calc(100vh - 3em);
  height: 100%;
  max-width: 500px;
  margin: 3em auto 0;
  overflow: hidden;
  background-color: ${p => p.theme.color.lightGray};
  line-height: ${p => p.theme.font.lineHeight.base};
`

class R2App extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Wrapper>
              <AppHeader />
              <Component {...pageProps} />
            </Wrapper>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(R2App)
