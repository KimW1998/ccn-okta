import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SunnyIcon from "@mui/icons-material/WbSunny";
import { Routes, Route, Link as RouterLink } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { ThemeContext } from "./lib/theme";
import { FetchContext } from "./lib/fetchDataCache";
import { Action, State } from "./store/types";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

const showUser = (reduxState: State) => {
  return reduxState.user;
};

export default function App() {
  const { theme, toggle } = useContext(ThemeContext);
  const user = useSelector(showUser);
  const dispatch = useDispatch<Dispatch<Action>>();
  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ color: theme.colors.toolbarBackgroundColor }}>
          <IconButton
            onClick={toggle}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <SunnyIcon />
          </IconButton>
          <IconButton
            component={RouterLink}
            to="/"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          {!user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            </>
          ) : (
            <>
              <p>{user.name}</p>
              <Button
                color="inherit"
                component={RouterLink}
                to="/"
                onClick={logout}
              >
                LogOut
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ height: "2rem" }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
