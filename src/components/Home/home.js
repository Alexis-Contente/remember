// Component import
import './home.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import NotLogged from '../NotLogged/notLogged';
import Logged from '../Logged/logged';

// Tools React import
import { useSelector } from 'react-redux';

// Home function which displays a component according to the connection state
function Home() {

    const logged = useSelector((state) => state.user.logged);

    return (
        <>
            <Header />
              {logged ? <Logged /> : <NotLogged /> }
            <Footer />
        </>
    );
}

export default Home;