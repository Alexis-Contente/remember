// Component import
import './profile.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';

// Tools React import
import axios from 'axios';
import { LOGOUT } from '../../actions/user';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Function to modify profil user
function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pseudo, setPseudo] = useState('');
    const [newPseudo, setNewPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState ('');

    // We create a variable to store the jwt
    const jwt = 'Bearer '+ localStorage.getItem("jwt");

    const config = {
      headers:{
        'Authorization': jwt
      }    
    }
    // function that retrieve user informations
    const getUserInformations = async () => {
        axios.get('http://localhost:8000/api/profile',config)
            .then((response) => {
            setPseudo(response.data.pseudo);
            setEmail(response.data.email);
        })
            .catch((error) => {
        })};

    // on load, execute getUserInformations()
    useEffect(() => {
        getUserInformations()
    },)
    

    const handleChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.currentTarget.value);
    }

    const handleChangeNewPassword = (e) => {
        e.preventDefault();
        setNewPassword(e.currentTarget.value);
    }

    const handleChangeNewPseudo = (e) => {
        e.preventDefault();
        setNewPseudo(e.currentTarget.value);
    }

    const handleChangeNewEmail = (e) => {
        e.preventDefault();
        setNewEmail(e.currentTarget.value);
    }

    // Handle submit for every situations (change everything or just password, email, etc...)
    const handleSubmit = (e) => {
        e.preventDefault();
        if(newPassword !== ""){
            if((newPassword !== "" && newPassword.length >= 8 && newEmail !== "" && newPseudo !== "" && newPseudo.length > 4)){
                axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/profile/update', {  
                    newPassword: newPassword,
                    oldPassword: password,
                    email: newEmail,
                    pseudo: newPseudo,
                    }, config)
                    .then((response) => {
                        console.log(response)
                        toast.success("mot de passe, email et pseudo modifié avec succès !")
                        dispatch({
                            type: LOGOUT,
                            });
                            navigate("/signin");
                    }).catch((error) => {
                        toast.error("Erreur lors du changement de mot de passe, de l'email ou du pseudo")
                    });
            } 
            
            if((newPassword !== "" && newPassword.length >= 8 && newEmail === "" && newPseudo !== "")){
                axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/profile/update', {  
                    newPassword: newPassword,
                    oldPassword: password,
                    pseudo: newPseudo,
                    }, config)
                    .then((response) => {
                        console.log(response)
                        toast.success("mot de passe et pseudo modifié avec succès!")
                        dispatch({
                            type: LOGOUT,
                            });
                            navigate("/signin");

                    }).catch((error) => {
                        toast.error("Erreur lors du changement de mot de passe ou du pseudo")
                    });
            }            
            
            if((newPassword !== "" && newPassword.length >= 8 && newEmail !== "" && newPseudo === "")){
                axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/profile/update', {  
                    newPassword: newPassword,
                    oldPassword: password,
                    email: newEmail,
                    }, config)
                    .then((response) => {

                        console.log(response)
                        toast.success("mot de passe et email modifié avec succès !")
                        dispatch({
                            type: LOGOUT,
                            });
                            navigate("/signin");

                    }).catch((error) => {
                            toast.error("Erreur lors du changement de mot de passe ou de l'email")
                    });
            }

            if((newPassword !== "" && newPassword.length >= 8 && newEmail === "" && newPseudo === "")){
                axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/profile/update', {  
                    newPassword: newPassword,
                    oldPassword: password,
                    }, config)
                    
                    .then((response) => {
                            console.log(newPassword.length)
                        console.log(response)
                        toast.success("mot de passe modifié avec succès !")
                        dispatch({
                            type: LOGOUT,
                            });
                            navigate("/signin");
                        
                    }).catch((error) => {
                        toast.error("Erreur lors du changement de mot de passe")
                    });
                } 
            else if(newPassword.length < 8){
                toast.error("Mot de passe trop court")
            }
        }

            if((newPseudo !== "" && newPseudo.length > 4 && newPassword === "" && newEmail === "")){
                axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/profile/update', {  
                    pseudo: newPseudo,
                    }, config)
                    .then((response) => {
                        console.log(response)
                        toast.success("pseudo modifié avec succès !")
                    }).catch((error) => {
                        toast.error("Erreur lors du changement du pseudo")
                    });
            }

            if((newPseudo !== "" && newPseudo.length > 4 && newPassword === "" && newEmail !== "")){
                axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/profile/update', {  
                    pseudo: newPseudo,
                    email: newEmail,
                    }, config)
                    .then((response) => {
                        console.log(response)
                        toast.success("email et pseudo modifié avec succès !");
                        dispatch({
                            type: LOGOUT,
                            });
                            navigate("/signin");
                    }).catch((error) => {
                        toast.error("Erreur lors du changement du pseudo")
                    });
            }

            if((newEmail !== "" && newPassword === "" && newPseudo === "")){
                axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/profile/update', {  
                    email: newEmail,
                    }, config)
                    .then((response) => {
                        console.log(response)
                        toast.success("email modifié avec succès !");
                        dispatch({
                            type: LOGOUT,
                            });
                            navigate("/signin");
                    }).catch((error) => {
                        toast.error("Erreur lors du changement de l'email")
                    });
            }
        }

    // Displays profile form
    return (
        <>
            <Header />
                <div className="profile">      
                    <h3 className="title">Mon profil</h3>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form action="#" method="POST" className="form-profile">
                                <div className="px-4 py-5 sm:p-6">
                                    <label htmlFor="pseudo" className="intitule">Pseudo actuel : <span className=''>{pseudo}</span></label>
                                    
                                    <input
                                        onChange={handleChangeNewPseudo}
                                        placeholder='Nouveau pseudo ...'
                                        type="text"
                                        value={newPseudo}
                                        name="pseudo"
                                        id="pseudo" 
                                        autoComplete="given-name" 
                                        className="input input-form" />

                                    <label htmlFor="email" className="intitule">adresse email actuelle : {email}</label> 
                                    
                                    <input
                                        onChange={handleChangeNewEmail}
                                        placeholder="Nouveau email ..."
                                        type="text" 
                                        value={newEmail}
                                        name="email"
                                        id="email" 
                                        autoComplete="given-name" 
                                        className="input input-form" />


                                    <label htmlFor="password" className="intitule">Mot de passe actuel</label>
                                    <input
                                        
                                        placeholder="Mot de passe actuel"
                                        type="password"
                                        value={password} 
                                        onChange={handleChangePassword}
                                        name="password" 
                                        id="password" 
                                        autoComplete="given-name" 
                                        className="input input-form" />


                                    <label htmlFor="newpassword" className="intitule">Nouveau mot de passe</label>
                                    <input
                                        placeholder="Nouveau mot de passe"
                                        type="password"
                                        name="password" 
                                        id="newpassword"
                                        onChange={handleChangeNewPassword}
                                        value={newPassword}
                                        autoComplete="given-name" 
                                        className="input input-form" />  
                                </div>

                                <div>
                                    <button 
                                        className="tracking-wide text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg w-full px-4 py-2" 
                                        type="submit" 
                                        onClick={(e) => {handleSubmit(e)}}>Enregistrer
                                    </button>
                                </div> 
                            </form>
                        </div>       
                </div>
            <Footer />
        </>
    )
}

export default Profile;