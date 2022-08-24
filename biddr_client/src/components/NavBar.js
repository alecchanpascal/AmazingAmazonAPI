import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
    const { currentUser, signOut } = props;
    const handleSignOutClick = event => {
        event.preventDefault();
        if (typeof signOut === "function") {
            signOut();
        }
    }
    return(
        <div className="ui raised segment">
            <div className="ui secondary pointing menu">
                <NavLink exact to="/" className="item">
                    Home
                </NavLink>
                <NavLink exact to="/auctions" className="item">
                    Auction
                </NavLink>
                <NavLink exact to="/auctions/new" className="item">
                    New Auction
                </NavLink>
                <div className="right menu">
                {!currentUser && (
                    <>
                        <NavLink exact to="/sign_in" className="ui inverted orange button">
                        Sign In
                        </NavLink>
                        <NavLink exact to="/sign_up" className="ui black button">
                        Sign Up
                        </NavLink>
                    </>
                )}
                {currentUser && (
                    <>
                    <label className="ui orange right large label">
                        Hello {currentUser.full_name}
                    </label>
                    <button className="ui inverted orange button" onClick={handleSignOutClick}>
                        Sign Out
                    </button>
                    </>
                )}
                </div>
            </div>
        </div>
    );
}

export default NavBar