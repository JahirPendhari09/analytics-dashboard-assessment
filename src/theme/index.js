
import { createTheme } from '@mui/material/styles'

const getTheme = (mode='light') => createTheme({
  palette: {
    mode,
    primary: { main: mode==='light' ? '#5e35b1' : '#b388ff' },
    secondary: { main: mode==='light' ? '#7e57c2' : '#9575cd' },
    background: {
      default: mode==='light' ? '#faf7ff' : '#0e0b16',
      paper: mode==='light' ? '#efe7ff' : '#141026',
    }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui',
    h6: { fontWeight: 700 },
  },
  components: {
    MuiCard: { styleOverrides: { root: { boxShadow: '0 8px 30px rgba(0,0,0,0.08)' } } },
    MuiLinearProgress: { defaultProps: { variant: 'indeterminate' } },
  }
})

export default getTheme