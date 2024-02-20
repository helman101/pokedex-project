import React from 'react'

export const ButtonPad = () => {
  return (
    <div className="button-wrapper position-absolute">
      <div className="btn top rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center">
        Y
      </div>
      <div className="btn right rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center">
        X
      </div>
      <div className="btn bottom rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center">
        B
      </div>
      <div className="btn left rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center">
        A
      </div>
    </div>
  )
}
