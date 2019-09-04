import React from "react";
import { Row, Col, Badge, Form, FormGroup, Label, Input } from "reactstrap";

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
  }

  handleSetWeightEdited(e) {
    this.props.onSetWeightEdited(e, this.props.index);
  }

  handleSetRepsEdited(e) {
    this.props.onSetRepsEdited(e, this.props.index);
  }

  render() {
    const { editable, set, index } = this.props;
    return (
      <Form>
        <FormGroup row>
          <Label for="weight" xs="auto">
            {index + 1}
          </Label>

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

          <Col>
            <Badge color={statusColours[set.status]} style={statusBadgeStyle}>
              {set.status}
            </Badge>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Set;
