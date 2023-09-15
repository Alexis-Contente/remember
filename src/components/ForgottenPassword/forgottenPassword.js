// Component import
import './forgottenPassword.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';

// Tools React import
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

// Function to retrieve password
function ForgottenPassword() {

    // variable to get the token to change the password of the user
    const params = useParams();
    const token = params.id;

    const [email, setEmail] = useState("");
    const [jwtGet, setJwtGet] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    
    // function to handle the password changing screen
    const handlejwtReception = () => {
        if(token !== undefined){
            setJwtGet(true);
        } else {
            return setJwtGet(false);
        }
    }

    // function to handle the email sender after form submit
    const handleSubmit = (e) => {
        axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/profile/forgot', {
            email: email,
        })
        .then((response) => {
            toast.success("Le mail a bien été envoyé")
        })
        .catch((error) => {
            toast.success("erreur lors de l'envoi du mail")
        });
    }

    // function to handle the password change after form submit
    const handleChangePassword = (e) => {
        if(newPassword.length > 8){
        axios.post(`http://malcom-yeoman-server.eddi.cloud/Remember/public/profile/reset/${token}`, {
            password: newPassword,
            resetToken: token
        })
        .then((response) => {
            toast.success("Votre mot de pase a bien été changé")
        })
        .catch((error) => {
            toast.error("Erreur lors du changement de mot de passe")
        });
    }else{
        toast.error("Nouveau mot de passe trop court")
    }
}

    useEffect(() => {
        handlejwtReception();
      },);

      // function that display all the element of our forgottenPassword link
    return (
        <>
            <Header />
                <div className="wrapper">
                    <div className="container-form">
                        <div className="space">
                            <h1 className="link-text text-gradient">Mot de passe oublié</h1>
                                <div className="w-full">
                                    <form className="w-full">

                                    {jwtGet ? 

                                        <>
                                    <div className="mb-2">
                                            <label
                                                htmlFor="password" 
                                                className="libelle">
                                                Nouveau mot de passe
                                            </label>
                                            <input onChange={(e) => {setNewPassword(e.currentTarget.value)}}
                                                name="newPassword"
                                                type="password"
                                                value={newPassword}
                                                className="input block w-full px-4 py-2 mt-2"/>
                                        </div>
                                        <div className="mt-6">
                                            <button className="button w-full px-4 py-2" onClick={(e) =>{e.preventDefault(); handleChangePassword()}}>
                                                Changer le mot de passe
                                            </button>
                                        </div>
                                        </> 

                                        : 

                                        <>
                                    <div className="mb-2">
                                            <label
                                                htmlFor="email" 
                                                className="libelle">
                                                Entrez votre email
                                            </label>
                                            <input onChange={(e) => {setEmail(e.currentTarget.value)}}
                                                name="email"
                                                type="email"
                                                value={email}
                                                className="input block w-full px-4 py-2 mt-2"/>
                                        </div>
                                        <div className="mt-6">
                                            <button className="button w-full px-4 py-2" onClick={(e) =>{e.preventDefault(); handleSubmit()}}>
                                                Envoyez le mail
                                            </button>
                                        </div> </>}
                                        
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}

export default ForgottenPassword;