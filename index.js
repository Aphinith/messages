import React, { Component } from 'react'
import { render } from 'react-dom'
import Messages from './public/components/messages'

class Main extends Component {

  render() {
    return (
      <div>
        <Messages />
      </div>
    )
  }
}

render(<Main />, document.getElementById('app'))