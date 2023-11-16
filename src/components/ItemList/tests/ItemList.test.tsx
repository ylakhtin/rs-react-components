import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { server } from '../../../utils/MockService/Server';
import { App } from '../../../App';
import {
  DEFAULT_ITEMS_PER_PAGE,
  ITEMS_PER_PAGE,
} from '../../../shared/data/data';

/* IMPORTANT!!! 'Check that an appropriate message is displayed if no cards are present' is checked in "rs-react-components\src\components\Matches\tests\Matches.test.tsx"
/ I just put a number of matches into a dedicated component called 'Matches'
*/

describe('Card List details component', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.close();
  });

  it('Verify that the component renders the specified number of cards. Test 1.', async () => {
    render(<App />);

    // Now we check the amount of cards after a switch from 4 to 10 per page
    const perPageDropdown = await screen.findByText(/4 per page/i);
    fireEvent.focus(perPageDropdown);
    fireEvent.keyDown(perPageDropdown, { key: 'ArrowDown' });

    const optionToClick = await waitFor(() =>
      screen.getByText(`${ITEMS_PER_PAGE} per page`)
    );
    fireEvent.click(optionToClick);

    waitFor(async () => {
      const itemList = await screen.findAllByText(/Volume:/i);
      expect(itemList.length).toEqual(ITEMS_PER_PAGE);
    });

    // Now we check the amount of cards after a switch from 10 to 4 per page
    fireEvent.focus(perPageDropdown);
    fireEvent.keyDown(perPageDropdown, { key: 'ArrowDown' });

    fireEvent.click(optionToClick);

    waitFor(async () => {
      const itemList = await screen.findAllByText(/Volume:/i);
      expect(itemList.length).toEqual(DEFAULT_ITEMS_PER_PAGE);
    });
  });
});
