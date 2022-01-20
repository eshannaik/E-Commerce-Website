import { Component, Fragment } from "react";
import LoginModal from './auth/loginModal';
import Logout from "./auth/logoutModal";
import RegisterModal from './auth/registerModal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container, NavLink } from 'reactstrap';

class AppNavbar extends Component {
    //check if navbar is open or not
    state = {
        isOpen: false
    }

    // check if user is logged in
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    // changing state to open when the navbar is opened
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render (){
        const { isAuthenticated, user} = this.props.auth;

        // Links if user has logged in
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong> {user ? 'Welcome ${user.name}' : ''}</strong>
                    </span>
                </NavItem> 
                <NavItem>
                    <NavLink href = "/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href = "/cart">Cart</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href = "/orders">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>       
            </Fragment>
        )

        // Links if user has not logged in
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        // toggle isOpen when the navbar is opened
        // using isAuthenticated either load authLinks or guestLinks
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href = '/'>E Commerce Store</NavbarBrand>
                        <NavbarToggler onClick = {this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? authLinks: guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect (mapStateToProps,null)(AppNavbar);