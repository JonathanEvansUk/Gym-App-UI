import React from "react";
import { Button, Col, Badge, Form, FormGroup, Label, Input } from "reactstrap";
import EditableStatus from "./EditableStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const statusColours = {
  FAILED: "danger",
  COMPLETED: "success"
};

const statusBadgeStyle = {
  width: "100%"
};

class Set extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetWeightEdited = this.handleSetWeightEdited.bind(this);
    this.handleSetRepsEdited = this.handleSetRepsEdited.bind(this);
    this.handleSetStatusEdited = this.handleSetStatusEdited.bind(this);
    this.handleSetDeleteClicked = this.handleSetDeleteClicked.bind(this);
  }

  handleSetWeightEdited(e) {
    this.props.onSetWeightEdited(e, this.props.index);
  }

  handleSetRepsEdited(e) {
    this.props.onSetRepsEdited(e, this.props.index);
  }

  handleSetStatusEdited(status) {
    this.props.onSetStatusEdited(status, this.props.index);
  }

  handleSetDeleteClicked() {
    this.props.onSetDeleteClicked(this.props.index);
  }

  renderStatusSection(editable, status) {
    if (this.props.editable) {
      return (
        <EditableStatus
          onSetStatusEdited={this.handleSetStatusEdited}
          currentStatus={status}
        />
      );
    }

    return (
      <Badge color={statusColours[status]} style={statusBadgeStyle}>
        {status}
      </Badge>
    );
  }

  renderDeleteSetColumn() {
    if (this.props.editable) {
      return (
        <Col xs="1">
          <Button outline color="danger" onClick={this.handleSetDeleteClicked}>
            <FontAwesomeIcon icon={faTimesCircle} size="lg" />
          </Button>
        </Col>
      );
    }

    return <Col xs="1"></Col>;
  }

  render() {
    const { editable, set, index } = this.props;
    const statusSection = this.renderStatusSection(editable, set.status);
    const deleteSetColumn = this.renderDeleteSetColumn();
    return (
      <Form>
        <FormGroup row>
          <Label xs="auto">{index + 1}</Label>

          <Col>
            <Input
              name="weight"
              id="weight"
              defaultValue={set.weightKg}
              disabled={!editable}
              onChange={this.handleSetWeightEdited}
            />
          </Col>

          <Col>
            <Input
              name="reps"
              id="reps"
              defaultValue={set.numberOfReps}
              disabled={!editable}
              onChange={this.handleSetRepsEdited}
            />
          </Col>

          <Col>{statusSection}</Col>

          {deleteSetColumn}
        </FormGroup>
      </Form>
    );
  }
}

export default Set;
