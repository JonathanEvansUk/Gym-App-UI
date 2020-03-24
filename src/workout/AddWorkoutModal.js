import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

class AddWorkoutModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.saveWorkout = this.saveWorkout.bind(this);

    this.handleDateChosen = this.handleDateChosen.bind(this);
  }

  toggleModal() {
    this.props.toggleModal();
  }

  saveWorkout() {
    this.props.saveWorkout();

    this.props.toggleModal();
  }

  handleDateChosen(date) {
    console.log(date);

    this.props.handleWorkoutTimestampEdited(date);
  }

  renderSelectWorkoutType() {
    if (this.props.workoutTypes === undefined) {
      return <p>No Workout Types Found</p>;
    }

    let workoutTypeOptions = this.props.workoutTypes.map(workoutType => {
      return <option key={workoutType}>{workoutType}</option>;
    });

    return (
      <Input
        type="select"
        onChange={this.props.handleWorkoutTypeEdited}
        value={this.props.newWorkout.workoutType}
      >
        {workoutTypeOptions}
      </Input>
    );
  }

  render() {
    let performedAtDate = new Date(
      this.props.newWorkout.performedAtTimestampUtc
    );
    return (
      <Modal isOpen={this.props.modal} toggle={this.toggleModal}>
        <ModalHeader>Add Workout</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Workout Type</Label>
              {this.renderSelectWorkoutType()}
            </FormGroup>

            <FormGroup>
              <Label>Timestamp</Label>
              <DatePicker
                injectTimes={[performedAtDate]}
                selected={performedAtDate}
                onChange={this.handleDateChosen}
                timeIntervals={15}
                showTimeSelect
                fixedHeight
                inline
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.saveWorkout}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddWorkoutModal;
