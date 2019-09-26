import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import DeleteExerciseActivityModal from "./DeleteExerciseActivityModal";

class EditControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.editable) {
      return (
        <EditingControls
          onCancel={this.props.onCancel}
          onSave={this.props.onSave}
          onEdit={this.props.onEdit}
        />
      );
    } else {
      return (
        <ViewingControls
          onEdit={this.props.onEdit}
          deleteExerciseActivity={this.props.deleteExerciseActivity}
          modal={this.props.modal}
          toggleModal={this.props.toggleModal}
        />
      );
    }
  }
}

function EditButton(props) {
  return (
    <Button color="primary" onClick={props.onEdit} size="sm">
      Edit <FontAwesomeIcon icon={faEdit} />
    </Button>
  );
}

function SaveButton(props) {
  return (
    <Button color="success" onClick={props.onSave} size="sm">
      Save <FontAwesomeIcon icon={faCheck} />
    </Button>
  );
}

function CancelButton(props) {
  return (
    <Button className="mr-2" onClick={props.onCancel} color="danger" size="sm">
      Cancel <FontAwesomeIcon icon={faTimes} />
    </Button>
  );
}

function EditingControls(props) {
  return (
    <div className="float-right">
      <CancelButton onCancel={props.onCancel} />
      <SaveButton onSave={props.onSave} />
    </div>
  );
}

function ViewingControls(props) {
  return (
    <div className="float-right">
      <Button size="sm" className="mr-2" onClick={props.toggleModal}>
        Delete
      </Button>
      <DeleteExerciseActivityModal
        modal={props.modal}
        toggleModal={props.toggleModal}
        deleteExerciseActivity={props.deleteExerciseActivity}
      />
      <EditButton onEdit={props.onEdit} />
    </div>
  );
}
export default EditControls;
