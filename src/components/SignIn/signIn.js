// Component import
import './signIn.css';

// Tools React import
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { actionSaveLoggedUser } from '../../actions/user';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Login form
function SignIn() {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/login_check', {
            username: email,
            password: password,
        })
        .then((response) => {
            console.log(response.data);
            dispatch(actionSaveLoggedUser(response.data.token, response.data.role));
            nav("/");
            toast.success("Vous êtes connecté");
        })
        .catch((error) => {
            toast.error("Erreur lors de la connexion");
        });
    }
        
    const handleChangeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.currentTarget.value)
    }

    return (
        <>
            <div className="w-full">
                <form className="mt-6 w-full" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email" 
                            className="libelle"
                        >
                            Email
                        </label>
                        <input 
                            onChange={handleChangeEmail}
                            name="email"
                            type="email"
                            value={email}
                            className="input input-signin"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="libelle"
                        >
                            Password
                        </label>
                        <input 
                            onChange={handleChangePassword}
                            name="password"
                            type="password"
                            value={password}
                            className="input input-signin"
                        />
                    </div>
                    <div className="mt-6">
                        <button className="button w-full px-4 py-2">
                            Connexion
                        </button>
                    </div>
                    <div>
                        <Link to="/forgottenpassword">
                            <p className="mdp">Mot de passe oublié</p>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignIn;