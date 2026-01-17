import { createRoot } from 'react-dom/client'
// Build cache reset v2
import App from './App.tsx'
import './index.css'

// Import visitor tracking to initialize page view tracking
import './utils/visitorTracking';

createRoot(document.getElementById("root")!).render(<App />);
