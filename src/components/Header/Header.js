import * as React from 'react';
import logo from '../../logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../App';

function Header() {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    return (
        <div className='header'>
            <nav>
                <Link to="/shop"> <img src={logo} alt="" />Shop</Link>
                <Link to="/review">Order review</Link>
                <Link to="/manage">Manage Inventory</Link>
                {
                    loggedInUser.email?<button onClick={()=>setLoggedInUser({})}>{loggedInUser.name} SignOut</button>:<Link to="/login">Sign In</Link>

                }


            </nav>
        </div>
    );
};

export default Header;