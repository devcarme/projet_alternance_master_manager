import React from "react";

const CVSelect = ({ details }) => (
  <option value={details.idCV}>{details.lien} {details.valide}</option>
);

export default CVSelect;
