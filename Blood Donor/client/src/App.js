import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router ,Route,Link} from 'react-router-dom'
import Header from './component/Header/header'
import Footer from './component/Footer/Footer'
import Search from './component/Search/search'
import Login from './component/Login/login'
import Register from './component/Register/register'
import Result from './component/Result/result'

function App() {
  return (
    <div className="App">
      <Router>
        <Route  path={'/'} component={Header} />
        <Route exact path={'/search'} component={Search} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/register'} component={Register} />
          <Route exact path={'/result'} />
        <Route path={'/'} component={Footer} />
      </Router>

      
    </div>
  );
}

export default App;
