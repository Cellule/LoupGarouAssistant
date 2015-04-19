var React = require("react");

export default class Player extends React.Component {
  static getProps() {
    return {name: "Test"};
  }
  render() {
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired
};
