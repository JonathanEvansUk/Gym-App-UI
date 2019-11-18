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

const SetTypeButton = ({
  isCurrentSetType,
  setType,
  title,
  editable,
  handleSetTypeEdited
}) => (
  <Button
    disabled={!editable}
    style={setTypeButtonStyle}
    color="primary"
    outline={editable || !isCurrentSetType}
    onClick={() => {
      handleSetTypeEdited(setType);
    }}
    active={isCurrentSetType}
  >
    {title}
  </Button>
);

function SetTypeButtons(props) {
  const { setType, editable, handleSetTypeEdited } = props;

  const setTypeButtons = buttonDefinitions.map(buttonDefinition => (
    <SetTypeButton
      key={buttonDefinition.setType}
      isCurrentSetType={setType === buttonDefinition.setType}
      setType={buttonDefinition.setType}
      title={buttonDefinition.title}
      editable={editable}
      handleSetTypeEdited={handleSetTypeEdited}
    />
  ));
  return (
    <InputGroupAddon addonType="prepend">{setTypeButtons}</InputGroupAddon>
  );
}

export default SetTypeButtons;
