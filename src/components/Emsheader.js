import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Emsheader() {
  return (
    <Navbar className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <i class="fa-brands fa-hive me-2"></i>
          <span className='fw-bolder'>Employee Managment</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Emsheader