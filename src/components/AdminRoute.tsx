import React, { ComponentType, useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { initialAppStateType } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAdmin } from '../actions/userActions';

// admin 유저가 아닌경우 url로 접속하는걸 방지하는 컴포넌트


interface adminRoutePropsType extends RouteProps {
    component: ComponentType<any>
}

export const AdminRoute: React.FC<adminRoutePropsType> = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();

    const checkIsAdminStore = useSelector((state: initialAppStateType) => state.checkIsAdminStore);

    const { isAdmin } = checkIsAdminStore

    const userSignin = useSelector((state: initialAppStateType) => state.userStore);
    const { userInfo } = userSignin;


    useEffect(() => {
        if (userInfo) {
            console.log("어드민 다시 돌림")
            dispatch(checkIsAdmin())
        }
    }, [dispatch, userInfo])

    return (
        <Route
            {...rest}
            render={(props) => isAdmin ? (
                <Component {...props}></Component>
            ) : (
                    <Redirect to="signin" />
                )}
        >

        </Route>
    )
}
