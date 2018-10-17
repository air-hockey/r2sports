import App, { Container } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'
import withApolloClient from 'lib/with-apollo-client'
import theme from 'lib/theme'
import { ApolloProvider } from 'react-apollo'
import getConfig from 'next/config'

import AppHeader from 'components/app-header'
import { ModalProvider } from 'components/modal'

const {
  publicRuntimeConfig: { FACEBOOK_APP_ID }
} = getConfig()

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

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
      })
    }
    ;(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <ModalProvider>
              <Wrapper>
                <AppHeader />
                <Component {...pageProps} />
              </Wrapper>
            </ModalProvider>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(R2App)
