// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import HiddenMenuMobile from "../components/hidden-menu-mobile";
import Footer from "../components/footer";
import { useState } from "react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <Navbar toggleMenu={toggleMenu} />
      <HiddenMenuMobile toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Outlet /> 
      <Footer />
    </>
  );
}
