import { render, screen } from '@testing-library/react';
import { AppRoutes } from '../../../App';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../../MockService/Server';

const wrongPath = '/abracadabra';

describe('Not Found', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.close();
  });

  it('Redirects to NotFound for invalid path', async () => {
    render(
      <MemoryRouter initialEntries={[wrongPath]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const notFoundText = await screen.findByText(/The page is not found/i);
    expect(notFoundText).not.toBeNull();
  });
});
