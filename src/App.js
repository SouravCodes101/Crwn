import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./Routes/navigation/navigation.component";

import Home from "./Routes/home/home.component";
import SignIn from "./Routes/sign-in/sign-in.component";

const Shop = () => {
  return (
    <>
      <h1>Shop</h1>
    </>
  )
}



const App = () => {
return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
