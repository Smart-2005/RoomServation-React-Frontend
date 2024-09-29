import { Link } from "react-router-dom";
import "../components/Header.css";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Header(){
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
    const mobileNavStyle = {
        fontSize:'18px',
        paddingTop:'20px',
        paddingBottom:'20px',
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        textDecoration:'none',
        fontWeight:'400',
        color:'white',
       borderBottom:'1px solid white'
    }
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userRole,setUserRole] = useState('')

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true);
            const decodeToken = jwtDecode(token);
            const role = decodeToken.userRoles[0];
            setUserRole(role);
        }
    },[])

    const logOut=()=>{
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are you sure?")){
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            alert("Logout Success");
        }
    }

    const navList = (
        <Box role="presentation" onClick={toggleDrawer(false)}>
            <div style={{
                    backgroundColor:'#2b2d42',
                    width:'250px',
                    height:'100vh',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                }}>

                    {userRole === "ADMIN" ?(
                        <>
                        <Link to="/" style={mobileNavStyle}>Home</Link>
                        <Link to="/reservations" style={mobileNavStyle}>All Reservations</Link>
                        <Link to="/make-reservation" style={mobileNavStyle}>Make Reservations</Link>
                        <Link to="/rooms" style={mobileNavStyle}>All Rooms</Link>
                        <Link to="/myreservation" style={mobileNavStyle}>My Reservation</Link>
                        {isLoggedIn? (
                        <button className="logOutBtn" onClick={logOut} >LogOut</button>
                    ):(
                        <>
                            <Link to='/signup'  style={mobileNavStyle}>Sign Up</Link>
                            <Link to='/signin' style={mobileNavStyle}>Sign In</Link>
                        </>
                    )}

                        </>
                    ):(
                        <>
                        <Link to="/" style={mobileNavStyle}>Home</Link>
                        <Link to="/make-reservation" style={mobileNavStyle}>Make Reservations</Link>
                        <Link to="/myreservation" style={mobileNavStyle}>My Reservation</Link>
                        <Link to="/contactus" style={mobileNavStyle}>Contact Us</Link>
                        <Link to="/aboutus" style={mobileNavStyle}>About Us</Link>
                        {isLoggedIn? (
                        <button className="logOutBtn" onClick={logOut} >LogOut</button>
                    ):(
                        <>
                            <Link to='/signup'  style={mobileNavStyle}>Sign Up</Link>
                            <Link to='/signin' style={mobileNavStyle}>Sign In</Link>
                        </>
                    )}
                        </>
                    )}
                </div>
        </Box>
    );
    return(
        <div style={{margin:0,backgroundColor:'transparent',zIndex:'1',paddingTop: '20px',paddingBottom: '20px',}}>
            <div className="main-container">
                <div style={{
                    width:'65%',
                    height:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-evenly',
                    padding:'0px 10px',
                }}>
                    {userRole === "ADMIN" ?(
                        <>
                        <Link to="/" className="nav_btns">Home</Link>
                        <Link to="/reservations" className="nav_btns">All Reservations</Link>
                        <Link to="/make-reservation" className="nav_btns">Make Reservations</Link>
                        <Link to="/rooms" className="nav_btns">All Rooms</Link>
                        <Link to="/myreservation" className="nav_btns">My Reservation</Link>
                        </>
                    ):(
                        <>
                        <Link to="/" className="nav_btns">Home</Link>
                        <Link to="/make-reservation" className="nav_btns">Make Reservations</Link>
                        <Link to="/myreservation" className="nav_btns">My Reservation</Link>
                        <Link to="/contactus" className="nav_btns">Contact Us</Link>
                        <Link to="/aboutus" className="nav_btns">About Us</Link>
                        </>
                    )}
                </div>
                <div style={{
                    width:'35%',
                    height:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-evenly',
                    padding:'0px 10px',
                }}>
                    {isLoggedIn? (
                        <button onClick={logOut} className="nav_auth_btns">Logout</button>
                    ):(
                        <>
                            <Link to='/signup'  className="nav_auth_btns">Sign Up</Link>
                            <Link to='/signin' className="nav_auth_btns">Sign In</Link>
                        </>
                    )}

                    
                </div>
            </div>

        <div className="main-mobile">
            <Button onClick={toggleDrawer(true)}><span className="material-symbols-outlined">menu</span></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {navList}
            </Drawer>
        </div>
        </div>
    )
}
export default Header;