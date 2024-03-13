import { useEffect, useRef, useState } from 'react';

const FETCH_INTERVAL = 3000;

export type IWeatherResponse = {
  current: {
    precipitation: number;
    rain: number;
    relative_humidity_2m: number;
    temperature_2m: number;
    time: string;
  };
  current_units: {
    interval: string;
    precipitation: string;
    rain: string;
    relative_humidity_2m: string;
    temperature_2m: string;
    time: string;
  };
  daily: {
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
  };
};

// forcibly randomise the data as the API provides weather data updates every 15 minutes
const randomise = (num: number) => {
  const factor = Math.random() * 0.04 + 0.98;
  return parseFloat((factor * num).toFixed(1));
};

// fetch the data from the API
async function fetchData(useMock: boolean): Promise<IWeatherResponse> {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=52.5072&longitude=13.41&current=temperature_2m,relative_humidity_2m,precipitation,rain&daily=temperature_2m_max,temperature_2m_min',
    {
      cache: 'no-cache',
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const weatherData: IWeatherResponse = await res.json();

  if (useMock) {
    return {
      ...weatherData,
      current: {
        ...weatherData?.current,
        temperature_2m: randomise(weatherData?.current?.temperature_2m),
        rain: randomise(weatherData?.current?.rain),
        relative_humidity_2m: randomise(
          weatherData?.current?.relative_humidity_2m
        ),
      },
    };
  }

  return weatherData;
}

export const useWeatherData = (useMock: boolean = false) => {
  const [data, setData] = useState<IWeatherResponse | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      fetchData(useMock)
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          setError(err.message);
          throw new Error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // fetch the data on initial load and then fetch on interval
    getData();
    timerRef.current = window.setInterval(getData, FETCH_INTERVAL); // fetching data every 30s (30,000 milliseconds)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [useMock]);

  return { data, isLoading, error };
};
