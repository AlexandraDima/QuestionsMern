import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">
          QuestionsExchange
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <div className="navbar-nav mr-auto">
            <Link className="nav-item nav-link active" to="/">
              Home
            </Link>
          </div>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button className="btn btn-info my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Nav;
