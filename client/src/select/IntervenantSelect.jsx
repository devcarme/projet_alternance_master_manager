import React from "react";

const EntrepriseSelect = ({ details }) => (
  <option value={details.idIntervenant}>{details.prenomIntervenant} {details.nomIntervenant} {details.nomEntretprise}</option>
);

export default EntrepriseSelect;
