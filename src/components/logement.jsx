import { useState } from 'react';
const Logement = ({ logement, index }) => {

    const [showBookingButton, setShowBookingButton] = useState(false); //reaffiche le composant de la page apres changement de valeur
                                                                       //false est le type de depart

    return (
        <tr key={index}>
            <td>
                <div className="d-flex flex-column">
                    <span>{logement.type}</span>
                    {/* {showBookingButton && (
                        <div className="badge bg-success text-white mt-1">
                            En cours de réservation
                        </div>
                    )} */}
                </div>
            </td>
            <td>{logement.loyer} €</td>
            <td>{logement.adresse}</td>
            <td>
                <span className={`badge ${logement.etat === 'Libre' ? 'bg-success' : 'bg-warning'}`}>
                    {logement.etat}
                </span>
            </td>
            <td>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={() => setShowBookingButton(!showBookingButton)}
                    />
                </div>
            </td>
        </tr>
    );
};

export default Logement;
