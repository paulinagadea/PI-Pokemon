import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Pokemon from './components/Pokemon/Pokemon.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/details/:id' component={Pokemon} />
      </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
