import React from "react";

const CandidatureDetails = ({ details }) => (
  <tr>
        <td>{details.idCandidature}</td>
        <td> {details.nomEntreprise}</td>
        <td> {details.idCV} {details.idLettreMotivation}</td>
        <td> {details.origineOffre}</td>
  </tr>
);

export default CandidatureDetails;
