import React from 'react'

import CSSModules from 'react-css-modules'
import style from './style'


const Content = CSSModules((props) => (
  <div styleName="content">{ props.children }</div>
), style)

export default Content
