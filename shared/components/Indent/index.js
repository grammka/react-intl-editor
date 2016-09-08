import React from 'react'
import padding from 'util/padding'
import margin from 'util/margin'


function Indent(props) {
  // Additional wrapper with pt and mt needed to collapse child margins
  return (
    <div style={{ paddingTop: '1px', marginTop: '-1px' }}>
      <div style={{ ...padding(props), ...margin(props) }}>
        {props.children}
      </div>
    </div>
  )
}

export default Indent

