import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

import App from './components/App'
import Talk from './components/Talk'

const store = createStore(rootReducer)

class Index extends Component {

  render() {
    return(<Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/manage" component={App} />
          <Redirect exact from="/" to="/manage" />
          <Route path="/manage/talk" component={Talk} />
        </Switch>
      </Router>
    </Provider>)
  }

}

render(<Index />, document.getElementById('app'));