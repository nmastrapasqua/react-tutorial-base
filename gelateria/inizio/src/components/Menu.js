import React, { useState } from "react";
import Gelato from "./Gelato";
import axios from "axios";
import data from "../fakeData";

const url = "https://react-corso-api.netlify.app/.netlify/functions/gelateria";

const Menu = () => {
  // Loading state for data fetching
  const [isLoading, setIsLoading] = useState(true);

  // Error handling state
  const [isError, setIsError] = useState(false);

  // Tutti i prodotti
  const [prodotti, setProdotti] = useState();

  // Active BTN Selector
  const [selected, setSelected] = useState(0);

  // Products filtered from the prodotti state
  const [filterProducts, setFilterProducts] = useState(prodotti);

  // Categorie di prodotti
  const [categorie, setCategorie] = useState([]);

  const filtraProdotti = (categoria, index) => {
    setSelected(index);
    if (categoria === "all") {
      setFilterProducts(prodotti);
    } else {
      setFilterProducts(
        prodotti.filter((el) => (el.categoria === categoria ? el : ""))
      );
    }
  };

  React.useEffect(() => {
    // Funzione eseguita immediatamente
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(url);
        setProdotti(response.data.data.default);
        setFilterProducts(response.data.data.default);

        // Categorie
        const nuoveCategorie = Array.from(
          new Set(response.data.data.default.map((el) => el.categoria))
        );
        nuoveCategorie.unshift("all");
        setCategorie(nuoveCategorie);

        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  return (
    <div className="container">
      <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Le Nostre Scelte
      </h4>
      {!isLoading && !isError ? (
        <>
          <div className="lista-categorie">
            {categorie.map((categoria, index) => {
              return (
                <button
                  onClick={() => filtraProdotti(categoria, index)}
                  key={index}
                  className={`btn btn-selector ${
                    selected === index && "active"
                  }`}
                >
                  {categoria}
                </button>
              );
            })}
          </div>
          <div className="vetrina">
            {filterProducts.map((el) => (
              <Gelato key={el.id} {...el} />
            ))}
          </div>
        </>
      ) : !isLoading && isError ? (
        <h4
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Error...
        </h4>
      ) : (
        <h4
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Loading...
        </h4>
      )}
    </div>
  );
};

export default Menu;
