import React from "react";
import { connect } from "react-redux";
import { startLoading } from "../../reduxStuff/actions";
import List from "../List";

class _Main extends React.Component {
  state = {
    stringPattern: ""
  };

  componentDidMount() {
    const { dataFetched, isFetching, getPersons } = this.props;
    if (!(dataFetched || isFetching)) {
      getPersons();
    }
  }

  inputChanged = (e) => {
    this.setState({
      stringPattern: e.target.value.toLowerCase()
    });
  };

  render() {
    const { stringPattern } = this.state;
    return (
      <div>
        <input
          onChange={this.inputChanged}
          type="text"
          className="form-control"
          id="searchInput"
          placeholder="Enter whom are you looking for..."
        />
        <List stringPattern={stringPattern} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPersons: () => dispatch(startLoading())
});

const mapStateToProps = state => ({
  dataFetched: state.dataFetched,
  isFetching:  state.isFetching
});

const Main = connect(mapStateToProps, mapDispatchToProps)(_Main);
export default Main;
