import React from "react";

import ReactDOM from "react-dom";
// necessary to use react - allows it to be rendered. Since every file is a child to this one, no
// other files need to do this really.

import { useState } from "react";

// import the theme file containing the information about what colours to use with what theme
import "./theme.scss";

// router tools
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// store
import { store } from "./store";
import { Provider } from "react-redux";

// links
import { loadLinks } from "./processes/other/load_links";
import { addLinks } from "./redux/actions";

// pages
import Homepage from "./pages/homepage";
import LoginPage from "./pages/loginpage";
import SignUpPage from "./pages/signuppage";
import RecommendationsPage from "./pages/recommendationspage";
import SearchPage from "./pages/searchpage";
import InfoPage from "./pages/infopage";
import ReviewPage from "./pages/reviewpage";

// navbar
import Navbar from "./components/large/navbar";

const App = () => {
    // default/base function component

    const [darkTheme, setDarkTheme] = useState(true);

    const switchTheme = () => {
        const dark = darkTheme;
        setDarkTheme(!darkTheme);
        const body = document.querySelector("body");
        body.className = dark ? "light" : "dark";
    };

    return (
        <Provider store={store}>
            {/* allow the store to work */}
            <Router>
                {/* react router, allows switching between pages */}
                <Navbar switchTheme={switchTheme} />
                <Routes>
                    {/* all the different pages */}
                    <Route path="/" exact element={<Homepage />} />
                    {/* home page here on the default url */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/recommendations" element={<RecommendationsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/info" element={<InfoPage />} />
                    <Route path="/review" element={<ReviewPage />} />
                </Routes>
            </Router>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

window.onload = function () {
    loadLinks().then(links => {
        store.dispatch(addLinks(links.data));
    });
};
