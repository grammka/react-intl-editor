import React from 'react'
import { Input as ValueLinkInput, TextArea } from 'valuelink/tags'

import cx from 'classnames'
import CSSModules from 'react-css-modules'
import style from './style'


@CSSModules(style, { allowMultiple: true })
export default class Input extends React.Component {
  static defaultProps = {
    focusOnInit: false,
    multiline: false,
    disabled: false,
    type: 'text'
  }

  render() {
    const { styles, h, height, className, valueLink, disabled, type, multiline, focusOnInit, ...rest } = this.props

    const containerHeight = h || height || 40
    const error = valueLink.error

    const containerStyleName = cx('root', `h${ containerHeight }`, {
      'disabled': disabled,
      'errored': error,
      'hidden': type === 'hidden'
    })

    
    const InputElement = React.createElement(multiline ? TextArea : ValueLinkInput, {
      ...rest,
      styleName: 'input',
      valueLink,
      autoFocus: !!focusOnInit,
      type
    })


    return (
      <div className={ className } styleName={ containerStyleName }>
        { InputElement }
      </div>
    )
  }
}
