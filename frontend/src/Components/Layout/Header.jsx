import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
export const Header = () => {
    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="./images/shopit_logo.png" />
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    Login
                </div>
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <span className="ml-1" id="cart_count">2</span>
                </div>
            </nav>
        </>
    )
}
