import { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-56 flex-row items-center justify-start rounded bg-gray-100 pl-10 dark:bg-gray-800">
      <div>{children}</div>
    </div>
  );
};
