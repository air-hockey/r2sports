import { Component } from 'react'
import styled from 'styled-components'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import Modal, { ModalBody } from 'components/modal'
import Button from 'components/button'
import { FacebookF } from 'styled-icons/fa-brands/FacebookF'
import { Twitter } from 'styled-icons/fa-brands/Twitter'
import { Email } from 'styled-icons/material/Email'
import { FacebookMessenger } from 'styled-icons/fa-brands/FacebookMessenger'
import { Link } from 'styled-icons/fa-solid/Link'
import { X } from 'styled-icons/feather/X'

const Icon = Element => styled(Element)`
  width: 1em;
  height: 1em;
  margin-right: ${p => p.theme.size.m};
  color: ${p => p.theme.color.black};
`

const FacebookIcon = Icon(FacebookF)
const TwitterIcon = Icon(Twitter)
const EmailIcon = Icon(Email)
const MessengerIcon = Icon(FacebookMessenger)
const LinkIcon = Icon(Link)

const StyledModalBody = styled(ModalBody)`
  position: relative;
  padding-top: ${p => p.theme.size.l};
`

const Close = styled(X)`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 0.5em;
  width: 2em;
  height: 2em;
`

const Title = styled.h2`
  margin: 0;
`

const ShareLinks = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: ${p => p.theme.font.size.l};

  & > li {
    padding: ${p => p.theme.size.m} 0;
    color: ${p => p.theme.color.primary};
    border-top: thin solid ${p => p.theme.color.lightGray};

    &:last-of-type {
      border-bottom: thin solid ${p => p.theme.color.lightGray};
    }

    & > button {
      background-color: transparent;
      color: ${p => p.theme.color.primary};
      cursor: pointer;
      border: none;
      padding: 0;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

class ShareModal extends Component {
  constructor(props) {
    super(props)

    this.state = { copied: false }

    this.handleFacebook = this.handleFacebook.bind(this)
    this.handleTwitter = this.handleTwitter.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleMessenger = this.handleMessenger.bind(this)
    this.handleCopyLink = this.handleCopyLink.bind(this)
  }

  handleFacebook() {
    const { toggleOpen, url, message } = this.props

    toggleOpen()

    FB &&
      FB.ui({
        method: 'share',
        href: url,
        quote: message,
        mobile_iframe: true
      })
  }

  handleTwitter() {
    const { toggleOpen, message, url } = this.props

    toggleOpen()

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${message} ${url}`
      )}`,
      '_blank'
    )
  }

  handleEmail() {
    const { toggleOpen, message, url } = this.props

    toggleOpen()

    window.location.href = `mailto:?subject=${message}&body=${message}%0A%0A${url}`
  }

  handleMessenger() {
    const { toggleOpen, url } = this.props

    toggleOpen()

    FB &&
      FB.ui({
        method: 'send',
        link: url
      })
  }

  handleCopyLink() {
    this.setState({ copied: true })
    setTimeout(() => this.setState({ copied: false }), 2000)
  }

  render() {
    const { isOpen, toggleOpen = () => {}, message, url } = this.props
    const { copied } = this.state

    return (
      <Modal
        ModalBody={StyledModalBody}
        isOpen={isOpen}
        onBackgroundClick={toggleOpen}
        onEscapeKeydown={toggleOpen}
      >
        <Close onClick={toggleOpen} />
        <Title>Share</Title>
        <p>{message}</p>
        <ShareLinks>
          <li>
            <button onClick={this.handleFacebook}>
              <FacebookIcon />
              Facebook
            </button>
          </li>
          <li>
            <button onClick={this.handleTwitter}>
              <TwitterIcon />
              Twitter
            </button>
          </li>
          <li>
            <button onClick={this.handleEmail}>
              <EmailIcon />
              Email
            </button>
          </li>
          <li>
            <button onClick={this.handleMessenger}>
              <MessengerIcon />
              Messenger
            </button>
          </li>
          <li>
            {!copied ? (
              <CopyToClipboard text={url} onCopy={this.handleCopyLink}>
                <button>
                  <LinkIcon />
                  Copy Link
                </button>
              </CopyToClipboard>
            ) : (
              <>
                <LinkIcon />
                Link Copied
              </>
            )}
          </li>
        </ShareLinks>
      </Modal>
    )
  }
}

export default ShareModal
