import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./nav.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenuHandler = () => {
    setIsMenuOpen(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>VirtualSky</div>
      </Link>
      <nav>
        <div className={classes.hamburger} onClick={toggleMenuHandler}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`${classes.navLinks} ${isMenuOpen ? classes.open : ""}`}>
          {/* ... other navigation links ... */}
        </ul>
      </nav>
      <Canvas style={{ width: "100px", height: "100px" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box>
          <meshStandardMaterial color={"orange"} />
        </Box>
        <OrbitControls />
      </Canvas>
    </header>
  );
};

export default MainNavigation;
