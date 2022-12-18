import './App.less';
import './styles/global.scss';
import Routes from './services/routes';
import { CurrentLangProvider } from './context/currentLang';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './services/store';

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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60000,
      },
      mutations: {
        onError: (e) => {
          message.error(e.message || 'حدث خطا الرجاء المحاولة لاحقا');
        },
      },
    },
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CurrentLangProvider>
          <Routes />
        </CurrentLangProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
