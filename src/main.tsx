import { createRoot, hydrateRoot } from 'react-dom/client'
// Build cache reset v2
import App from './App.tsx'
import './index.css'

// Import visitor tracking to initialize page view tracking
import './utils/visitorTracking';

const rootElement = document.getElementById("root")!;
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
