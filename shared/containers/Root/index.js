import React from 'react'
import actions from 'core/actions'


export default class Root extends React.Component {
  componentDidMount() {
    console.debug('actions: ', actions)
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}
