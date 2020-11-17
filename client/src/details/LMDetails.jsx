import React from "react";

const LMDetails = ({ details }) => (
  <tr className="text-center">
        <td>{details.idLM}</td>
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

export default LMDetails;
