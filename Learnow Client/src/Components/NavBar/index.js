import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { navigate } from 'hookrouter'

import { NavBarIcon } from './NavBarStyles'

export const NavBar = () => {
   return <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <Nav.Link onClick={() => navigate('/')}>
                        <NavBarIcon alt="learnow-logo" src={require('../../images/learnow icon.png')}/>
                    </Nav.Link>
                </Navbar.Brand>
                {/* <NavBarIcon  alt="learnow-logo" src={require('../images/learnow icon.png')}/> */}
                <Nav className="mr-auto">
                    {/* <Nav.Link onClick={() => navigate('/Session')}>Your Activity</Nav.Link> */}
                    <Nav.Link onClick={() => navigate('/Results')}>Your Results</Nav.Link>
                    <Nav.Link onClick={() => navigate('/Recommendations')}>Recommendations</Nav.Link>
                    <Nav.Link onClick={() => navigate('/SessionsComparator')}>Sessions Comparator</Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link href="#signIn">Sign In</Nav.Link>
                    <Nav.Link href="#register">Register </Nav.Link>
                </Nav>
            </Navbar>
            
  </div>
}
