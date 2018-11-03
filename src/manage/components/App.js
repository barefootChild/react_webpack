import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Typed from 'typed.js'

import { Button, Icon } from 'antd'
import './app.scss'

import appActions from '../actions/app'

class App extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      showBtn: false,
      strings: [['你有照片'], ['那你也有相应的故事']],
      options: {
        typeSpeed: 200,
        showCursor: false,
      }
    }
  }

  componentDidMount() {
    const { strings, options } = this.state
    const _self = this
    const completeCallBack2 = function() {
      _self.setState({showBtn: true})
    }
    const completeCallBack1 = function() {
      _self.typed2 = new Typed(_self.el2, { strings: strings[1], ...options, onComplete: completeCallBack2})
    }
    this.typed1 = new Typed(this.el1, { strings: strings[0], ...options, onComplete: completeCallBack1 })
  }

  componentWillUnmount() {
    this.typed1.destroy()
    this.typed2.destroy()
  }

  handleClick() {
    this.props.history.push({pathname: '/manage/talk'})
  }

  render() {
    const { showBtn } = this.state
    const { addAppCount, minusAppCount } = this.props
    let className = 'btn-container'
    if (showBtn) {
      className += ' btn-container-show'
    }
    return (<div className="main">
      <div className="typed-container">
        <span className="typed-container1" ref={el => { this.el1 = el }} onClick={addAppCount.bind(this, 1)}></span>
        <span className="typed-container2" ref={el => { this.el2 = el }} onClick={minusAppCount.bind(this, 1)}></span>
      </div>
      <div className={className}>
        <Button type="primary" size="large" onClick={this.handleClick.bind(this)}>
          <span className="btn-text">Show your photos, Then talk stories</span><Icon type="right" />
        </Button>
      </div>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    count: state.app.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAppCount: appActions.addAppCount(dispatch),
    minusAppCount: appActions.minusAppCount(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)