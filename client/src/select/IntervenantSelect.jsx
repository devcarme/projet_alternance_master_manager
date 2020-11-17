import React from "react";

const IntervenantSelect = ({ details }) => (
  <option value={details.idIntervenant}>{details.prenomIntervenant} {details.nomIntervenant} {details.fonctionIntervenant} {details.nomEntreprise}</option>
);

export default IntervenantSelect;
