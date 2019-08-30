import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Container,
  Row,
  Col
} from "reactstrap";
import Set from "./Set";

class ExerciseActivity extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      exerciseActivity: this.props.exerciseActivity,
      collapse: true
    };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const exerciseActivity = this.state.exerciseActivity;
    return (
      <Card>
        <CardHeader onClick={this.toggle}>
          {exerciseActivity.exercise.name}
        </CardHeader>

        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            <Row>
              <Col xs="auto">#</Col>
              <Col>Weight</Col>
              <Col>Reps</Col>
              <Col>Status</Col>
            </Row>
            {this.renderSets(exerciseActivity.sets)}
          </CardBody>
        </Collapse>
      </Card>
    );
  }

  renderSets(sets) {
    return sets.map((set, index) => {
      return <Set set={set} index={index} />;
    });
  }
}
export default ExerciseActivity;
