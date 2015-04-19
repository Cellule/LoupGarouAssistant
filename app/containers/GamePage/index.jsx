//import React from "react";
var React = require("react");
import Player from "components/Player";

export default class HomePage extends React.Component {
  static getProps() {
    return {};
  }
  render() {
    return (
      <div>
        <h2>LoupGarou</h2>
        <Player name="Test" />
      </div>
    );
  }
}
