import { QueryClient } from '@tanstack/react-query';
import { message } from 'antd';
// import { toast } from 'react-toastify';

const onErrorHandler = (error) => {
  const code = error?.response?.status;
  console.log('onError Global code is ', code, +'/' + error);
  if (code === 401 || code === 419 || code === 101) {
    localStorage.clear();
    window.location.replace('/login');
    return null;
  }

  // const loginError =
  //     error.response?.status === 419 || error.response?.status === 101;

  //   if (loginError) {
  //     message.error('برجاء اعادة تسجيل الدخول');
  //     clearDataStorage();
  //     navigate('/login');
  //   }

  if (code >= 400 || code < 500) {
    message.error('خطا في تحميل البيانات برجاء المحاوله مره اخرى');

    // toast.error(error.message, { autoClose: 30000, hideProgressBar: true });
  } else {
    // toast.error(
    //   'Sorry. something went wrong .A team of highly trained developers has been dispatched to deal with this situation!',
    //   { autoClose: 30000, hideProgressBar: true }
    // );
  }
  return error;
};

export default new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 2, // means queries will not refetch their data as often
      // cacheTime: 1000 * 60 * 7,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
      // retry: 2,
      onSuccess: (res) => {
        // console.log('onSuccess Global queries', res);
        if (res?.code !== 200) {
          // toast(res?.message);
        }
        if (res?.validation) {
          res.validation?.forEach((err) => {
            // toast.error(err, { autoClose: 30000, hideProgressBar: true });
          });
        }
      },
      onError: onErrorHandler,
      networkMode: 'always',
    },
    mutations: {
      onSuccess: (res) => {
        // console.log('onSuccess Global mutations', res);
        if (res?.code === 200) {
          // toast.success(res?.message);
        }
        if (res?.validation) {
          res.validation?.forEach((err) => {
            // toast.error(err, { autoClose: false })
            // toast.error(err, { autoClose: 30000, hideProgressBar: true });
          });
        }
      },
      onError: onErrorHandler,
      networkMode: 'always',
    },
  },
});
