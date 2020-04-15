import React from "react";
import "./Search.css";
export default function Search() {
  return (
    <div>
      <input type="submit" name="searchbtn" id="searchbtn" value="" />
      <input
        type="text"
        name="s"
        id="s"
        className="searchfield"
        placeholder="와인명 입력"
      />
    </div>
  );
}
