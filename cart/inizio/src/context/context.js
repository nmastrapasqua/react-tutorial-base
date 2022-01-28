import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import {
  DATA_FETCHING_STARTED,
  DATA_FETCHING_SUCCESS,
  DATA_FETCHING_FAIL,
  SVUOTA_CARRELLO,
  DELETE_ITEM,
  AUMENTA_QTY,
  DIMINUISCI_QTY,
  COSTO_TOTALE,
  CONTATORE,
} from "./actions";
import axios from "axios";
const url = "https://react-corso-api.netlify.app/.netlify/functions/cartshop";

const initialState = {
  products: [],
  isLoading: true,
  isError: false,
  total: 0,
  itemCounter: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // Utilizzo useReducer con state iniziale
  const [state, dispatch] = useReducer(reducer, initialState);

  // Cancella un songolo elemento
  const deleteItem = (_id) => {
    dispatch({ type: DELETE_ITEM, payload: _id });
  };

  // Svuota il carrello
  const deleteAll = () => {
    dispatch({ type: SVUOTA_CARRELLO });
  };

  const addQty = (_id) => {
    dispatch({ type: AUMENTA_QTY, payload: _id });
  };

  const dimQty = (_id) => {
    dispatch({ type: DIMINUISCI_QTY, payload: _id });
  };

  // Data Fetching
  useEffect(() => {
    // IIFE: funzione  evocata ed eseguita appena dichiarata
    (async () => {
      dispatch({ type: DATA_FETCHING_STARTED });
      try {
        const response = await axios.get(url);
        dispatch({
          type: DATA_FETCHING_SUCCESS,
          payload: response.data.default,
        });
      } catch (error) {
        dispatch({
          type: DATA_FETCHING_FAIL,
        });
      }
    })();
  }, []);

  // Aggiorna costo totale e numero
  // elementi nel carrello
  useEffect(() => {
    dispatch({ type: COSTO_TOTALE });
    dispatch({ type: CONTATORE });
  }, [state.products]);

  return (
    <AppContext.Provider
      value={{ ...state, deleteItem, deleteAll, addQty, dimQty }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGloabContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGloabContext };
