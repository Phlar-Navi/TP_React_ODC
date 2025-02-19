import { useEffect, useState } from "react";
import Logement from "./logement";
import axios from "axios";

export default function Logements() {

    const[listeLogements, setlisteLogements] = useState([
        {
            id: 1,
            type: 'Appartement',
            nb_salons: 2,
            nb_douches: 2,
            nb_chambres: 3,
            nb_cuisines: 1,
            loyer: 50000,
            etat: "Occupe",
            adresse: "Rue Cleremont feront"
        },
        {
            id: 2,
            type: 'Duplex',
            nb_salons: 1,
            nb_douches: 2,
            nb_chambres: 4,
            nb_cuisines: 1,
            loyer: 200000,
            etat: "Occupe",
            adresse: "Rue Boulevard"
        },
        {
            id: 3,
            type: 'Chambre',
            nb_salons: 0,
            nb_douches: 0,
            nb_chambres: 1,
            nb_cuisines: 0,
            loyer: 15000,
            etat: "Libre",
            adresse: "Montreal"
        },
        {
            id: 4,
            type: 'Studio',
            nb_salons: 1,
            nb_douches: 1,
            nb_chambres: 1,
            nb_cuisines: 1,
            loyer: 35000,
            etat: "Occupe",
            adresse: "Lubumbashi"
        }
    ]);
    const [dataLoaded, setDataLoaded] = useState(false);

    // const logementsDispos = (critera) => {
    //     let cmpt = 0;
    //     let rev = 0;
    //     listeLogements.forEach((logement) => {
    //         if(logement.etat == "Libre") {
    //             cmpt++;
    //         } else {
    //             rev++;
    //         }
    //     });
        
    //     if (critera == 1){
    //         alert('Le nombre de logements libres est de : ' + cmpt);
    //     } else {
    //         alert('Le nombre de logements occupes est de : ' + rev);
    //     }
    // }

    const logementsDispos = () => {
        let cmpt = 0;
        listeLogements.forEach((logement) => {
            if(logement.etat == "Libre") {
                cmpt++;
            }
        });
        alert('Le nombre de logements libres est de : ' + cmpt);
    }
    const logementsinDispos = () => {
        let cmpt = 0;
        listeLogements.forEach((logement) => {
            if(logement.etat == "Occupe") {
                cmpt++;
            }
        });
        alert('Le nombre de logements occupes est de : ' + cmpt);
    }

    useEffect(() => {
        if(!dataLoaded) {
            axios.get("https://real-estate-api-64hf.onrender.com/api/properties")
            .then((res) => {
                console.log(res.data, typeof res.data);
                if (typeof res.data == "object" && res.data?.length > 0){
                    setTimeout(() => {
                        setlisteLogements(res.data);
                        setDataLoaded(true);
                    })
                }
                else {

                }
            });
        }
    });

    return (
        <>
            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover w-100">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Adresse</th>
                            <th scope="col">Statut</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !dataLoaded ?
                            <>
                                <tr className="bg-danger">
                                    <td colSpan={5} className="text-center text-danger">
                                        Chargement...
                                    </td> 
                                </tr>
                            </> :
                            <>
                            {listeLogements.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-danger">
                                        Pas d'élément dans notre tableau
                                    </td>
                                </tr>
                            ) : (
                                listeLogements.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.type}</td>
                                        <td>{data.price} €</td> {/* Ajout du symbole € pour plus de clarté */}
                                        <td>{data.address}</td>
                                        <td>
                                            <span className={`badge ${data.status === 'available' ? 'bg-success' : 'bg-danger'}`}>
                                                {data.status}
                                            </span>
                                        </td>
                                        <td>
                                            <input type="checkbox" className="form-check-input" />
                                        </td>
                                    </tr>
                                ))
                            )}
                            </>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
    
}