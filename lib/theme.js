import Color from 'color'

const colors = {
  primary: Color.hsl(206, 100, 43),
  secondary: Color.hsl(83, 68, 47),
  accent: Color.hsl(39, 100, 50),
  white: Color.hsl(0, 0, 100),
  gray: Color.hsl(219, 17, 84)
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
      .string()
  },
  font: {
    size: {
      xs: '0.5rem',
      s: '0.75rem',
      m: '1rem',
      l: '1.25rem',
      xl: '2.5rem'
    },
    weight: {
      bold: 600,
      extraBold: 900
    }
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
  }
}
