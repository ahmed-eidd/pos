import './App.less';
import './styles/global.scss';
import Routes from './services/routes';
import { CurrentLangProvider } from './context/currentLang';

function App() {
  return (
    <CurrentLangProvider>
      <Routes />
    </CurrentLangProvider>
  );
}

export default App;
