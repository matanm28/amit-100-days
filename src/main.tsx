import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { siteConfig } from './config/siteConfig';
import './styles/globals.css';

document.title = `100 ימים לשחרור של ${siteConfig.person.name}`;
document.querySelector('meta[name="description"]')?.setAttribute('content', siteConfig.description);
document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
document.querySelector('meta[property="og:description"]')?.setAttribute('content', siteConfig.description);

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
