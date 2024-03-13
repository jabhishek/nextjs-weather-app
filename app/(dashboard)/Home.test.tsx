import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import * as ApiModule from './api';
import { IWeatherResponse } from './api';
import { expect } from '@jest/globals';

// Mocking useWeatherData hook
jest.mock('./api', () => ({
  useWeatherData: jest.fn(() => ({ data: null, isLoading: false })),
}));

const mockData = {
  current: {
    rain: 10,
    relative_humidity_2m: 80,
    temperature_2m: 11,
    time: '2020-10-10T10:00',
    precipitation: 0,
  },
  current_units: {
    temperature_2m: '°C',
    rain: 'mm',
    precipitation: 'mm',
    time: 'iso8601',
    relative_humidity_2m: '%',
    interval: 'seconds',
  },
} as IWeatherResponse;

const mockRandomisedData: IWeatherResponse = {
  ...mockData,
  current: {
    ...mockData.current,
    temperature_2m: 11.3,
    relative_humidity_2m: 85,
    rain: 11,
  },
};

describe('Home component', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Last update at:/)).toBeInTheDocument();
  });

  test('should display an error message when fetching weather data', () => {
    (ApiModule.useWeatherData as jest.Mock).mockImplementation(() => {
      return {
        data: null,
        isLoading: false,
        error: 'Error',
      };
    });

    render(<Home />);
    expect(screen.queryByText(/Last update at:/i)).toBeNull();
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });

  test('status of useMock changes on checkbox click', async () => {
    (ApiModule.useWeatherData as jest.Mock).mockImplementation(
      (useMock: boolean) => {
        if (useMock) {
          return {
            data: mockRandomisedData,
            isLoading: false,
          };
        } else {
          return {
            data: mockData,
            isLoading: false,
          };
        }
      }
    );

    render(<Home />);
    expect(await screen.findByText(/Last update at:/)).toBeInTheDocument();
    expect(screen.getByTestId('temperature-data').textContent).toBe('11°C');
    expect(screen.getByTestId('humidity-data').textContent).toBe('80%');
    expect(screen.getByTestId('rain-data').textContent).toBe('10mm');

    // return randomised data when toggle is clicked
    const inputEl = screen.getByRole('checkbox');
    fireEvent.click(inputEl);
    expect(ApiModule.useWeatherData).toBeCalledWith(true);
    expect(screen.getByTestId('temperature-data').textContent).toBe('11.3°C');
    expect(screen.getByTestId('humidity-data').textContent).toBe('85%');
    expect(screen.getByTestId('rain-data').textContent).toBe('11mm');
  });
});
