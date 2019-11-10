import React from "react";

import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

const setTypeButtonStyle = {
  outline: "none",
  boxShadow: "none"
};

class WeightInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleSetTypeEdited = this.handleSetTypeEdited.bind(this);
  }

  handleSetTypeEdited(setType) {
    this.props.handleSetTypeEdited(setType);
  }

  render() {
    const editable = this.props.editable;
    const set = this.props.set;
    const setType = set.type;
    return (
      <InputGroup className="flex-nowrap">
        <InputGroupAddon addonType="prepend">
          <Button
            disabled={!editable}
            style={setTypeButtonStyle}
            color="primary"
            outline={editable || setType !== "NonWeightedSet"}
            onClick={() => {
              this.handleSetTypeEdited("NonWeightedSet");
            }}
            active={setType === "NonWeightedSet"}
          >
            Non
          </Button>
          <Button
            disabled={!editable}
            style={setTypeButtonStyle}
            color="primary"
            outline={editable || setType !== "WeightedSet"}
            onClick={() => {
              this.handleSetTypeEdited("WeightedSet");
            }}
            active={setType === "WeightedSet"}
          >
            Weighted
          </Button>
        </InputGroupAddon>

        {setType === "WeightedSet" && (
          <Input
            disabled={!editable}
            type="number"
            min={0}
            max={200}
            step="0.25"
            style={{ minWidth: "90px" }}
            value={set.weightKg}
            onChange={this.props.handleSetWeightKgEdited}
          />
        )}

        {setType === "NonWeightedSet" && (
          <Input
            disabled={!editable}
            value={set.weight}
            onChange={this.props.handleSetWeightEdited}
          />
        )}

        {setType === "WeightedSet" && (
          <InputGroupAddon addonType="append">
            <InputGroupText>kg</InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    );
  }
}

export default WeightInput;
