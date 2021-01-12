import { addToCart } from './cartActions';
import { cartItemType } from './../reducers/cartReducers';
import { userType } from './../reducers/userReducer';
import { CART_EMPTY } from './../constants/cartConstant';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_FAIL, USER_LIST_REQUEST, USER_LIST_FAIL, USER_LIST_SUCCESS, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_REGISTER_RESET, CHECK_ISADMIN_REQUEST, CHECK_ISADMIN_SUCCESS, CHECK_ISADMIN_FAIL } from './../constants/userConstant';

import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstant';
import { API_BASE } from '../config/index';

export const signin = (email: string, password: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post(`${API_BASE}/api/users/signin`, { email, password }, {
            // 이부분에서 서버측과 클라이언트 측의 도메인주소가 다를 경우에 jwt token을 res.cooke로 해도 저장이 되지 않는다. 이를 해결하기 위해선 아래처럼 withCredentials: true 를 해줘야한다.
            // 그 다음 서버 측에서 cors 에 옵션을 줘서 credential 을 true로( Access-Control-Allow-Origin을 true로) origin을 true로 줘서 프론트 도메인 주소가 자동으로 Access-Control-Allow-Origin에 들어가게 해야한다.
            // 참고 (https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275)
            withCredentials: true
        });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('cartItems', JSON.stringify(data.cart));

        // 이부분은 유저가 로그인 하자마자 카트에 유저가 add 했던 cart목록을 넣는다.
        const typedUserInfo = data as userType;
        if (typedUserInfo) {
            const cartListInUserInfo = typedUserInfo.cart
            const typedItems = cartListInUserInfo as cartItemType[];
            if (typedItems) {
                typedItems.map((item) => dispatch(addToCart(item.product, item.qty)))
            }
        }
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


export const signout = () => async (dispatch: ThunkDispatch<any, any, any>) => {

    const cartFromLocalStorage = localStorage.getItem('cartItems');
    const cartItem = JSON.parse(cartFromLocalStorage as string)
    await axios.put(`${API_BASE}/api/users/signout`, cartItem, {
        withCredentials: true
    })
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
    dispatch({ type: USER_REGISTER_RESET });
    dispatch({ type: CART_EMPTY })
};


export const register = (name: string, email: string, password: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post(`${API_BASE}/api/users/register`, { name, email, password }, {
            withCredentials: true
        }); // {name, email, password} 이부분은 fetch에서 body를 주는 부분이다.
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

interface InfoForUpdateUserProfileType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


// 자기 개인 계정 update
export const updateUser = (updateInfo: InfoForUpdateUserProfileType) => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
    const { userStore: { userInfo } } = getState();
    try {
        const { data } = await axios.put(`${API_BASE}/api/users/update`, updateInfo, {
            withCredentials: true
        });
        dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_PROFILE_UPDATE_FAIL, payload: message });
    }
};


// Admin 계정으로 모든 유저 list 가져온다.
export const listUsers = () => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    dispatch({ type: USER_LIST_REQUEST });
    const { userStore: { userInfo } } = getState();
    try {
        const { data } = await axios.get(`${API_BASE}/api/users/admin/allList`, {
            withCredentials: true
        })
        // console.log('리스트 뽑는 action data', data)
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_LIST_FAIL, payload: message });
    }

};

// Admin 계정으로 클릭한 유저 삭제
export const deleteUser = (userId: string) => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    dispatch({ type: USER_DELETE_REQUEST });
    const { userStore: { userInfo } } = getState();
    // console.log('유저 삭제하는 action들어옴')
    try {
        const { data } = await axios.delete(`${API_BASE}/api/users/admin/${userId}`, {
            withCredentials: true
        });

        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {

        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        // console.log('message delete:   ', message)
        dispatch({ type: USER_DELETE_FAIL, payload: message });
    }
}


// user detail Action
export const userDetails = (userId: string) => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { userStore: { userInfo } } = getState();
    try {
        const { data } = await axios.get(`${API_BASE}/api/users/admin/detail/${userId}`, {
            withCredentials: true
        });
        // console.log(' 유저 디테일 받는 data', data);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
}


interface userUpdateByAdminType {
    _id: string;
    name: string;
    email: string;
    isSeller: boolean;
    isAdmin: boolean;
}

// admin 계정에서 다른 유저의 정보 변경
export const userUpdate = (updateInfo: userUpdateByAdminType) => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { userStore: { userInfo } } = getState();
    try {
        const { data } = await axios.put(`${API_BASE}/api/users/${updateInfo._id}/${userInfo.isAdmin}/update`, updateInfo, {
            headers: { Authorization: `Hong ${userInfo.token}` }
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_UPDATE_FAIL, payload: message });
    }
};

// 로그인한 유저가 admin 계정인지 확인하는 API
export const checkIsAdmin = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: CHECK_ISADMIN_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE}/api/users/checkAdmin/`, {
            withCredentials: true
        });
        dispatch({ type: CHECK_ISADMIN_SUCCESS, payload: data.isAdmin })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: CHECK_ISADMIN_FAIL, payload: message });
    }
}