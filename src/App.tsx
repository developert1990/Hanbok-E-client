import React, { useEffect } from 'react';
import Routes from './router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from './store';
import { signout } from './actions/userActions';



const App = () => {

  // const [show, setShow] = useState(false);

  const userSignin = useSelector((state: initialAppStateType) => state.userStore);
  const { userInfo } = userSignin;


  const dispatch = useDispatch();
  // console.log('userInfo: ', userInfo)
  const now = Math.floor(new Date().getTime() / 1000.0)


  // refresh 토큰이 만료되기 직전에 자동 로그아웃을 시킨다.

  useEffect(() => {
    if (userInfo) {
      console.log('userInfo:  리프레시 토큰쪽 ===================================== : ', userInfo)
      console.log("userInfo있어서 안쪽으로 들어옴")
      let a = setTimeout(() => {
        console.log("리프레시도 만료되서 로그아웃하러 들어옴")
        userInfo?.refreshTokenExp && dispatch(signout());
      }, userInfo?.refreshTokenExp as number - now - (1000 * 60 * 0.5));

      return () => {
        clearTimeout(a);
      }
    }
  }, [userInfo?.refreshTokenExp])





  return (
    <div className="App">

      <Routes />
    </div>
  );
}

export default App;
