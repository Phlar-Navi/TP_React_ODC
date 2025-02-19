import axios from "axios";
import { useState } from 'react';

const Create = () => {

    const [formdata, setformdata] = useState({bedrooms: 0, kitchens: 0, living_rooms: 0, toilets: 0, price: 0, address: "", type: "", status: ""}); //gerer les donnes du formulaire
    //const [listeInscription, setlisteInscription] = useState([]); //liste des utilisateurs a update a chaque ajout

    // const handleSubmit = (event) => { // Pour gerer le formulaire d'envoi
    //     event.preventDefault();
    //     // let nom = formdata.name;

    //     if(formdata.bedrooms && formdata.kitchens && formdata.living_rooms && formdata.toilets && formdata.price && formdata.address) {
    //         let datas = formdata;
    //         //setformdata({name:"", prenom:"", email:""});

    //         axios.post('https://real-estate-api-64hf.onrender.com/api/properties', {
    //             address: formdata.address,
    //             bedrooms: formdata.bedrooms,
    //             kitchens: formdata.kitchens,
    //             living_rooms: formdata.living_rooms,
    //             price: formdata.price,
    //             status: formdata.status,
    //             toilets: formdata.toilets,
    //             type: formdata.type,
    //             id: 4,
    //             created_at: "2025-02-18T17:13:49.040Z"
    //           })
    //           .then(function (response) {
    //             console.log(response);
    //           })
    //           .catch(function (error) {
    //             console.log(error);
    //           });

    //     } else {
    //         alert("Message d'erreur");
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
    
        // Vérifie que tous les champs requis sont remplis
        const requiredFields = ['bedrooms', 'kitchens', 'living_rooms', 'toilets', 'price', 'address'];
        const isFormValid = requiredFields.every(field => formdata[field]);
    
        if (!isFormValid) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return; // Arrête l'exécution si le formulaire n'est pas valide
        }
    
        // Données à envoyer
        const payload = {
            address: formdata.address,
            bedrooms: formdata.bedrooms,
            kitchens: formdata.kitchens,
            living_rooms: formdata.living_rooms,
            price: formdata.price,
            status: formdata.status || "Disponible", // Valeur par défaut si non fournie
            toilets: formdata.toilets,
            type: formdata.type || "Appartement", // Valeur par défaut si non fournie
            id: Date.now(), // Génère un ID unique basé sur le timestamp
            created_at: new Date().toISOString(), // Date de création actuelle au format ISO
        };
    
        try {
            // Envoi des données via Axios
            const response = await axios.post('https://real-estate-api-64hf.onrender.com/api/properties', payload);
            console.log("Réponse du serveur :", response.data);
    
            // Réinitialisation du formulaire après un envoi réussi
            setformdata({
                address: "",
                bedrooms: "",
                kitchens: "",
                living_rooms: "",
                price: "",
                status: "",
                toilets: "",
                type: "",
            });
    
            alert("Données envoyées avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            alert("Une erreur s'est produite lors de l'envoi des données.");
        }
    };

    const handleChange = (event) => {
        let field_name = event.target.name;
        let field_value = event.target.value;

        setformdata({...formdata, [field_name]: field_value}); 
        console.log(formdata);
    }


    return(
        <>
           <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <form onSubmit={handleSubmit} style={{ padding: "30px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                            <h2 className="text-center mb-4">Formulaire d'inscription</h2>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Type</label>
                                    <select className="form-select" name="type" onChange={handleChange}>
                                        <option value="appartement">Appartement</option>
                                        <option value="villa">Villa</option>
                                        <option value="house">Maison</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre de chambres</label>
                                    <input type="number" name="bedrooms" className="form-control" onChange={handleChange}/>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre de cuisines</label>
                                    <input type="number" name="kitchens" className="form-control" onChange={handleChange}/>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre de salons</label>
                                    <input type="number" name="living_rooms" className="form-control" onChange={handleChange}/>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre de toilettes</label>
                                    <input type="number" name="toilets" className="form-control" onChange={handleChange}/>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Prix</label>
                                    <input type="number" name="price" className="form-control" onChange={handleChange}/>
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label">Adresse</label>
                                    <input type="text" name="address" className="form-control" onChange={handleChange}/>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Statut</label>
                                    <select name="status" className="form-select" onChange={handleChange}>
                                        <option value="available">Disponible</option>
                                        <option value="under construction">Sous-travaux</option>
                                        <option value="occupied">Occupé</option>
                                    </select>
                                </div>
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Create;