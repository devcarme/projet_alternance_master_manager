import React from "react";

const CandidatureDetails = ({ details }) => (
  <tr className="text-center">
        <td>{details.idCandidature}</td>
        <td> {details.nomEntreprise}</td>
        <td> {details.intituleOffre}</td>
        <td> {details.idCV} {details.idLettreMotivation}</td>
        <td> {details.origineOffre}</td>
        <td>
        {details.entretien == null
          ? <p>Ajouter</p>
          : details.entretien
        }
        </td>
  </tr>
);

export default CandidatureDetails;
