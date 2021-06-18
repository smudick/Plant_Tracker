import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { User } from "../../Helpers/Interfaces/UserInterface";
import Search from "./Search";
import Auth from "../Auth";

const Navigation = (user: User): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar expand="md">
          <NavbarBrand href="/"><i className="fab fa-pagelines leaf-icon"></i>Plant Tracker</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/watering" user={user}>
                  Watering Schedule
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/discovery" user={user}>
                  Discovery
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/browse" user={user}>
                  Browse
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Search user={user} />
          <Auth user={user.user} />
      </Navbar>
    </div>
  );
};
export default Navigation;
