import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './hooks/useTheme'
import { AdminDataProvider } from './context/adminData'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <AdminDataProvider>
          <App />
        </AdminDataProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)

