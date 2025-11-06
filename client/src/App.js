import 'primereact/resources/themes/lara-light-indigo/theme.css'; // אפשר להחליף תמה
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Layout from "./components/Layout";
import AddProduct from "./features/products/addProduct";
import GetAllProducts from "./features/products/getAllProducts";
import DeleteProduct from "./features/products/deleteProduct";
import './flags.css';
import "./App.css"
import "./features/auth/Register.css"
import GetTheProduct from "./features/products/getTheProduct";
import GetBasket from "./features/basket/getBasket";
import HomePage from './features/homePage';
import GetCategory from './features/products/getCategory';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<GetAllProducts />} />
          <Route path='/products/:category' element={<GetCategory />} />
          <Route path='/deleteProduct' element={<DeleteProduct />} />
          <Route path='/getTheProduct/:id' element={<GetTheProduct />} />
          <Route path='/basket' element={<GetBasket />} />
        </Route>
      </Routes>

    </div >
  );
}

export default App;
