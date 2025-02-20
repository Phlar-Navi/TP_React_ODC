import { useState } from "react";
import house from "../assets/maison.jpg";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect } from "react";

const Details = ({ logement: logementProp }) => {

    // var params = useParams();
    const { id } = useParams(); // ✅ 
    const [logement, setLogement] = useState(logementProp || {}); // ✅ 

    //console.log(logement);
    //console.log(id);

    useEffect(() => {
          axios.get(`https://real-estate-api-64hf.onrender.com/api/properties/${id}`).then((response) => {
            setTimeout(() => setLogement(response.data), 1000);
            console.log(response.data);
          }).catch((error) => {
            console.log(error);
          });
      }, [id])

    //const [logement, setLogement] = useState({});

    return(
        <div className="container-fluid py-5">
            <div className="row align-items-center">
                <div className="col-lg-7">
                <img
                    src={house}
                    alt="Maison"
                    className="img-fluid rounded shadow-lg w-100"
                    style={{ height: "80vh", objectFit: "cover" }}
                />
                </div>

                <div className="col-lg-5 d-flex flex-column justify-content-center p-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
                <h1 className="fw-bold text-dark">
                    Voici une offre de <span className="text-success">Maison</span>
                </h1>
                <p className="text-muted">
                    Découvrez ce logement exceptionnel situé à <strong>{logement.address}</strong>.
                </p>

                <ul className="list-group mb-4">
                    <li className="list-group-item border-0"><strong>💰 Prix :</strong> {logement.price} €</li>
                    <li className="list-group-item border-0"><strong>🛋 Salon(s) :</strong> {logement.living_rooms}</li>
                    <li className="list-group-item border-0"><strong>🛏 Chambre(s) :</strong> {logement.bedrooms}</li>
                    <li className="list-group-item border-0"><strong>🚿 Salle(s) de bain :</strong> {logement.toilets}</li>
                    <li className="list-group-item border-0"><strong>🍽 Cuisine(s) :</strong> {logement.kitchens}</li>
                </ul>

                <div>
                    <button className="btn btn-success btn-lg me-2">
                    <i className="bi bi-whatsapp"></i> Contacter
                    </button>
                    {/* <button className="btn btn-outline-primary btn-lg">
                    <i className="bi bi-heart"></i> Ajouter aux favoris
                    </button> */}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Details;