'use client';
import { Card } from '@/app/(dashboard)/components/Card';
import { useWeatherData } from '@/app/(dashboard)/api';

import { parseISO, format } from 'date-fns';

export default function Home() {
  const { data, isLoading } = useWeatherData(true);
  if (data?.current?.time)
    console.log(format(parseISO(data?.current?.time), 'dd MMM yyyy HH:mm'));

  return (
    <div
      className={`rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700`}>
      <div className={'mb-4 italic'}>
        Last refresh:{' '}
        {data?.current?.time
          ? format(parseISO(data?.current?.time), 'dd MMM yyyy HH:mm O')
          : '--'}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <div className={'text-[20px]'}>Temperature:</div>
          <div>
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
          <div>
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
          <div>
            <span className={'text-[60px]'}>{data?.current?.rain ?? '--'}</span>
            <span className={'text-[40px]'}>{data?.current_units?.rain}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
