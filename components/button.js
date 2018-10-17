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
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

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

const BlockButton = Element => styled(Element)`
  display: block;
  width: 100%;
  margin-top: ${p => p.theme.button.blockSpacingY};

  &:first-of-type {
    margin-top: 0;
  }
`

const OutlineButton = Element => styled(Element)`
  color: ${p => p.theme.color[p.color]};
  border-color: ${p => p.theme.color[p.color]};
  background-color: transparent;

  &:hover {
    color: ${p => p.theme.color.white};
    background-color: ${p => p.theme.color[p.color]};
  }

  &:disabled {
    color: ${p => p.theme.color[p.color]};
    background-color: transparent;
  }

  &:not(disabled):active {
    color: ${p => p.theme.color.white};
    background-color: ${p => p.theme.color[p.color]};
    border-color: ${p => p.theme.color[p.color]};
  }
`

const composeStyles = (...fns) =>
  fns
    .filter(fn => typeof fn === 'function')
    .reduceRight((f, g) => (...args) => g(f(...args)), value => value)

const Button = ({ children, style, block, outline, onClick = () => {} }) => {
  const ButtonElement = composeStyles(
    block && BlockButton,
    outline && OutlineButton
  )(BaseButton)

  return (
    <ButtonElement color={style} onClick={onClick}>
      {children}
    </ButtonElement>
  )
}

Button.displayName = 'Button'

export default Button
