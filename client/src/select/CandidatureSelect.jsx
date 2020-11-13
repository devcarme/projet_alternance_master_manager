import React from "react";

const CandidatureSelect = ({ details }) => (
  <option value={details.idCandidature}>{details.nomEntretprise} {details.idCV} {details.idLettreMotivation} {details.origineOffre}</option>
);

export default CandidatureSelect;
