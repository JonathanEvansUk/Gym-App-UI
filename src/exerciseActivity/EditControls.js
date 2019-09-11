import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const EditControls = props => {
  if (props.editable) {
    return (
      <EditingControls
        onCancel={props.onCancel}
        onSave={props.onSave}
        onEdit={props.onEdit}
      />
    );
  } else {
    return <ViewingControls onEdit={props.onEdit} />;
  }
};

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
      <EditButton onEdit={props.onEdit} />
    </div>
  );
}
export default EditControls;
