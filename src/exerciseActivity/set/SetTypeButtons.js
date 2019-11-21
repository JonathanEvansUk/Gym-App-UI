import React from "react";

import { Button, InputGroupAddon } from "reactstrap";

const buttonDefinitions = [
  { setType: "NonWeightedSet", title: "Non" },
  { setType: "WeightedSet", title: "Weighted" }
];

const setTypeButtonStyle = {
  outline: "none",
  boxShadow: "none"
};

function SetTypeButtons(props) {
  const { currentSetType, editable, handleSetTypeEdited } = props;

  const setTypeButtons = buttonDefinitions.map(buttonDefinition => {
    let isCurrentSetType = currentSetType === buttonDefinition.setType;

    return (
      <Button
        key={buttonDefinition.setType}
        disabled={!editable}
        style={setTypeButtonStyle}
        color="primary"
        outline={editable || !isCurrentSetType}
        onClick={() => {
          handleSetTypeEdited(buttonDefinition.setType);
        }}
        active={isCurrentSetType}
      >
        {buttonDefinition.title}
      </Button>
    );
  });

  return (
    <InputGroupAddon addonType="prepend">{setTypeButtons}</InputGroupAddon>
  );
}

export default SetTypeButtons;
