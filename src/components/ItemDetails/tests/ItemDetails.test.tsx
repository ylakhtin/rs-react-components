import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { App } from '../../../App';
import { server } from '../../MockService/Server';
import { beerDetails } from '../../../shared/data/testData';

describe('Card details component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    server.listen();

    await render(<App />);

    const name = await screen.findByText(beerDetails.name);
    fireEvent.click(name);

    const loader = screen.getByText(/Loading/i);
    expect(loader).not.toBeNull();

    server.close();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    server.listen();

    await render(<App />);

    const name = await screen.findByText(beerDetails.name);
    fireEvent.click(name);

    const decriptionField = await screen.findByText(beerDetails.description);
    const brewedField = await screen.findByText(beerDetails.first_brewed);

    expect(decriptionField).not.toBeNull();
    expect(brewedField).not.toBeNull();

    server.close();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    server.listen();

    await render(<App />);

    const name = await screen.findByText(beerDetails.name);
    fireEvent.click(name);

    const descriptionElement = await screen.findByText(/Description/i);
    await waitFor(() => {
      expect(descriptionElement).not.toBeNull();
    });

    const buttonElement = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const descriptionElement = screen.queryByText(/Description/i);
      expect(descriptionElement).toBeNull();
    });

    server.close();
  });
});
