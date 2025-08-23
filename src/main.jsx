import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'
import Temp from './Temp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Temp />
  </StrictMode>,
)
