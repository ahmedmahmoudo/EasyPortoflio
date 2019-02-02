import React, { Component } from 'react';
import Menu from './components/Menu';
import Dash from './components/Dash';
import Projects from './components/Projects';
import Aboutme from './components/Aboutme';
import Contactme from './components/Contactme';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from 'axios';
import Login from './components/Login';

const UnAuth = () => {
  return (
    <div className="col-12 text-center alert alert-danger">
        <h1>Not Authorized</h1>
  </div>
  );
};


class App extends Component {

  constructor(props){
    super(props);
    this.state = {"menuOpened": false, "canEdit": false, 'authed': false};
    this.toggleMenu = this.toggleMenu.bind(this);
    this.checkIfCanEdit = this.checkIfCanEdit.bind(this);
    this.getRoutes = this.getRoutes.bind(this);

  }

  componentWillMount() {
    if(this.props.edit) {
      this.checkIfCanEdit();
    }
  }

  checkIfCanEdit() {
    Axios.get('/api/auth').then(response => {
      let res = response.data;
      console.log(res);
      this.setState({"canEdit": !res.error});
    });
  }

  toggleMenu() {
    this.setState({"menuOpened": !this.state.menuOpened});
  }
  

  getRoutes() {
    if(this.props.edit) {
      if(this.state.canEdit) {
        console.log("Can edit routes");
        return (
          <Router>
            <div>
              <Menu toggleMenu={this.toggleMenu} menuOpened={this.state.menuOpened} edit={this.state.canEdit}/>
              <Route exact path="/edit/index" component={() => <Dash toggleMenu={this.toggleMenu} edit={this.state.canEdit}/>} />
              <Route path="/edit/projects" component={() => <Projects edit={this.state.canEdit}/> }  />
              <Route path="/edit/about" component={() => <Aboutme edit={this.state.canEdit}/> } />
              <Route path="/edit/contact" component={() => <Contactme edit={this.state.canEdit}/> } />
              <Route path='/edit/login' component={Login} />
            </div>
          </Router>
        );
      } else {
        return (
            <div>
              <UnAuth/>
              <Login />
            </div>
        )
      }
      
    } else {
      return (
        <Router>
          <div>
            <Menu toggleMenu={this.toggleMenu} menuOpened={this.state.menuOpened}/>
            <Route exact path="/" component={() => <Dash toggleMenu={this.toggleMenu}/>} />
            <Route path="/projects" component={Projects} />
            <Route path="/about" component={Aboutme} />
            <Route path="/contact" component={Contactme} />
          </div>
        </Router>
      );
    }
  }
  render() {
    return (
      <div>
        <div className="background" >
        </div>
        
       {this.getRoutes()}
      </div>
    );
  }
}

export default App;
