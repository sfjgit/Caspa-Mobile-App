import Header from "../Headers/header";
import { Outlet } from "react-router-dom";
import AppBar from "../Appbar/appbar";
import Body from "../Body/body";
import Drawer from "../Drawer/drawer";
import { useState } from "react";
const Layout = () => {
  const [open, setopen] = useState(false);
  return (
    <div>
      <Drawer open={open} handleClose={() => setopen(false)} />
      <Header handleOpen={() => setopen(true)} />
      <Body component={<Outlet />} />

      <AppBar handleOpen={() => setopen(true)} />
    </div>
  );
};

export default Layout;
