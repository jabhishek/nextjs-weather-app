'use client';
import { Card } from '@/app/(dashboard)/components/Card';
import { useWeatherData } from '@/app/(dashboard)/api';

import { parseISO, format } from 'date-fns';
import { useState } from 'react';

export default function Home() {
  const [useMock, setUseMock] = useState(false);
  const { data, error } = useWeatherData(useMock);

  if (error) {
    return (
      <div
        className={`rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700`}>
        {error}
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700`}>
      <div className={'mb-4 flex items-center justify-between '}>
        <div className={'italic'}>
          Last update at:{' '}
          {data?.current?.time
            ? format(parseISO(data?.current?.time), 'dd MMM yyyy HH:mm O')
            : '--'}
        </div>
        <label className="inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value=""
            className="peer sr-only"
            onChange={(x) => setUseMock(Boolean(x?.target?.checked))}
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Randomise
          </span>
        </label>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <div className={'text-[20px]'}>Temperature:</div>
          <div data-testid={'temperature-data'}>
            <span className={'text-[60px]'}>
              {data?.current?.temperature_2m ?? '--'}
            </span>
            <span className={'text-[40px]'}>
              {data?.current_units?.temperature_2m}
            </span>
          </div>
        </Card>
        <Card>
          <div className={'text-[20px]'}>Relative humidity:</div>
          <div data-testid={'humidity-data'}>
            <span className={'text-[60px]'}>
              {data?.current?.relative_humidity_2m ?? '--'}
            </span>
            <span className={'text-[40px]'}>
              {data?.current_units?.relative_humidity_2m}
            </span>
          </div>
        </Card>
        <Card>
          <div className={'text-[20px]'}>Current rain:</div>
          <div data-testid={'rain-data'}>
            <span className={'text-[60px]'}>{data?.current?.rain ?? '--'}</span>
            <span className={'text-[40px]'}>{data?.current_units?.rain}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
