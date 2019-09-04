import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Button,
  Row,
  Col
} from "reactstrap";
import Set from "./Set";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class ExerciseActivity extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);

    this.state = {
      exerciseActivity: this.props.exerciseActivity,
      collapse: true,
      editable: false
    };
  }

  toggleCollapse() {
    //this.setState(state => ({ collapse: !state.collapse }));
  }

  toggleEdit(event) {
    event.stopPropagation();
    this.setState(state => ({ editable: !state.editable }));
  }

  cancelEdit() {
    this.setState({ editable: false });
  }

  saveEdit() {
    this.setState({ editable: false });
  }

  render() {
    const exerciseActivity = this.state.exerciseActivity;
    return (
      <Card>
        <CardHeader onClick={this.toggleCollapse}>
          {exerciseActivity.exercise.name}

          {this.renderEditControls()}
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

  renderEditControls() {
    if (this.state.editable) {
      return (
        <EditingControls onCancel={this.cancelEdit} onSave={this.saveEdit} />
      );
    } else {
      return <ViewingControls onClick={this.toggleEdit} />;
    }
  }

  renderSets(sets) {
    const editable = this.state.editable;
    return sets.map((set, index) => {
      return <Set set={set} index={index} editable={editable} />;
    });
  }
}

function EditingControls(props) {
  return (
    <div className="float-right">
      <CancelButton onClick={props.onCancel} />
      <SaveButton onClick={props.onSave} />
    </div>
  );
}

function ViewingControls(props) {
  return (
    <div className="float-right">
      <EditButton onClick={props.onClick} />
    </div>
  );
}

function EditButton(props) {
  return (
    <Button color="primary" onClick={props.onClick} size="sm">
      Edit <FontAwesomeIcon icon={faEdit} />
    </Button>
  );
}

function SaveButton(props) {
  return (
    <Button color="success" onClick={props.onClick} size="sm">
      Save
    </Button>
  );
}

function CancelButton(props) {
  return (
    <Button className="mr-1" onClick={props.onClick} color="danger" size="sm">
      Cancel
    </Button>
  );
}
export default ExerciseActivity;
