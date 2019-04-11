import React from "react";
import { Link } from "react-router-dom";

function PersonLink({ pageDestination, personName }) {
  return <li><Link to={pageDestination}>{personName}</Link></li>;
}

export default PersonLink;
