import { render, h } from 'preact';
import App from './App';
import './index.css';
import { UiProvider } from './utils/UiContext';

render(
    <UiProvider>
        <App />
    </UiProvider>
, document.body);