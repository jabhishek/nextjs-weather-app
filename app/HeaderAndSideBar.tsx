'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CloudIcon, Bars3Icon, BellAlertIcon } from '@heroicons/react/16/solid';

export const HeaderAndSideBar = () => {
  const [isOpen, setOpen] = useState<boolean>();
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => {
                  setOpen(!isOpen);
                }}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" />
              </button>
              <Link
                href={'/'}
                className="ms-2 flex md:me-24">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                  WeatherApp
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed left-0 top-0 z-40 h-screen w-64 ${isOpen ? 'transform-none' : '-translate-x-full'} border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0`}
        aria-label="Sidebar">
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <CloudIcon className="w-6 fill-gray-500 font-bold" />
                <span className="ms-2">Dashboard</span>
              </Link>
            </li>{' '}
            <li>
              <Link
                href="/alerts"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <BellAlertIcon className="w-6 fill-gray-500 font-bold" />
                <span className="ms-2">Alerts</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
