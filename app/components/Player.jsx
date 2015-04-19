var React = require("react");

Player.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default class Player extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
}


