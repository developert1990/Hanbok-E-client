import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE } from './config';
import Routes from './router/routes';
import { TokenModal } from './components/TokenModal';


const App = () => {

  const [show, setShow] = useState(false);


  useEffect(() => {
    (
      async () => {
        const { data } = await Axios.get(`${API_BASE}/api/users/checkCookieExpiration`, {
          withCredentials: true
        });
        console.log('쿠키 만료 시간 체크 data : ', data)
      }
    )();
    // setTimeout(async () => {
    //   const { data } = await Axios.get(`${API_BASE}/api/users/checkCookieExpiration`, {
    //     withCredentials: true
    //   });
    //   console.log('쿠키 만료 시간 체크 data : ', data)

    //   // setShow(true)

    // }, 1000 * 15);
    // return () => {
    //   clearTimeout();
    // }

  }, [])
  return (
    <div className="App">
      <TokenModal show={show} setShow={setShow} />
      <Routes />
    </div>
  );
}

export default App;
