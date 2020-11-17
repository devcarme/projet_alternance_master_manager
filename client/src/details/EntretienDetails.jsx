import React from "react";

const EntretienDetails = ({ details }) => (
  <tr className="text-center">
        <td>{details.idEntretien}</td>
        <td> {details.dateEntretien}</td>
        <td> {details.heureEntretien}</td>
        <td>{details.prenomIntervenant} {details.nomIntervenant} {details.fonctionIntervenant}</td>
        <td>{details.nomEntreprise}</td>
        <td>
        {details.estOrganiseParUBO
          ? <p>Oui</p>
          : <p>Non</p>
        }
        </td>
        <td>
        {details.estAnnule
          ? <p>Oui</p>
          : <p>Non</p>
        }
        </td>
  </tr>
);

export default EntretienDetails;
