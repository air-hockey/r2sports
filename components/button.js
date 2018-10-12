import styled from 'styled-components'

const BaseButton = styled.button`
  display: inline-block;
  font-weight: ${p => p.theme.button.fontWeight};
  color: ${p => p.theme.color.white};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: ${p => p.theme.button.borderWidth} solid transparent;
  padding: ${p => p.theme.button.paddingY} ${p => p.theme.button.paddingX};
  font-size: ${p => p.theme.button.fontSize};
  line-height: ${p => p.theme.button.lineHeight};
  border-radius: ${p => p.theme.button.borderRadius};
  background-color: ${p => p.theme.color[p.color]};

  &:hover,
  &:focus {
    color: ${p => p.theme.color.white};
    text-decoration: none;
  }

  &:focus {
    outline: 0;
    box-shadow: ${p => p.theme.button.focusBoxShadow(p.color)};
  }

  &:disabled {
    opacity: ${p => p.theme.button.disabledOpacity};
    box-shadow: none;
  }

  &:not(disabled) {
    cursor: pointer;
  }

  &:hover {
    background-color: ${p => p.theme.button.hoverBackground(p.color)};
    border-color: ${p => p.theme.button.hoverBackground(p.color)};
  }
`

const BlockButton = styled(BaseButton)`
  display: block;
  width: 100%;
  margin-top: ${p => p.theme.button.blockSpacingY};

  &:first-of-type {
    margin-top: 0;
  }
`

const Button = ({ children, style, block }) => {
  const ButtonElement = block ? BlockButton : BaseButton

  return <ButtonElement color={style}>{children}</ButtonElement>
}

Button.displayName = 'Button'

export default Button
