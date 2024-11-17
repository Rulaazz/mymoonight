import React from 'react';
import { MdHome } from "react-icons/md";
import { LiaCrownSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { TbLogin2 } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";


const Navigation = ({ closeMenu }) => {


  return (
    <ul className="menu-options">
      <li onClick={closeMenu}>
        <Link to="/" className="firstLink">
          <MdHome className="theIcons" /> Home
        </Link>
      </li>
      <li onClick={closeMenu}>
        <Link to="/" className="firstLink">
          <LiaCrownSolid className="theIcons" />All Products
        </Link>
      </li>
       <li onClick={closeMenu}>
        <Link to="/login" className="firstLink">
          <TbLogin2 className="theIcons" /> Login
        </Link>
      </li>
       <li onClick={closeMenu}>
        <Link to="/admin" className="firstLink">
          <RiAdminFill className="theIcons" /> Admin
        </Link>
      </li>
  
    </ul>
  );
};

export default Navigation;
