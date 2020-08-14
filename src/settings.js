import React, {useEffect} from 'react';
import {userImg, getuserName, deleteUser} from './index';

export default function Settings(){
    useEffect(() =>{
        const timer = setTimeout(() => {
            userImg();
            getuserName();
        }, 3000);
        return () => clearTimeout(timer);
    },[]);
    return(
        <div className="settings">
            <div id="userImg" className="imgBar" style={{'flexGrow':'2'}}>Loading...</div>
            <div className="sideBar" style={{'flexGrow':'8'}}>
                <div className="jost" style={{'fontWeight':'700'}} id="userName">Loading...</div>
                <div className="quicksand">Highscore: 0</div>
                <div>
                <button className="delete" onClick={() => deleteUser()}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}