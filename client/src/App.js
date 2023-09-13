import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from 'react-router-dom';

import Container from './Components/Container/Container';
import VideoGames from './Components/VideoGames/VideoGames';
import Detail from './Components/Detail/Detail';
import NewGames from './Components/NewGames/NewGames';
import Landing from './Components/Landing/Landing';

function App() {  
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Container>
          <Route path="/home">
            <VideoGames />
          </Route>
          <Route path="/add">
          <NewGames/>
          </Route>
          <Route path= "/detail/:id">
            <Detail/>
          </Route>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
