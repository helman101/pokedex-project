import React from 'react'

export const CrossPad = () => {
  return (
    <div className="cross-wrapper position-absolute">
      <div className="cross rounded">
        <div className="cross-line top position-absolute" />
        <div className="cross-line right position-absolute" />
        <div className="cross-line bottom position-absolute" />
        <div className="cross-line left position-absolute" />
      </div>
    </div>
  )
}
