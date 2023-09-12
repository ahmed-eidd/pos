import './App.less';
import './styles/global.scss';
import Routes from './services/routes';
import { CurrentLangProvider } from './context/currentLang';
import { ConfigProvider, message } from 'antd';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './services/store';
import QueryProvider from './services/react-query';
import ScrollToTop from './components/ScrollToTop';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import usePrinters from './hooks/usePrinters';

const persistor = persistStore(store);

function App() {
  const { printers } = usePrinters();
  console.log('App  printers:', printers);
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
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider form={{ requiredMark: false }}>
            <CurrentLangProvider>
              <Routes />
              <ScrollToTop />
            </CurrentLangProvider>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </QueryProvider>
  );
}

export default App;
