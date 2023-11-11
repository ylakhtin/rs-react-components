import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../../App';
import { queryItem } from '../../API/API';
import { IBeerDetails, SEARCH_DEFAULT } from '../../../shared/data/data';
import { beerDetails } from './testData';

localStorage.setItem(SEARCH_DEFAULT, '');

describe('Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    localStorage.setItem(SEARCH_DEFAULT, '');
    await render(<App />);
    const regex = new RegExp(`.*${beerDetails.abv}.*`, 'i');

    const name = await screen.findByText(beerDetails.name);
    const tagline = await screen.findByText(beerDetails.tagline);
    const volume = await screen.findByText(regex);

    expect(name.textContent).toEqual(beerDetails.name);
    expect(tagline.textContent).toEqual(beerDetails.tagline);
    expect(volume.textContent).toContain(beerDetails.abv);
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    localStorage.setItem(SEARCH_DEFAULT, '');
    await render(<App />);

    const name = await screen.findByText(beerDetails.name);
    fireEvent.click(name);

    const descriptionElement = await screen.findByText(beerDetails.description);
    expect(descriptionElement).not.toBeNull();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
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
  });
});
