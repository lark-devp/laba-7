import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';
import User from './components/Query';
import Count from './components/Count';


const App = () =>{
  return (
    <div>
      <h1>Вашему вниманию микросервисы</h1>
      <Hello />
      <User />
      <Count />
    </div>
  );
  
};

export default App;
