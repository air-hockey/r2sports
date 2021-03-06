import Color from 'color'

const colors = {
  primary: Color.hsl(206, 100, 43),
  secondary: Color.hsl(83, 68, 47),
  accent: Color.hsl(39, 100, 50),
  white: Color.hsl(0, 0, 100),
  gray: Color.hsl(219, 17, 84),
  black: Color.hsl(0, 0, 0)
}

const font = {
  size: {
    base: 1
  },
  lineHeight: {
    condensed: 1,
    small: 1.25,
    base: 1.5,
    large: 1.75
  },
  weight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
  }
}

const border = {
  width: 1,
  radius: 0.25
}

export default {
  color: {
    gradient(color) {
      return `linear-gradient(${Color(color).darken(0.2)}, ${color})`
    },
    primary: colors.primary.hsl().string(),
    primaryDark: colors.primary
      .darken(0.1)
      .hsl()
      .string(),
    secondary: colors.secondary.hsl().string(),
    accent: colors.accent.hsl().string(),
    white: colors.white.hsl().string(),
    lightGray: colors.gray
      .lighten(0.1)
      .hsl()
      .string(),
    gray: colors.gray.hsl().string(),
    darkGray: colors.gray
      .darken(0.25)
      .hsl()
      .string(),
    black: colors.black.hsl().string()
  },
  font: {
    size: {
      xs: '0.5rem',
      s: '0.75rem',
      m: `${font.size.base}rem`,
      l: '1.25rem',
      xl: '2.5rem'
    },
    weight: font.weight,
    lineHeight: font.lineHeight
  },
  size: {
    xs: '0.25em',
    s: '0.5em',
    m: '1em',
    l: '1.5em',
    xl: '2em'
  },
  shadow: {
    xs: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    s: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    m: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    l: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    xl: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
  },
  button: {
    paddingY: '0.375rem',
    paddingX: '0.75rem',
    fontSize: `${font.size.base}rem`,
    lineHeight: `${font.lineHeight.base}rem`,
    fontWeight: `${font.weight.regular}`,
    borderWidth: `${border.width}px`,
    borderRadius: `${border.radius}rem`,
    focusBoxShadow: color => `0 0 0 0.2rem ${colors[color].fade(0.5)}`,
    disabledOpacity: 0.65,
    hoverBackground: color => colors[color].darken(0.1).string(),
    blockSpacingY: '0.5rem'
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
}
