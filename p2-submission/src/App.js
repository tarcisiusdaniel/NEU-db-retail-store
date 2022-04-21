import './App.css';
import { Route, Routes } from 'react-router-dom';
import SubmissionPage from './components/Submission/SubmissionPage';
import ListScreen from './components/Submission/Screen/ListScreen';
import EditScreen from './components/Submission/Screen/EditScreen';
import SellerListScreen from './components/Submission/Screen/List/SellerListScreen';
import ProductListScreen from './components/Submission/Screen/List/ProductListScreen';
import CartListScreen from './components/Submission/Screen/List/CartListScreen';
import SellerEditScreen from './components/Submission/Screen/Edit/SellerEditScreen';
import ProductEditScreen from './components/Submission/Screen/Edit/ProductEditScreen';
import CartEditScreen from './components/Submission/Screen/Edit/CartEditScreen';

function App() {

  return (
    <div>
      <Routes>
        <Route path = '/' element = {<SubmissionPage />} />
        <Route path = '/list_screen' element = {<ListScreen/>} />
        <Route path = '/list_screen/seller' element = {<SellerListScreen/>} />
        <Route path = '/list_screen/product' element = {<ProductListScreen/>} />
        <Route path = '/list_screen/cart' element = {<CartListScreen/>} />
        <Route path = '/edit_screen' element = {<EditScreen/>} />
        <Route path = '/edit_screen/seller' element = {<SellerEditScreen/>} />
        <Route path = '/edit_screen/product' element = {<ProductEditScreen/>} />
        <Route path = '/edit_screen/cart' element = {<CartEditScreen/>} />
      </Routes>
    </div>
  );
}

export default App;
