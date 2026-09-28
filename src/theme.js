import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#133B39', dark: '#092B2A', light: '#DDF4E9' },
    secondary: { main: '#E56F59', light: '#FCE8E2' },
    info: { main: '#4E7A9E', light: '#E9F2F8' },
    warning: { main: '#C98F2E', light: '#FCF3DE' },
    background: { default: '#F7F5EF', paper: '#FFFFFF' },
    text: { primary: '#172221', secondary: '#536361' },
    divider: '#DDE5E2'
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 750, letterSpacing: '-0.045em', lineHeight: 1.04 },
    h2: { fontWeight: 720, letterSpacing: '-0.035em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 999, paddingInline: 18 } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 650 } } },
    MuiCard: { styleOverrides: { root: { boxShadow: '0 16px 50px rgba(18, 48, 45, 0.08)' } } }
  }
});

export default theme;
