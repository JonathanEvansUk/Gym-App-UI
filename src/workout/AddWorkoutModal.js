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
    this.handleWorkoutTypeChosen = this.handleWorkoutTypeChosen.bind(this);
    this.saveWorkout = this.saveWorkout.bind(this);
    this.handleWorkoutNameChanged = this.handleWorkoutNameChanged.bind(this);
    this.handleDateChosen = this.handleDateChosen.bind(this);

    let startDate =
      this.props.startDate !== undefined
        ? new Date(this.props.startDate)
        : new Date();

    this.state = {
      workoutName: this.props.workoutName || "",
      chosenWorkoutType: this.props.workoutType,
      startDate: startDate
    };
  }

  toggleModal() {
    this.props.toggleModal();
  }

  saveWorkout() {
    this.props.saveWorkout(
      this.state.workoutName,
      this.state.chosenWorkoutType,
      this.state.startDate
    );

    this.props.toggleModal();
  }

  handleWorkoutNameChanged(event) {
    this.setState({ workoutName: event.target.value });
  }

  handleWorkoutTypeChosen(event) {
    this.setState({ chosenWorkoutType: event.target.value });
  }

  handleDateChosen(date) {
    this.setState({ startDate: date });

    console.log(date);
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
        onChange={this.handleWorkoutTypeChosen}
        value={this.state.chosenWorkoutType}
      >
        {workoutTypeOptions}
      </Input>
    );
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.toggleModal}>
        <ModalHeader>Add Workout</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                value={this.state.workoutName}
                onChange={this.handleWorkoutNameChanged}
              />
            </FormGroup>

            <FormGroup>
              <Label>Workout Type</Label>
              {this.renderSelectWorkoutType()}
            </FormGroup>

            <FormGroup>
              <Label>Timestamp</Label>
              <DatePicker
                injectTimes={[this.state.startDate]}
                selected={this.state.startDate}
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
