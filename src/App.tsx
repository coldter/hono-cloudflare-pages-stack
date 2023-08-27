import { LocationProvider } from './contexts/LocationContext';
import './styles/global.css';

function App() {
  return (
    <>
      <LocationProvider>
        <h1>Hello, world</h1>
      </LocationProvider>
    </>
  );
}

export default App;
