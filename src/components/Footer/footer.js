// Component import
import './footer.css';
import logo from '../../assets/images/LOGO_C.png'
import tmdbLogo from '../../assets/images/tmdblogo.svg'
// Footer function present in all of our pages
function Footer() {
    return (
        <>
            <footer className="footer ">
                <div className="responsive">
                    <a href="/" className="logo">
                        <img src={logo} className="h-8 mr-3" alt="Remember Logo" />
                            <span className="brand-name">Remember</span>
                    </a>
                    <ul className="list-wrapper">
                        <li>
                            <a href="/*" className="list-el">A propos</a>
                        </li>
                        <li>
                            <a href="/*" className="list-el">Mentions Légales</a>
                        </li>
                        <li>
                            <a href="/*" className="list-el">Réseaux</a>
                        </li>
                        <li>
                            <a href="/*" className="list-el">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="line"/>
                
                <span className="copyright-container">© 2023 
                    <a href="/" className="hover:underline"> Remember™</a>. All Rights Reserved.
                    <br/><img src={tmdbLogo} className="h-2 m-auto mt-2 text-center"  alt="tmdblogo"/>This product uses the TMDB API but is not endorsed or certified by TMDB.
                    
                </span>
            </footer>
        </>
    );
}

export default Footer;