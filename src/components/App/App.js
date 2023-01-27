import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Search from './Search/Search.jsx';
import LikeList from '../LikeList/LikeList.jsx';

function App(props) {
  return (
    <Router>
      <div>
        <nav>
          <button>
            <Link to = '/'>Search</Link>
          </button>
          <button>
            <Link to = '/favorites'>Favorites</Link>
          </button>
        </nav>
        <Route exact path = '/'>
          <Search />
        </Route>
        <Route exact path = '/favorites'>
          <LikeList />
        </Route>
      </div>
    </Router>
  );
}

export default App;
