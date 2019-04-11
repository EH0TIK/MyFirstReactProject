import React from "react";
import { connect } from "react-redux";

import PersonLink from "./PersonLink";

const list = ({ data, stringPattern }) => {
  const Links = data
    .filter(elem => elem.name.toLowerCase().includes(stringPattern))
    .map((obj, i) => (
      <PersonLink
        key={i}
        pageDestination={`/${i}`}
        personName={obj.name}
      />
    ));
  return (<ol>{Links}</ol>);
};

const mapStateToProps = (state, ownProps) => ({
  data:          state.data,
  stringPattern: ownProps.stringPattern
});

const List = connect(mapStateToProps, null)(list);
export default List;
