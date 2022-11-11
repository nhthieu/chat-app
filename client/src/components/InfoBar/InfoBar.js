import React from "react";
import "./InfoBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircle } from '@fortawesome/free-solid-svg-icons'

export default function InfoBar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <FontAwesomeIcon className="leftInnerContainer--icon" icon={faCircle} /> <h3> {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <FontAwesomeIcon icon={faXmark} />
        </a>
      </div>
    </div>
  )
}