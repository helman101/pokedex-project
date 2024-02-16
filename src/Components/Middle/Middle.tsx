import React from 'react'

export const Middle = () => {
  return (
    <section>
      <div className='middle m-auto rounded-pill mt-1 position-relative d-flex justify-content-around align-items-center'>
        <div className='separator left position-absolute' />
        <div className='mic rounded-pill' />
        <div className='separator right position-absolute' />
        <div className='battery-container h-100 d-flex position-absolute d-flex align-items-center'>
          <div className="battery off rounded-pill" />
          <div className="battery on rounded-pill" />
        </div>
      </div>
    </section>
  )
}
