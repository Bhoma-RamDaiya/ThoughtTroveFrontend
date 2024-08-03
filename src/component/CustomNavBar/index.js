import React, { useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { doLogOut, getCurrentuser, isLogedIn } from "../../Auth";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setLogin(isLogedIn());
    setUser(getCurrentuser());
  }, [login]);

  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    doLogOut(() => {
      //logout
      setLogin(false);
      navigate("/");
    });
  };

  return (
    <div>
      <Navbar
        color="warning"
        light={true}
        dark={false}
        full="false"
        expand="md"
        className="px-4"
      >
        <NavbarBrand tag={ReactLink} to="/">
          MyBlogs
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                New Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                About
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to="/">
                  Service
                </DropdownItem>
                <DropdownItem>About us </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Contact</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/profile-info">
                    ProfileInfo
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.emailId}
                  </NavLink>
                </NavItem>
                <NavItem onClick={logout}>
                  <NavLink>Logout</NavLink>
                </NavItem>
              </>
            )}
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/Login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/SignUp">
                    SignUp
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          {/* <NavbarText>ProfileLogged</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
