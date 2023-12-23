import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  // When scroll is a 100px (down in page) we add the navbar visibilty and if not remove visibility on navbar

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    // When we use addEventListener to attach an event listener to an element, and you don't remove that listener when the component unmounts, the event listener remains active even after the component is no longer part of the DOM. This can lead to unexpected behavior and increased memory usage over time, especially if you have many components that are mounting and unmounting.
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    //   Always use nav css, except when scrolling 100px down we want the black__navbar class
    <div className={`nav ${show && "nav__black"}`}>
      {/* Big main logo */}
      <img
        className="nav__logo"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt=""
      />
      {/* Small corner logo */}
      <img
        className="nav__avatar"
        src="http://pngimg.com/uploads/netflix/netflix_PNG8.png"
        alt=""
      />
    </div>
  );
}

export default Nav;
