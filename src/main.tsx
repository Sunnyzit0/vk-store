import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import './styles/index.css';
import { App } from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Em produção o HTML vem pré-renderizado (scripts/prerender.mjs); em dev, renderiza do zero.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
