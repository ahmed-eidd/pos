import './App.less';
import './styles/global.scss';
import Routes from './services/routes';
import { CurrentLangProvider } from './context/currentLang';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './services/store';
import QueryProvider from './services/react-query';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // TODO: add offline support
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(true);

  useEffect(() => {
    function changeStatus() {
      setStatus(navigator.onLine);
      if (!navigator.onLine) {
        message.info('you are offline');
      }
    }
    window.addEventListener('online', changeStatus);
    window.addEventListener('offline', changeStatus);
    return () => {
      window.removeEventListener('online', changeStatus);
      window.removeEventListener('offline', changeStatus);
    };
  }, []);

  return (
    <QueryProvider>
      <Provider store={store}>
        <CurrentLangProvider>
          <Routes />
          <ScrollToTop />
        </CurrentLangProvider>
      </Provider>
    </QueryProvider>
  );
}

export default App;
