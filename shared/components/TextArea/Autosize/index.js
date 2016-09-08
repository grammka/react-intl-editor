import React from 'react'
import ReactDOM from 'react-dom'
import autosize from 'autosize'


const UPDATE  = 'autosize:update'
const DESTROY = 'autosize:destroy'
const RESIZED = 'autosize:resized'

export default class TextareaAutosize extends React.Component {
  static propTypes = {
    onResize: React.PropTypes.func
  }

  static defaultProps = {
    rows: 1
  }

  getTextareaDOMNode = () => {
    if (this.refs.textarea.nodeType === 1) {
      return this.refs.textarea
    } else {
      return ReactDOM.findDOMNode(this.refs.textarea)
    }
  }

  componentDidMount() {
    autosize(this.getTextareaDOMNode())

    if (this.props.onResize) {
      this.getTextareaDOMNode().addEventListener(RESIZED, this.props.onResize)
    }
  }

  componentWillUnmount() {
    if (this.props.onResize) {
      this.getTextareaDOMNode().removeEventListener(RESIZED, this.props.onResize)
    }

    this.dispatchEvent(DESTROY)
  }

  componentWillReceiveProps(nextProps) {
    if (this.getValue(nextProps) !== this.getValue(this.props)) {
      this.dispatchEvent(UPDATE, true)
    }
  }

  dispatchEvent = (EVENT_TYPE, defer) => {
    const event = document.createEvent('Event')

    event.initEvent(EVENT_TYPE, true, false)

    const dispatch = () => this.getTextareaDOMNode().dispatchEvent(event)

    if (defer) {
      setTimeout(dispatch)
    } else {
      dispatch()
    }
  }

  getValue = ({ valueLink, value }) => valueLink ? valueLink.value : value

  render() {
    const { valueLink, border, error, ...props } = this.props

    return (
      <textarea
        ref="textarea"
        {...props}
        value={valueLink.value}
        onChange={valueLink.action((x, e) => e.target.value)}
      />
    )
  }
}
