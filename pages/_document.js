import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import styledNormalize from 'styled-normalize'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  body {
    font-family: 'Rubik', sans-serif;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
  }
`

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#ff6600" />
          <link rel="apple-touch-icon" href="/static/icon.png" />
          <meta name="apple-mobile-web-app-title" content="R2 Tournament" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:600,700,900|Rubik"
            rel="stylesheet"
          />
          <GlobalStyle />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
