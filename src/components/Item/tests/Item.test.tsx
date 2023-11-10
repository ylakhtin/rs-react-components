import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Item from '../Item';
import {
  beerDetails,
  PAGE_DEFAULT,
  SECTION_OPEN_DEFAULT,
  DEFAULT_ID,
} from './testData';
import { SEARCH_DEFAULT } from '../../../shared/data/data';

const MockItemComponent = () => {
  return (
    <BrowserRouter>
      <Item
        setRightSectionState={() => {}}
        beer={beerDetails}
        pageNumber={PAGE_DEFAULT}
        sectionOpen={SECTION_OPEN_DEFAULT}
        id={DEFAULT_ID}
      />
    </BrowserRouter>
  );
};

localStorage.setItem(SEARCH_DEFAULT, '');

describe('Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    await render(<MockItemComponent />);
    const regex = new RegExp(`.*${beerDetails.abv}.*`, 'i');

    const name = screen.getByText(beerDetails.name);
    const tagline = screen.getByText(beerDetails.tagline);
    const volume = screen.getByText(regex);

    expect(name.textContent).toEqual(beerDetails.name);
    expect(tagline.textContent).toEqual(beerDetails.tagline);
    expect(volume.textContent).toContain(beerDetails.abv);
  });

  // it('Validate that clicking on a card opens a detailed card component', async () => {

  // });

  // it('Check that clicking triggers an additional API call to fetch detailed information', async () => {

  // });
});
