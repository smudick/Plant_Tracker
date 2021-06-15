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
            {user &&
            <NavItem className="ml-4">
              <Button>Log Out</Button>
            </NavItem>
            }
            {!user &&
            <NavItem className="ml-4">
              <Button>Log In</Button>
            </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default Navigation;
