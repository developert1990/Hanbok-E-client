import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { CartScreen } from '../screens/CartScreen';
import { SigninScreen } from '../screens/SigninScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { AboutScreen } from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ShippingAddressScreen } from '../screens/ShippingAddressScreen';
import { PaymentMethodScreen } from '../screens/PaymentMethodScreen';
import { PlaceOrderScreen } from '../screens/PlaceOrderScreen';
import { OrderScreen } from '../screens/OrderScreen';
import { OrderHistoryScreen } from '../screens/OrderHistoryScreen';
import { PrivateRoute } from '../components/PrivateRoute';
import { ProfileUpdateScreen } from '../screens/ProfileUpdateScreen';
import { AdminRoute } from '../components/AdminRoute'
import { AdminProductListScreen } from '../screens/AdminProductListScreen';
import { ProductEditScreen } from '../screens/ProductEditScreen';
import { ProductCreateScreen } from '../screens/ProductCreateScreen';
import { AdminOrderListScreen } from '../screens/AdminOrderListScreen';
import { AdminUserListScreen } from '../screens/AdminUserListScreen';
import { AdminUserEdit } from '../screens/AdminUserEdit';
import { SearchScreen } from '../screens/SearchScreen';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsCategories } from '../actions/productActions';
import { MapScreen } from '../screens/MapScreen';
import { AdminGoogleMapOrderList } from '../screens/AdminGoogleMapOrderList';
import { SendEmailButton } from '../components/SendEmailButton';
import { SendEmailForm } from '../components/SendEmailForm';
import { DashboardScreen } from '../screens/DashboardScreen';
import { initialAppStateType } from '../store';
import { TokenModal } from '../components/TokenModal';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductsCategories());
    }, [dispatch]);

    const [clickEmailBtn, setClickEmailBtn] = useState<boolean>(false);

    const [show, setShow] = useState(false);

    const userSignin = useSelector((state: initialAppStateType) => state.userStore);
    const { userInfo } = userSignin;


    console.log('userInfo: ', userInfo)


    useEffect(() => {
        if (userInfo && userInfo.email) {
            const now = Math.floor(new Date().getTime() / 1000.0)
            console.log("userInfo 로컬에서 가저올수 있음")
            console.log('userInfo.tokenExp - now', userInfo.tokenExp as number - now)
            console.log('초 계산 : ', userInfo.tokenExp as number - now - (1000 * 60 * 0.5))
            setTimeout(() => {
                userInfo && setShow(true)
            }, userInfo.tokenExp as number - now - (1000 * 60 * 0.5)); //  서버측에 짧은 만료시간 - 10분. 즉 10분전에 refresh 모달이 뜬다.

        }
        return () => {
            clearTimeout();
            console.log("짧은 토큰 타임아웃끝남")
        }
    }, [userInfo?.tokenExp])


    return (
        <BrowserRouter>
            <TokenModal show={show} setShow={setShow} refreshTokenExp={userInfo?.refreshTokenExp as number} userInfo={userInfo} />
            <NavBar />
            <div className="components-wrap">
                <Route exact path="/" component={HomeScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/about" component={AboutScreen} />
                <Route exact path="/product/:id" component={ProductDetailScreen} />
                <Route exact path="/product/:id/edit" component={ProductEditScreen} />
                <Route path="/products" component={ProductsScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/shipping" component={ShippingAddressScreen} />
                <Route path="/payment" component={PaymentMethodScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <PrivateRoute path="/order/:id" component={OrderScreen} />
                <PrivateRoute path="/googleMap" component={MapScreen} />
                <Route path="/history" component={OrderHistoryScreen} />
                <PrivateRoute path="/profile" component={ProfileUpdateScreen} />
                <AdminRoute path="/productList" component={AdminProductListScreen} />
                <AdminRoute path="/productCreate" component={ProductCreateScreen} />
                <AdminRoute path="/orderList" component={AdminOrderListScreen} />
                <AdminRoute path="/userList" component={AdminUserListScreen} />
                <AdminRoute path="/user/:id/edit" component={AdminUserEdit} />
                <AdminRoute path="/dashboard" component={DashboardScreen} />
                <AdminRoute path="/adminGoogleMapOrderList" component={AdminGoogleMapOrderList} />
                <Route path="/search" component={SearchScreen} />
            </div>
            <div className={`send__email ${clickEmailBtn ? 'button__active' : 'button__inactive'}`}>
                <SendEmailButton setClickEmailBtn={setClickEmailBtn} />
            </div>
            <div className={`send__button ${clickEmailBtn ? 'form__active' : 'form__inactive'}`}>
                <SendEmailForm setClickEmailBtn={setClickEmailBtn} clickEmailBtn={clickEmailBtn} />
            </div>
            <Footer />
        </BrowserRouter>
    )
}