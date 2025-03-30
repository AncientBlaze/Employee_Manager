import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(

    <div>
        <Toaster />
        <App />
    </div>

)
