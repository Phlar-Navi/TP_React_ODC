import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Create from './pages/Create.jsx'
import Logements from './components/logements.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import de Bootstrap CSS
import './index.css'; // Tes propres styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
