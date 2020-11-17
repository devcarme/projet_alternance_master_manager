import React from "react";

const CandidatureSelect = ({ details }) => (
  <option value={details.idCandidature}>{details.nomEntreprise} {details.intituleOffre} {details.idLettreMotivation} {details.origineOffre}</option>
);

export default CandidatureSelect;
