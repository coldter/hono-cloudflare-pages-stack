import { useEffect, useState } from 'react';
import { LocationProvider } from './contexts/LocationContext';
import './styles/global.css';
import { InferResponseType } from 'hono';
import { appSearchClient } from './service/service.client';

function App() {
  const $get = appSearchClient.api.search.$get;
  const [data, setData] = useState<InferResponseType<typeof $get>>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await $get({
        query: {
          q: 'Rajkot',
        },
      });
      const responseData = await res.json();
      setData(responseData);
    };
    fetchData();
  }, []);

  return (
    <>
      <LocationProvider>
        <h1>{data?.count}</h1>
      </LocationProvider>
    </>
  );
}

export default App;
