import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, useLocation } from "react-router-dom";
import router from "./Route/Route.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/Store.js";
import Preloader from "./Components/Preloader.jsx";


function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const path = window.location.pathname
 
  console.log(path)


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  const isLoadings  = true

  return (
    isLoading && path == "/" ? <Preloader /> : <RouterProvider router={router} />
	// <Preloader />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>
);
