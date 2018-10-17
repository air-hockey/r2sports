import { Component, createContext } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const ModalBackdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${p => p.theme.zIndex.modalBackdrop};
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`

const ModalBody = styled.section`
  width: calc(100vw - 4em);
  max-height: calc(100vh - 4em);
  overflow: scroll;
  z-index: ${p => p.theme.zIndex.modal};
  background-color: ${p => p.theme.color.white};
  display: flex;
  flex-direction: column;
  padding: ${p => p.theme.size.m};
`

const { Provider, Consumer } = createContext(null)

class ModalProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalNode: null,
      BackgroundComponent: ModalBackdrop
    }

    this.setModalNode = this.setModalNode.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.backgroundComponent !== prevState.BackgroundComponent &&
      nextProps.backgroundComponent
    ) {
      return { BackgroundComponent: nextProps.backgroundComponent }
    }

    return null
  }

  setModalNode(node) {
    this.setState({ modalNode: node })
  }

  render() {
    return (
      <Provider
        value={{
          modalNode: this.state.modalNode,
          BackgroundComponent: this.state.BackgroundComponent
        }}
      >
        {this.props.children}
        <div ref={this.setModalNode} />
      </Provider>
    )
  }
}

class Modal extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }

    this.node = null
    this.prevBodyOverflow = null

    this.onKeydown = this.onKeydown.bind(this)
    this.onBackgroundClick = this.onBackgroundClick.bind(this)
    this.cleanUp = this.cleanUp.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // Handle state changes
    if (prevState.isOpen !== this.state.isOpen) {
      if (!this.state.isOpen) {
        this.cleanUp()

        this.props.afterClose && this.props.afterClose()
      } else if (this.state.isOpen) {
        document.addEventListener('keydown', this.onKeydown)

        this.prevBodyOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        this.props.afterOpen && this.props.afterOpen()
      }
    }

    // Handle prop changes
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        this.handleChange('beforeOpen', { isOpen: true })
      } else {
        this.handleChange('beforeClose', { isOpen: false })
      }
    }
  }

  handleChange(event, newState) {
    if (this.props[event]) {
      try {
        this.props[event]().then(() => this.setState(newState))
      } catch (e) {
        this.setState(newState)
      }
    } else {
      this.setState(newState)
    }
  }

  componentWillUnmount() {
    if (this.props.isOpen) this.cleanUp()
  }

  cleanUp() {
    document.removeEventListener('keydown', this.onKeydown)
    document.body.style.overflow = this.prevBodyOverflow || ''
  }

  onKeydown(e) {
    if (e.key === 'Escape') {
      this.props.onEscapeKeydown && this.props.onEscapeKeydown(e)
    }
  }

  onBackgroundClick(e) {
    if (this.node === e.target) {
      this.props.onBackgroundClick && this.props.onBackgroundClick(e)
    }
  }

  render() {
    const { children, ModalBody } = this.props
    const { isOpen } = this.state

    return (
      <Consumer>
        {({ modalNode, BackgroundComponent }) => {
          if (modalNode && BackgroundComponent && isOpen) {
            return ReactDOM.createPortal(
              <BackgroundComponent
                onClick={this.onBackgroundClick}
                ref={node => {
                  this.node = node
                }}
              >
                <ModalBody>{children}</ModalBody>
              </BackgroundComponent>,
              modalNode
            )
          } else {
            return null
          }
        }}
      </Consumer>
    )
  }
}

Modal.defaultProps = {
  ModalBody
}

export default Modal
export { ModalProvider, ModalBackdrop, ModalBody }
