import React from "react";
import { Button } from "reactstrap";

class AddSetButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddSet = this.handleAddSet.bind(this);
  }

  handleAddSet() {
    this.props.onAddSet(this.props.exerciseActivityId);
  }

  render() {
    if (this.props.editable) {
      return (
        <Button size="sm" onClick={this.handleAddSet}>
          Add Set
        </Button>
      );
    }

    return null;
  }
}

export default AddSetButton;
