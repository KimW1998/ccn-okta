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

export default function App() {
  const { theme, toggle } = useContext(ThemeContext);

  ///testing for caching
  // const { addItem, getResultsForUrl, cache } = useContext(FetchContext);
  // console.log("current cache:", cache);
  // console.log("has item?:", getResultsForUrl("http://ab.cd"));

  // // just attach this to any random element in the page for now ;)
  // const onClickWhatever = () => {
  //   addItem("http://ab.cd", { answer: 42 });
  // };

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
          <Button color="inherit" component={RouterLink} to="/signup">
            Signup
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
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
