import './App.css';
import React, {useEffect, useState} from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import config from "./lib/config";

export default function App() {
  return (
    <Home></Home>
  );
}
