import React, { useEffect } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { checkIsAdmin, signout } from '../actions/userActions';
import { initialAppStateType } from '../store';

export const NavBar = () => {
    const cart = useSelector((state: initialAppStateType) => state.cartStore);
    const { cartItems } = cart;
    const userSignin = useSelector((state: initialAppStateType) => state.userStore);
    const { userInfo } = userSignin;

    const checkIsAdminStore = useSelector((state: initialAppStateType) => state.checkIsAdminStore);
    const { error, loading, status } = checkIsAdminStore

    const dispatch = useDispatch();
    const signoutHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(signout());
    }
    useEffect(() => {
        // userInfo 바꾸면 다시 랜더
        dispatch(checkIsAdmin());
    }, [dispatch, userInfo])

    return (
        // <div className="navbarPart">


        <Navbar bg="dark" variant="dark" expand="lg">
            <div>
                <Link to="/">Dae Euk HanBok</Link>
                {/* <Navbar.Brand as={Link} to="/">Dae Euk HanBok</Navbar.Brand> 요렇게도 사용가능*/}
            </div>
            <div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/about">About</Link>
                        <Link to="/products">Products</Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
            <div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Link to="/cart">Cart
                {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </Link>

                    <div className="nav__right">
                        <Nav className="mr-auto">
                            {
                                userInfo ? (
                                    <NavDropdown className="dropdown__Parent" title={userInfo.name} id="collasible-nav-dropdown">
                                        <div className="dropdown-content">
                                            <Link to="/profile">User Profile</Link>
                                            <Link to="/history">Order History</Link>
                                            <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                        </div>
                                    </NavDropdown>
                                ) : (
                                        <Nav.Link> <Link to="/signin">Sign In</Link></Nav.Link>
                                    )
                            }
                            {/* Admin 계정만 사용할수 있음 */}
                            {console.log('status: ????--->> ', status)}
                            {
                                userInfo && status === 200 && (
                                    <NavDropdown className="dropdown__Parent" title="Admin" id="collasible-nav-dropdown">
                                        <div className="dropdown-content">
                                            <Link to="/dashboard">Dashboard</Link>
                                            <Link to="/productList">Products</Link>
                                            <Link to="/orderList">Orders</Link>
                                            <Link to="/userList">Users</Link>
                                        </div>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </div>
        </Navbar>
        // </div>
    )
}
