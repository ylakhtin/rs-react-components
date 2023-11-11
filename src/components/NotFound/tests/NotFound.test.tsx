import { render, screen } from '@testing-library/react';
import App from '../../../App';

// const wrongURL = '/abracadabra';

it('Tests redirect to NotFound page for wrong route', async () => {
  render(<App />);

  const errorPage = await screen.findByText(/The page is not found/i);
  expect(errorPage).not.toBeNull();
});
