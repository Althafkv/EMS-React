import React from 'react'
import { Spinner } from 'react-bootstrap'


function Emsspinner() {
  return (
    <div className='mt-5 d-flex justify-content-center align-items-center'>
      <Spinner className='me-2' animation="grow" variant="success" />
      <Spinner className='me-2' animation="grow" variant="danger" />
    </div>

  )
}

export default Emsspinner