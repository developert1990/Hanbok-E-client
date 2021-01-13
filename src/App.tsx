import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE } from './config';
import Routes from './router/routes';
import { TokenModal } from './components/TokenModal';


const App = () => {

  const [show, setShow] = useState(false);

  useEffect(() => {

    setTimeout(async () => {
      // const {data} = await Axios.get(`${API_BASE}/api/users/`)
      // alert('토큰 만료되었습니다. 리프레시 눌르세여')
      setShow(true)

    }, 1000 * 3);
    return () => {
      clearTimeout();
    }

  }, [])
  return (
    <div className="App">
      <TokenModal show={show} setShow={setShow} />
      <Routes />
    </div>
  );
}

export default App;
