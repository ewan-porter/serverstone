import "./App.css";

import React, { useState } from "react";
import TrackMap from "./components/TrackMap";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import {
  Navbar,
  Homepage,
  Schedule,
  Standings,
  CircuitsMap,
} from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route exact path="/standings" element={<Standings />}></Route>
              <Route exact path="/Schdule" element={<Schedule />}></Route>
              <Route
                exact
                path="/circuitsmap"
                element={<CircuitsMap />}
              ></Route>
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            F1 API
            <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
