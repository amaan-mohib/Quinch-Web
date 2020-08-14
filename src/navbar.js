import React, {useState, useEffect, useRef} from "react";
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';
import StarsIcon from '@material-ui/icons/Stars';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Quinch from './assets/quinch_logo.svg';
import './index.css';
import {signOut, userName, userDetail} from './index'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      light: '#8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#fff',
    },
  },
});

export default function Navbar() {
    // useEffect(() => {
    //     userName();
    // },[]);
    const icon = (
        <ThemeProvider theme={theme}>
            <IconButton color="primary">
                <ExpandMoreIcon className="whiter"/>
            </IconButton>
        </ThemeProvider>
    );
    const pfp = (
        <ThemeProvider theme={theme}>
            <IconButton color="primary">
                <div id="userDetails"></div>
            </IconButton>
        </ThemeProvider>
    );
    return (
        <nav className="quicksand">
            <div className="time">
                <AlarmIcon className="whiter iconSpacer" />60
            </div>
            <div className="logo">
            <Link to="/">
                <img src={Quinch} alt="Quinch" title="Quinch" className="quinch" /></Link>
            </div>
            <div className="acc">
                <div>
                    100<StarsIcon className="whiter iconSpacer" />
                </div>
                
                <div id="whenSignedOut">
                    <button className="signIn" id="signInEmail">Sign In</button>
                    <NavItem icon={icon}>
                        <div className="dropdown">
                            <DropDownItem to="/help" leftIcon={<HelpOutlineIcon/>}>Help</DropDownItem>
                            <DropDownItem to="/signin" leftIcon={<SettingsIcon/>}>Settings</DropDownItem>
                        </div>
                    </NavItem>
                </div>
                <div id="whenSignedIn" style={{'display':'none'}}>
                        
                        <NavItem user={pfp} icon={icon}>
                        
                            <div className="dropdown">
                                <DropDownItem to="/settings" leftIcon={<PersonOutlineIcon/>}><div id="greeting"></div></DropDownItem>
                                <DropDownItem to="/help" leftIcon={<HelpOutlineIcon/>}>Help</DropDownItem>
                                <DropDownItem to="/settings" leftIcon={<SettingsIcon/>}>Settings</DropDownItem>
                                <button id="signOutBtn" className="signOut" onClick={() => signOut()}>Sign Out</button>
                            </div>
                        </NavItem>
                </div>   
            </div>
        </nav>
    );
}


function NavItem(props) {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useEffect(() => {
        userDetail();
        document.addEventListener("mousedown", setOpening);
        return () =>{
            document.removeEventListener("mousedown", setOpening);
        }
    },[]);
    const setOpening = (e) => {
        //inside click
        if(node.current.contains(e.target)){
            return;
        }
        //outside click
        setOpen(false);
    }
    return(
        <div ref={node}>
            <button className="iconBut" onClick={() => setOpen(!open)}>
                {props.user}
                {props.icon}
            </button>
            {open && props.children}
        </div>
    );
}

    function DropDownItem(props) {
        useEffect(() => {
            userName();
        },[]);
        return(
                <Link to={props.to} style={{'color':'white','width':'100%'}}>
                    <div className="menu-item">
                        <span className="iconButton">{props.leftIcon}</span>
                        {props.children}
                    </div>
                </Link>
        );
    }