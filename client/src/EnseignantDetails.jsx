import React from "react";

const EnseignantDetails = ({ details }) => (
  <tr>
        <td>{details.idUtilisateur}</td>
        <td> {details.nom}</td>
        <td> {details.prenom}</td>
  </tr>
);

export default EnseignantDetails;
