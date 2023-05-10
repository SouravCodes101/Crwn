import { createContext, useEffect, useState } from "react";

// import { addCollectionsAndDocuments } from "../utils/firebase/firebase.utils";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import SHOP_DATA from "../shop-data.js";

// The actual value that we want to access
export const ProductsContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   addCollectionsAndDocuments("categories", SHOP_DATA);
  // },[])
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap);
    }
    getCategoriesMap();
  }, [])
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}