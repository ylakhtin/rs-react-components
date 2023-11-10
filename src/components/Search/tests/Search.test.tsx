import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../Search';
import {
  SEARCH_DEFAULT,
  SEARCH_PLACEHOLDER_TEXT,
} from '../../../shared/data/data';
import { BrowserRouter } from 'react-router-dom';

const TEST_STRING = 'abracadabra';

const MockSearchComponent = () => {
  return (
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );
};

describe('Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    await render(<MockSearchComponent />);

    localStorage.setItem(SEARCH_DEFAULT, '');

    const inputElement = await screen.findByPlaceholderText(
      SEARCH_PLACEHOLDER_TEXT
    );

    fireEvent.change(inputElement, { target: { value: TEST_STRING } });
    const buttonElement = await screen.findByRole('button', {
      name: /Search/i,
    });
    fireEvent.click(buttonElement);

    expect(localStorage.getItem(SEARCH_DEFAULT)).toEqual(TEST_STRING);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem(SEARCH_DEFAULT, TEST_STRING);
    await render(<MockSearchComponent />);

    const inputElement = (await screen.findByPlaceholderText(
      SEARCH_PLACEHOLDER_TEXT
    )) as HTMLInputElement;

    expect(inputElement.value).toEqual(TEST_STRING);
  });
});
