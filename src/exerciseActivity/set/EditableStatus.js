import React from "react";

import { Button } from "reactstrap";

const statusButtonsStyle = {
  outline: "none",
  boxShadow: "none"
};

class EditableStatus extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditStatus = this.handleEditSetStatus.bind(this);

    this.state = {
      currentlySelected: this.props.currentStatus
    };
  }

  handleEditSetStatus(status) {
    this.props.onSetStatusEdited(status);
    this.setState({ currentlySelected: status });
  }

  render() {
    return (
      <div>
        <Button
          style={statusButtonsStyle}
          onClick={() => this.handleEditSetStatus("COMPLETED")}
          outline={this.state.currentlySelected !== "COMPLETED"}
          className="mr-2"
          color="success"
        >
          Completed
        </Button>
        <Button
          style={statusButtonsStyle}
          onClick={() => this.handleEditSetStatus("FAILED")}
          outline={this.state.currentlySelected !== "FAILED"}
          color="danger"
        >
          Failed
        </Button>
      </div>
    );
  }
}

export default EditableStatus;
