import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './store/store'
import getTheme from './theme'


const ThemedApp = () => {
  const mode = useSelector((s) => s.ui.themeMode)
  const theme = getTheme(mode)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  )
}


const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ThemedApp />
  </Provider>
)