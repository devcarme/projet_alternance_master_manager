import React from "react";

const EntretienDetails = ({ details }) => (
  <tr>
        <td>{details.idEntretien}</td>
        <td> {details.dateEntretien}</td>
        <td>
        {details.estOrganiseParUBO
          ? <p>Oui</p>
          : <p>Non</p>
        }
        </td>
        <td>
        {details.estPersonnel
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
