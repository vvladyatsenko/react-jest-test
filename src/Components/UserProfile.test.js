import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

it('loads and displays the user profile', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    })
  );

  render(<UserProfile />);

  expect(screen.getByText(/loading.../i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
  });
});

it('displays an error when fetch fails', async () => {
  fetchMock.mockReject(new Error('Failed to fetch'));

  render(<UserProfile />);

  await waitFor(() => {
    expect(screen.getByText(/error:/i)).toBeInTheDocument();
  });
});
