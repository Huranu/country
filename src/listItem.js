import React from "react";

export default function ListItem(country) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <img alt="img" style={{width:""}} src={country.country.flags.png} />
      <div>
        <p>{country.country.name.official}</p>
      </div>
    </div>
  );
}
