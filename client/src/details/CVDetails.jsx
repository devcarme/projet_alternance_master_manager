import React from "react";

const CVDetails = ({ details }) => (
  <tr className="text-center">
        <td>{details.idCV}</td>
        <td> {details.lien}</td>
        <td>
        {details.observations == ""
          ? <p>Aucune</p>
          : <p>{details.observations}</p>
        }
        </td>
        <td>
        {details.valide == 1
          ? <p>Oui</p>
          : <p>Non</p>
        }
        </td>
  </tr>
);

export default CVDetails;
