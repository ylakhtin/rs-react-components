import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { server } from '../../MockService/Server';
import { App } from '../../../App';
import { queryItem } from '../../API/API';
import { IBeerDetails, SEARCH_DEFAULT } from '../../../shared/data/data';
import { beerDetails } from '../../../shared/data/testData';

describe('Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    server.listen();

    localStorage.setItem(SEARCH_DEFAULT, beerDetails.name);
    await render(<App />);
    const regex = new RegExp(`.*${beerDetails.abv}.*`, 'i');

    const name = await screen.findByText(beerDetails.name);
    const tagline = await screen.findByText(beerDetails.tagline);
    const volume = await screen.findByText(regex);

    expect(name.textContent).toEqual(beerDetails.name);
    expect(tagline.textContent).toEqual(beerDetails.tagline);
    expect(volume.textContent).toContain(beerDetails.abv);

    server.close();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    server.listen();

    localStorage.setItem(SEARCH_DEFAULT, '');
    await render(<App />);

    const name = await screen.findByText(beerDetails.name);
    fireEvent.click(name);

    const descriptionElement = await screen.findByText(beerDetails.description);
    expect(descriptionElement).not.toBeNull();

    server.close();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    server.listen();

    const mockedData: IBeerDetails[] = [];
    mockedData.push(beerDetails);

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        json: async () => mockedData,
      }) as Response;

    const result = await queryItem(beerDetails.id);

    expect(result).toEqual(mockedData);

    globalThis.fetch = originalFetch;

    server.close();
  });
});
