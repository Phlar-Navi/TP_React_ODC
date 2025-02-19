import { useState } from 'react';


const Login = () => {
    const [formdata, setformdata] = useState({name:"", prenom:"", email:""}); //gerer les donnes du formulaire
    const [listeInscription, setlisteInscription] = useState([]); //liste des utilisateurs a update a chaque ajout

    const handleSubmit = (event) => { // Pour gerer le formulaire d'envoi
        event.preventDefault();
        let nom = formdata.name;

        if(formdata.name && formdata.prenom && formdata.email) {
            setlisteInscription([...listeInscription, formdata]);
            setformdata({name:"", prenom:"", email:""});
            alert(nom + " Enregistre avec succes");
        } else {
            alert("Message d'erreur");
        }

    }

    const handleChange = (event) => { //let old_formData = formdata;
        let field_name = event.target.name;
        let field_value = event.target.value;

        setformdata({...formdata, [field_name]: field_value}); //on appele setFormDate pour mettre a jour la variable data
                                                              //... => va dans data, prend toutes ses proprietes et mets les dans l'objet entier dans l'accolade
        console.log(formdata);
        // if (field_name == "nom" ){
        //     old_formData.nom = field_value;
        // }
    } // A chaque ajout d'element du formulaire (ce qu'on va appliquer a nos trois input)

    const handleDelete = (index) => {
        let tab = listeInscription.splice(index, 1);
        setlisteInscription([...listeInscription]);
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{padding:"30px"}}>
                <br/><br/>
                <label className="form-label">Nom d'utilisateur   </label>
                <input type="text" id="name" name="name" value={formdata.name} onChange={handleChange} className="form-control"></input>
                <br/> <br/>
                <label className="form-label">Prenom  </label>
                <input type="text" id="prenom" name='prenom' value={formdata.prenom} onChange={handleChange} className="form-control"></input>
                <br/> <br/>
                <label className="form-label">Adresse E-mail  </label>
                <input type="text" id="email" name='email' value={formdata.email} onChange={handleChange} className="form-control"></input>
                <br/> <br/>
                <button type="submit" className="btn btn-primary"> S'inscrire </button>
            </form>

            {/* Lorsque je saisis mon formulaire mes donnes se retrouvent dans l'Url, comment faire pour les retirer ? */}

            <table className="table table-striped table-bordered table-hover mt-4">
                <thead className="table-dark">
                    <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listeInscription.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="text-center text-danger">
                        Pas d'élément dans notre tableau
                        </td>
                    </tr>
                    ) : (
                    listeInscription.map((data, index) => (
                        <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.prenom}</td>
                        <td>{data.email}</td>
                        <td>
                            <button onClick={() => {
                                handleDelete(index)
                            }}>Supprimer</button>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>


        </>
    )

};

// Il faut que les utilisateurs soient enregistres et que la liste soit update pour afficher le nouvel utilisateur
// Il doit aussi avoir le bouton supprimer
export default Login;