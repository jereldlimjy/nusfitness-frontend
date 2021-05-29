import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({loggedIn, setLoggedIn}) => {
    return (
        <nav className='navbar bg-dark'>
            <Link to='/'><h2>NUSFitness</h2></Link>
            <ul>
				{ loggedIn ?
					<li>
						<Link to='/' onClick={() => setLoggedIn(false)}>Logout</Link>
					</li>
				  	: <Fragment>
						<li className='mr-1'>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/register'>Register</Link>
						</li>
					</Fragment>
				}
			</ul>
        </nav>
    )
}

export default Navbar;