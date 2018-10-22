import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'

import App from './components/App'
import Talk from './components/Talk'

import './index.scss'

class Index extends Component {

  render() {
    return(<Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/index" component={App} />
        <Route path="/talk" component={Talk} />
      </Switch>
    </Router>)
  }

}

render(<Index />, document.getElementById('app'));