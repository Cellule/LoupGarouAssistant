var React = require("react");
var Player = require("components/Player");

export default class HomePage extends React.Component {
  static getProps() {
    return {};
  }
  render() {
    return (
      <div>
        <h2>LoupGarou</h2>
        <Player />
      </div>
    );
  }
}
