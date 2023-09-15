// Component import
import './form.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import SignIn from '../SignIn/signIn';
import SignUp from '../SignUp/signUp';

// Tools React import
import { useState } from 'react';

// Login or registration form
function Form() {

    const [signUp, setSignUp] = useState(false);

    const handleClickSignIn = () => {
    setSignUp(false)
    }

    const handleClickSignUp = () => {
    setSignUp(true)
    }

    return (
        <>
            <Header />
                <div className="wrapper">
                    <div className="container-form">
                        <div className="display-form">
                            <a href="#" onClick={handleClickSignIn}>
                                <h1 className={`link-text ${signUp ? "text-gray-200" : "text-gradient"} `}>Connexion</h1>
                            </a>
                            <p className="link-text"> ou</p>
                            <a href="#" onClick={handleClickSignUp}>
                                <h1 className={`link-text ${signUp ? "text-gradient" : "text-gray-200" }`}>Inscription</h1>
                            </a>
                        </div>
                {/* ternary to display the login or registration form */}
                {signUp ? <SignUp /> : <SignIn />}
                    </div>
                </div>
            <Footer />
        </>
    );
}

export default Form;