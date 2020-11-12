import React from "react";

const EntrepriseSelect = ({ details }) => (
  <option value={details.idEntreprise}>{details.nomEntreprise}</option>
);

export default EntrepriseSelect;
