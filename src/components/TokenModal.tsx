import Axios from 'axios';
import React, { Dispatch } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signout } from '../actions/userActions';
import { API_BASE } from '../config';
import { USER_SIGNIN_SUCCESS } from '../constants/userConstant';
import { userType } from '../reducers/userReducer';



export interface TokenModalType {
    show: boolean;
    setShow: Dispatch<React.SetStateAction<boolean>>;
    refreshTokenExp: number;
    userInfo: userType;
}

export const TokenModal: React.FC<TokenModalType> = ({ setShow, show, refreshTokenExp, userInfo }) => {
    console.log("토큰 모달열림")
    const history = useHistory();
    const dispatch = useDispatch();

    const handleRefresh = async () => {
        setShow(false);
        console.log("모달에서 userInfo", userInfo)
        if (!userInfo) {
            console.log("userInfo 없어서 그냥 리턴됨")
            return history.push('/signin');
        }
        console.log("userInfo 없는데도 실행됨...")
        const { data } = await Axios.get(`${API_BASE}/api/users/refreshSession`, {
            withCredentials: true
        });
        data.refreshTokenExp = refreshTokenExp
        console.log('쿠키 만료 시간 체크 data : ', data)
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    }

    // 토큰을 갱신해서 로그인 유지 하고 싶지 않다면 x를 클릭해서 로그아웃을 한다.
    const handleLogout = () => {
        if (!userInfo) {
            return;
        }
        dispatch(signout())
        setShow(false)
    }
    return (
        <div>
            <Modal show={show} onHide={handleLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Token Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your token is expired</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleRefresh}>
                        Refresh
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
