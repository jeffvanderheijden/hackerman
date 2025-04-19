if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0); // slight delay to override browser scroll restore
  });
}

import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)
