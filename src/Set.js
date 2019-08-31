import React from "react";
import { Row, Col, Badge, Form, FormGroup, Label, Input } from "reactstrap";
import { stat } from "fs";

const statusColours = {
  FAILED: "danger",
  COMPLETED: "success"
};

class Set extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index
    };
  }

  render() {
    const { set } = this.props;
    return (
      <Form>
        <FormGroup row>
          <Label for="weight" xs="auto">
            {this.state.index + 1}
          </Label>

          <Col>
            <Input name="weight" id="weight" defaultValue={set.weightKg} />
          </Col>

          <Col>
            <Input name="reps" id="reps" defaultValue={set.numberOfReps} />
          </Col>

          <Col>
            <Badge color={statusColours[set.status]}>{set.status}</Badge>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Set;
