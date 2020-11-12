import React from "react";

const LMSelect = ({ details }) => (
  <option value={details.idLettreMotivation}>{details.lien} {details.valide}</option>
);

export default LMSelect;
