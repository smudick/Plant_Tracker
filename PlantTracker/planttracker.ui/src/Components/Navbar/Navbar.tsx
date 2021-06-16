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
import {User} from '../../Helpers/Interfaces/UserInterface';
import Search from './Search';
import Auth from '../Auth';

const Navigation = (user : User): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
      <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Plant Tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/watering">Watering Schedule</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/discovery">Discovery</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/browse" user={user}>Browse</NavLink>
            </NavItem>
            <Search user={user.user}/>
          </Nav>
        </Collapse>
        <Auth user={user.user} />
      </Navbar>
    </div>
  );
};
export default Navigation;
