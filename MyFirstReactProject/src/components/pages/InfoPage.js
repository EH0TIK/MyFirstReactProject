import React from "react";
import { connect } from "react-redux";
import { fetchProps } from "../../reduxStuff/actions";

class InfoPage extends React.Component {
  state = {
    fetchedRows: ["homeworld", "vehicles", "films"]
  };

  isURL = (val) => {
    const a = document.createElement("a");
    if (typeof val === "string") {
      a.href = val;
    } else if (val.length) {
      a.href = val[0];
    }
    return (a.host && a.host !== window.location.host);
  };

  componentDidMount() {
    const { obj, fetchProperty } = this.props;
    const { fetchedRows } = this.state;
    const personProp = Object.keys(obj).filter(p => fetchedRows.includes(p));
    const payload = { personName: obj.name };
    let isEmpty = true;
    personProp.forEach((prop) => {
      if (this.isURL(obj[prop])) {
        payload[prop] = obj[prop];
        isEmpty = false;
      }
    });
    if (!isEmpty) {
      fetchProperty(payload);
    }
  }

  enrollProperties = () => {
    const { fetchedRows } = this.state;
    const { obj } = this.props;
    const forbiddenProps = ["entities", "created", "url", "edited", "species", "starships", ...fetchedRows];
    return Object.keys(obj).map(propName => (
      !forbiddenProps.includes(propName)
        ? `${propName} = ${obj[propName]}`
        : ""
    ));
  };


  render() {
    const { history, id, hasVehicles } = this.props;
    const propInfo = this.enrollProperties()
      .filter(el => el)
      .map((row, i) => (<p key={i}>{row}</p>));

    return (
      <div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={history.goBack}
        >go back
        </button>
        {propInfo}
        
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  id:          ownProps.match.params.id,
  obj:         state.data[ownProps.match.params.id],
  hasVehicles: Boolean(state.data[ownProps.match.params.id].vehicles.length)
});

const mapDispatchToProps = dispatch => ({ fetchProperty: info => dispatch(fetchProps(info)) });

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
