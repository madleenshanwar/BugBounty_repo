
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './i18n'
createRoot(document.getElementById('root')).render(

    <MantineProvider  withGlobalStyles withNormalizeCSS>
    <App />
    </MantineProvider>

)
