import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { server } from '../../../utils/MockService/Server';
import { App } from '../../../App';
import { SEARCH_DEFAULT } from '../../../shared/data/data';
import { beerDetails } from '../../../shared/data/testData';

describe('Card component', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.close();
  });

  it('Smoke check', async () => {
    localStorage.setItem(SEARCH_DEFAULT, '');
    const app = await render(<App />);
    expect(app).not.toBeNull();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    localStorage.setItem(SEARCH_DEFAULT, beerDetails.name);
    await render(<App />);

    const name = await screen.findByText(beerDetails.name);
    fireEvent.click(name);

    const descriptionElement = await screen.findByText(beerDetails.description);
    expect(descriptionElement).not.toBeNull();
  });

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

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    // const mockedData: IBeerDetails[] = [];
    // mockedData.push(beerDetails);
    // const originalFetch = globalThis.fetch;
    // globalThis.fetch = async () =>
    //   ({
    //     json: async () => mockedData,
    //   }) as Response;
    // const result = await queryItem(beerDetails.id);
    // expect(result).toEqual(mockedData);
    // globalThis.fetch = originalFetch;
  });
});
