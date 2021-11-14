import { useEffect, useRef, useState } from 'react';

type METHOD = 'GET' | 'POST';
interface UseFetchProps {
    url: string;
    method: METHOD;
}

export const useFetch = ({ url, method }: UseFetchProps) => {
    const [data, setData] = useState<null | any>(null);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            } catch (error: any) {
                setError(error);
            }
        }
        getData();
    });

    return { data, error }
}


export const useInterval = (callback: Function, delay: number) => {
    const savedCallback = useRef<any>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};