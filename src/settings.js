import React, { useEffect } from "react";
import { userImg, getuserName, deleteUser, getHighScore } from "./index";

export default function Settings() {
  useEffect(() => {
    const hsBox = document.getElementById("hsBox");
    const timer = setTimeout(() => {
      userImg();
      getuserName();
      let hs = getHighScore();
      let content = document.createTextNode(`${hs}`);
      hsBox.appendChild(content);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="settings">
      <div id="userImg" className="imgBar" style={{ flexGrow: "2" }}>
        Loading...
      </div>
      <div className="sideBar" style={{ flexGrow: "8" }}>
        <div className="jost" style={{ fontWeight: "700" }} id="userName">
          Loading...
        </div>
        <div id="hsBox" className="quicksand">
          Highscore:{" "}
        </div>
        <div>
          <button className="delete" onClick={() => deleteUser()}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
