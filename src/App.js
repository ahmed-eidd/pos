import './App.less';
import './styles/global.scss';
import Routes from './services/routes';
import { CurrentLangProvider } from './context/currentLang';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { message } from 'antd';
import { useEffect, useState } from 'react';

function App() {
  // TODO: add offline support
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(true);

  useEffect(() => {
    function changeStatus() {
      setStatus(navigator.onLine);
      if (!navigator.onLine) {
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
        staleTime: 6000,
      },
      mutations: {
        onError: (e) => {
          message.error(e.message || 'حدث خطا الرجاء المحاولة لاحقا');
        },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentLangProvider>
        <Routes />
      </CurrentLangProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
