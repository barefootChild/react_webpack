import React, { Component } from 'react'
import Typed from 'typed.js'

import '../index.scss'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      strings: [
        '你有照片',
        '那你也有相应的故事'
      ],
      options: {
        typeSpeed: 100,
        backSpeed: 80,
        loop: true
      }
    }
  }

  componentDidMount() {
    const { strings, options } = this.state
    this.typed = new Typed(this.el, { strings, ...options })
  }

  componentWillUnmount() {
    this.typed.destroy()
  }

  render() {
    return (<div className="main">
      <p className="typed-container" ref={(el) => { this.el = el }}></p>
    </div>)
  }
}

export default App