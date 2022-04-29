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
import LandingPage from './components/Presentation/LandingPage';
import UserLandingPage from './components/Presentation/User/UserLandingPage';
import AuthProvider from './store/AuthProvider';
import ProductEdit from './components/Presentation/User/Seller/ProductEdit';
import AddProduct from './components/Presentation/User/Seller/AddProduct';
import SellerEdit from './components/Presentation/User/Seller/SellerEdit';

function App() {

  return (
    <div>
      <AuthProvider>
        <Routes>
          {/* <Route path = '/' element = {<SubmissionPage />} />
          <Route path = '/list_screen' element = {<ListScreen/>} />
          <Route path = '/list_screen/seller' element = {<SellerListScreen/>} />
          <Route path = '/list_screen/product' element = {<ProductListScreen/>} />
          <Route path = '/list_screen/cart' element = {<CartListScreen/>} />
          <Route path = '/edit_screen' element = {<EditScreen/>} />
          <Route path = '/edit_screen/seller' element = {<SellerEditScreen/>} />
          <Route path = '/edit_screen/product' element = {<ProductEditScreen/>} />
          <Route path = '/edit_screen/cart' element = {<CartEditScreen/>} /> */}
          <Route path = '/' element = {<LandingPage />} />
          <Route path = '/un=+:username/pw=+:password/ut=+:usertype' element = {<UserLandingPage />} />
          {/* route for sellers */}
          <Route path = '/un=+:username/pw=+:password/ut=+:usertype/acc_info/edit/slid=+:seller_id' element = {<SellerEdit />} />
          <Route path = '/un=+:username/pw=+:password/ut=+:usertype/product/edit/prid=+:product_id' element = {<ProductEdit />} />
          <Route path = '/un=+:username/pw=+:password/ut=+:usertype/product/add' element = {<AddProduct />} />
          {/* route for buyers */}
          
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
