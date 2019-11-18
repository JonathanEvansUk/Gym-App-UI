import React from "react";

import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

import SetTypeButtons from "./SetTypeButtons.js";

const WeightInput = props => {
  const editable = props.editable;
  const set = props.set;
  const setType = set.type;

  return (
    <InputGroup size="sm" className="flex-nowrap">
      <SetTypeButtons
        editable={editable}
        setType={setType}
        handleSetTypeEdited={props.handleSetTypeEdited}
      />

      {setType === "NonWeightedSet" && (
        <Input
          disabled={!editable}
          value={set.weight}
          onChange={props.handleSetWeightEdited}
        />
      )}

      {setType === "WeightedSet" && (
        <React.Fragment>
          <Input
            disabled={!editable}
            type="number"
            min={0}
            max={200}
            step="0.25"
            style={{
              minWidth: "90px"
            }}
            value={set.weightKg}
            onChange={props.handleSetWeightKgEdited}
          />

          <InputGroupAddon addonType="append">
            <InputGroupText>kg</InputGroupText>
          </InputGroupAddon>
        </React.Fragment>
      )}
    </InputGroup>
  );
};

export default WeightInput;
