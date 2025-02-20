import { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Logement from "./logement";
import axios from "axios";
import { createContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router";
import house from "../assets/maison.jpg";

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

    const appContext = useContext(AppContext);
    console.log(appContext);

    const Calculation = () => {
        if (!listeLogements || listeLogements.length === 0) {
            alert("Aucun logement disponible.");
            return;
        }

        let total = 0;
        

        listeLogements.map((data) => {
            data.price = parseFloat(data.price)
        })
        listeLogements.forEach((value) => {
            //let beta = parseFloat(value);
            total += value.price;
        });

        return total;
        //const val_int = Math.floor(total);

        //alert(`Le prix total est ${total} €`);
    }

    const [dataLoaded, setDataLoaded] = useState(false);

    const totalPrice = useMemo( () => {
        let sum = Calculation();
        console.log(sum);
        return sum;
    }, [dataLoaded]); //Seulement si l'un des elements en crochet change,
                                                                                    //la fonction Calculation sera re appelee

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
                if (typeof res.data == "object" && res.data?.length >= 0){
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

    const Delete = (index) => {
        axios.delete(`https://real-estate-api-64hf.onrender.com/api/properties/${index}`)
        .then(response => {
            alert(`Logement d'identifiant ${index} supprime avec succes`);
        })
        .catch(error => {
            console.error(error);
        })
    }



    return (
        <>
            <div className="container mt-4">
                <div className="alert alert-success fw-bold text-center">
                    Prix Total : {totalPrice} €
                </div>

                <div className="row">
                    {!dataLoaded ? (
                    <div className="text-center text-warning">
                        <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Chargement...</span>
                        </div>
                        <span className="ms-2">Chargement en cours...</span>
                    </div>
                    ) : listeLogements.length === 0 ? (
                    <div className="text-center text-danger">
                        Pas d'élément dans notre liste
                    </div>
                    ) : (
                    listeLogements.map((data, index) => (
                        <div key={index} className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-lg border-0">
                                <div className="row g-0">
                                <div className="col-4">
                                    <img
                                    src={house}
                                    className="img-fluid rounded-start"
                                    alt={data.type}
                                    style={{ height: "100%", objectFit: "cover" }}
                                    />
                                </div>

                                <div className="col-8 d-flex flex-column justify-content-center p-3">
                                    <h5 className="fw-bold">{data.type}</h5>
                                    <p className="text-muted mb-1">
                                    <i className="bi bi-geo-alt"></i> {data.address}
                                    </p>
                                    <p className="fw-bold text-success">{data.price} €</p>
                                    
                                    <span className={`badge 
                                    ${data.status === "available" ? "bg-success" : 
                                    data.status === "under construction" ? "bg-warning" : 
                                    "bg-danger"} 
                                    `}>
                                    {data.status}
                                    </span>

                                    <div className="mt-3">
                                    <Link to={`details/${data.id}`}>
                                        <button className="btn btn-primary btn-sm me-2">
                                        <i className="bi bi-eye"></i> Voir
                                        </button>
                                    </Link>
                                    <Link to={`modify/${data.id}`}>
                                        <button className="btn btn-warning btn-sm me-2">
                                        <i className="bi bi-eye"></i> Modifier
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (confirm("Etes vous sûr de vouloir supprimer cet élément ?")) {
                                                Delete(data.id);
                                            }
                                        }}
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        <i className="bi bi-trash"></i> Supprimer
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                    )}
                </div>
            </div>

        </>
    );
    
}