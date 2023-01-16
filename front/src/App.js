import './App.css';
import AppContainer from './components/appContainer/AppContainer';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <AppContainer />
    </AppContextProvider>
  );
}

export default App;
