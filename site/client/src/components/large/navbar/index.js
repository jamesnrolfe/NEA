import React from "react";

import Navbar from "./navbar";
import { useState } from "react"; // so that we can toggle the sidebar from the navbar, which we will need
// to do to open it

//redux
import { removeUser } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const NavbarContainer = props => {
    const [sidebar, setSidebar] = useState(false); // we allow the sidebar to be boolean, open or closed
    // being true and false respectively. We initialise to false.

    const showSidebar = () => {
        // function to actually open the sidebar
        setSidebar(!sidebar); // swap the state from whatever it is already.
    };

    const dispatch = useDispatch();
    const user = useSelector(state => state.user); // the current state of the user

    const signOut = () => {
        dispatch(removeUser());
    };

    return (
        <Navbar
            sidebar={sidebar}
            showSidebar={showSidebar}
            switchTheme={props.switchTheme}
            showSignUpButton={user == null} // if there is no user, we want to show the sign up button
            signOut={signOut}
        />
    ); // actually render the
    // visual part of the component, defined within navbar.js
};

export default NavbarContainer; // export to be used by the index file so the navbar can be displayed
