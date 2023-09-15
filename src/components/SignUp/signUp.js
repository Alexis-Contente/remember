// Component import
import './signUp.css';
import 'react-toastify/dist/ReactToastify.css';

// Tools React import
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


// Register form
function SignUp () {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        if (username === '' || password === '' || email === ''){
            toast.error("Champs incomplets!");
            }else{
                e.preventDefault();
        axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/register', {
            pseudo: username,
            email: email,
            password: password
        })
        .then((response) => {
            window.location.reload();
            toast.success("Bienvenue chez Remember !");
        })
        .catch((error) => {
            toast.error("Erreur lors de l'enregistrement !");
        });
    }}
        
    const handleChangeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }

    const handleChangeUsername = (e) => {
        setUsername(e.currentTarget.value)
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
                            htmlFor="username" 
                            className="libelle"
                            >
                            Username
                        </label>
                        <input 
                            onChange={handleChangeUsername}
                            name="username"
                            type="username"
                            value={username}
                            className="input input-signup"
                        />
                    </div>
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
                            className="input input-signup"
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
                            className="input input-signup"
                        />
                    </div>
                    <div className="mt-6">
                        <button className="button w-full px-4 py-2">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;