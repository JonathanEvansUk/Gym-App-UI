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
    this.state = {
      index: this.props.index
    };
  }

  render() {
    const { editable } = this.props;
    const { set } = this.props;
    return (
      <Form>
        <FormGroup row>
          <Label for="weight" xs="auto">
            {this.state.index + 1}
          </Label>

          <Col>
            <Input
              name="weight"
              id="weight"
              defaultValue={set.weightKg}
              disabled={!editable}
            />
          </Col>

          <Col>
            <Input
              name="reps"
              id="reps"
              defaultValue={set.numberOfReps}
              disabled={!editable}
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
