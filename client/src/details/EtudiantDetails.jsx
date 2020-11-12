import React from "react";

const EtudiantDetails = ({ details }) => (
    <tr>
        <td>{details.idEtudiant}</td>
        <td>{details.prenom}</td>
        <td>{details.nom}</td>
        <td>{details.parcours}</td>
        <td>{details.nationaliteFrancaise}</td>
        <td>{details.dateNaissance}</td>
        <td>{details.typeContrat}</td>
        <td>{details.dateObtentionStage}</td>
        <td>{details.idEntreprise}</td>
  </tr>
);

export default EtudiantDetails;
