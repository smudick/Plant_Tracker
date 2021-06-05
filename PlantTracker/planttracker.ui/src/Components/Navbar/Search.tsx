import React, { Component } from "react";
import { withRouter } from "react-router";
import { SearchProps } from "../../Helpers/Interfaces/SearchInterfaces";

class Search extends Component<SearchProps> {
  state = {
    query: "",
    user: this.props.user,
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      query: e.target.value,
    });
  };
  handleSubmit = (): void => {
    this.props.history.action;
    this.props.history.push({
      pathname: `/search/${this.state.query}`,
      state: { user: this.props.user },
    });
  };
  render(): JSX.Element {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Search for a plant!"
          type="text"
          name="text"
          value={this.state.query}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
export default withRouter(Search);
