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
import { clearDataStorage } from './helper/localStorage';
import { useNavigate } from 'react-router-dom';

function App() {
  // TODO: add offline support
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

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

  const onError = err => {
    // console.log('onError  err', err);
    const loginError =
      err.response?.status === 419 || err.response?.status === 101;

    if (loginError) {
      message.error('برجاء اعادة تسجيل الدخول');
      clearDataStorage();
      navigate('/login');
    }

    if (err.response?.status === 500) {
      message.error('خطا في تحميل البيانات برجاء المحاوله مره اخرى');
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // staleTime: 60000,
        onSettled: res => {
          // console.log('App onSettled res', res);
          const loginError = res?.data?.code === 419 || res?.data?.code === 101;
          if (loginError) {
            message.error('برجاء اعادة تسجيل الدخول');
            clearDataStorage();
            navigate('/login');
          }
        },
        onError,
      },
      mutations: {
        onError,
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
