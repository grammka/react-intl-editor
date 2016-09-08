import React from 'react'
import { Input as ValueLinkInput } from 'valuelink/tags'
import { Flex, Box } from 'reflexbox'
import cx from 'classnames'

import CSSModules from 'react-css-modules'
import style from './style'

import { AutosizeTextArea as TextArea } from 'components/TextArea'


@CSSModules(style, { allowMultiple: true })
export default class Input extends React.Component {
  static defaultProps = {
    className: '',
    inputClassName: '',
    focusOnInit: false,
    multiline: false,
    border: true,
    disabled: false,
    required: false,
    error: false,
    type: 'text'
  }


  renderCommonParts() {
    const { styles, valueLink, inputClassName, focusOnInit, multiline, disabled, label, required, type, ...rest } = this.props

    const value         = valueLink.value
    const valuePresent  = value !== null && value !== undefined && value !== '' && !Number.isNaN(value)

    const inputStyleName = cx('input', {
      labelExist: !!label,
      filled: valuePresent
    })

    const InputElement = React.createElement(multiline ? TextArea : ValueLinkInput, {
      ...rest,
      className: inputClassName,
      styleName: inputStyleName,
      valueLink,
      disabled,
      required,
      autoFocus: !!focusOnInit,
      type,
      dir: 'auto',
    })


    return (
      <div>
        { InputElement }
        { !!label && <label styleName="label">{label}</label> }
      </div>
    )
  }

  render() {
    const { className, border, disabled, type } = this.props

    const height = this.props.h || this.props.height

    const containerStyleName = cx('root', {
      [`h${height}`]: height,
      'noBorder': !border,
      'disabled': disabled,
      'hidden': type === 'hidden'
    })


    return (
      <div role="input-container">
        <div className={className} styleName={containerStyleName}>
          {
            this.renderCommonParts()
          }
        </div>
      </div>
    )
  }
}
