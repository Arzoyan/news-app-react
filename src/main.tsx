
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

    <AppRoutes />
  </Provider>
);
