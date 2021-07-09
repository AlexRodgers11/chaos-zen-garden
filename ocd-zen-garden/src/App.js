import './App.css';
import Dots from './Dots';
import Garden from './Garden';
import Header from './Header';
import Snake from './Snake';

function App() {
  return (
    <div className="App">
      <Header />
      <Garden />
      <Dots />
      <Snake />
    </div>
  );
}

export default App;
