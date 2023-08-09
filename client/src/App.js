import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from 'react-router-dom';

import Container from './Components/Container/Container';
import VideoGames from './Components/VideoGames/VideoGames';
import Detail from './Components/Detail/Detail';
import NewGames from './Components/NewGames/NewGames'
import { useState } from 'react';
import { result } from './constants/Mocks';


const orderObjectArrayAlphabetically = (array, key) =>{
  return array.sort((a,b) => {
    let nameA = a[key]
    if(key === 'title') nameA = nameA.toLowerCase()
    let nameB = b[key]
    if(key === 'title') nameB = nameB.toLowerCase()
    if(nameA < nameB) return -1
    if(nameA > nameB) return 1
    return 0
  })
}


function App() {
  const [gameslist, setGamesList] = useState(result)
  const [orderBy, serOrderBy] = useState('title')
  
  const handleOnSearch = (textToSearch) => {
    const filtered = textToSearch !== '' ? result.filter(res => res.title.toLowerCase().includes(textToSearch.toLowerCase())) : result
    setGamesList(filtered)
  }

  const handleOndOrder = () =>{
    const ordered = orderObjectArrayAlphabetically(gameslist, orderBy)
    serOrderBy(orderBy === 'title' ? 'id' : 'title')
    setGamesList(ordered.slice(0))
  }
  return (
    <Router>
      <Container onSearch={handleOnSearch} onOrder={handleOndOrder}>
        <Switch>
          <Route path="/" exact>
            <VideoGames list={gameslist}/>
          </Route>
          <Route path="/add">
           <NewGames/>
          </Route>
          <Route path= "/detail/:id">
            <Detail/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
