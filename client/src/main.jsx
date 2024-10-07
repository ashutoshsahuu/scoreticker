import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MatchContextProvider } from './context/MatchDataContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Toaster position="bottom-right"
      reverseOrder={false} />
    <MatchContextProvider>
      <App />
    </MatchContextProvider>
  </BrowserRouter>

)
