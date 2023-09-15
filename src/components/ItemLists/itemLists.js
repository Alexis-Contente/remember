// Component import
import './itemLists.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Loading from '../Loading/loading';

// Tools React import
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Display movie lists
function ItemLists({ itemStatus, itemType }) {

  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(true);
  const [selectValue, setSelectValue] = useState(`${itemStatus}`);

  // We create a variable to store the jwt
  const jwt = 'Bearer '+ localStorage.getItem("jwt");

  const config = {
    headers:{
      'Authorization': jwt
    }
  }
  
  // Function that gather informations of all items from the DB
  const getListItems = async () => {
    axios.get(`http://malcom-yeoman-server.eddi.cloud/Remember/public/api/item/list`, config)
    .then((response) => {
    setItemList(response.data);

    })
    .finally(() => {
      setLoading(false);
    })
  };
    const itemListFiltered = itemList.filter(item => item.status === itemStatus && item.type_id === itemType)

    useEffect(() => {
      getListItems();
    },[]);
  
    // Function that handle the delete button of an item
    const handleDelete = async (id) => {
      await axios.delete(`http://malcom-yeoman-server.eddi.cloud/Remember/public/api/item/delete/${id}`);
      setItemList(itemList.filter((item) => item.id !== id));
    };
    

    // Function that handle the form to change the status of an item
    const handleStatusChange = async (id, value, itemStatus) => {
      axios.put(`http://malcom-yeoman-server.eddi.cloud/Remember/public/api/item/update/${id}`,{
        status: value})
        .then((response) => {
          getListItems();
        });  
    };
 
    // Displays a filtered itemList defined by the category and the status of an item
    return (
      <>
        <Header />
          {loading ? (<Loading />) : (
          <div className="wrapper overflow-y-auto">

          <Link to="/lists" className="button p-2 mt-10 ">Retour aux listes</Link>

            <ul className="item-list"> 
              {itemListFiltered.length > 0 ? itemListFiltered.map(item => (
                <section  className="mt-20 text-gray-800">  
                  <div key={item.id} className="item">
                    <div className="h-auto flex flex-row justify-start">
                      <div className="hidden lg:flex  basis-auto md:w-32 xl:w-32 lg:w-32">
                        <img 
                          src={`https://image.tmdb.org/t/p/w500/${item?.poster}`} 
                          alt="Movie poster"
                          className="image" />
                      </div>
                      <div className="fiche">
                        <div className="fiche-element">
                          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                          <div className="flex flex-row justify-around">
                            <form 
                              className="flex flex-col items-start pb-2"
                              action="#"
                              onSubmit={(e) =>
                                {e.preventDefault();
                                handleStatusChange(item.id, selectValue, itemStatus)
                                }
                              }>

                              <select onChange={(e) => setSelectValue(e.currentTarget.value)} className="button text-center">
                              <option className="optionValue" value={itemStatus}>{itemStatus}</option>

                              <option className="optionValue" value={itemStatus === "En Cours" ? "A Regarder" : "En Cours" 
                              || itemStatus === "Terminé" ? "En Cours" : "Terminé"}> 

                              {itemStatus === "En Cours" ? "A Regarder" : "En Cours" 
                              || itemStatus === "Terminé" ? "En Cours" : "Terminé"}</option> 

                              <option className="optionValue dark:bg-gradient-to-r dark:from-blue-500 dark:to-cyan-500" value={itemStatus === "Terminé" ? "A Regarder" : "Terminé" 
                              || itemStatus === "A Regarder" ? "Terminé" : "A Regarder" 
                              || itemStatus === "En Cours" ? "A Regarder" : "En Cours"}> 

                              {itemStatus === "Terminé" ? "A Regarder" : "Terminé" 
                              || itemStatus === "A Regarder" ? "Terminé" : "A Regarder" 
                              || itemStatus === "En Cours" ? "A Regarder" : "En Cours"}</option>
                              </select>

                              <input className="w-full text-center" type="submit" value="Deplacer"/>
                            </form>

                            <button className="button-red max-h-10 px-2 flex items-center" onClick={() => handleDelete(item.id)}>
                              <p>SUPPRIMER</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>)) 

              :

                <div className="empty-list">
                  <p className="message">
                    <span className="text-gradient">Oops! </span>aucun élément n'à été ajouté à votre liste</p>
                  <p className="mb-8 text-center text-gray-500 md:text-lg">Vous devez y ajouter un film afin de de le retrouver ici.</p>
                </div>
              }
            </ul>
          </div>)}
        <Footer />
      </>
    )
  }

export default ItemLists;