import { fireEvent, render, screen } from '@testing-library/react';
import { server } from '../../MockService/Server';
import { App } from '../../../App';
import { SEARCH_DEFAULT } from '../../../shared/data/data';

const PAGE_SEGMENT_NUMBER = 2;
const SEARCH_STRING_TEST = 'a';

describe('Paginator component', () => {
  it('Make sure the component updates URL query parameter when page changes. Next page', async () => {
    server.listen();

    await render(<App />);

    const buttonElement = await screen.findByRole('button', { name: /Next/i });
    fireEvent.click(buttonElement);

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    const pageNum = pathSegments[PAGE_SEGMENT_NUMBER];

    expect(pageNum).toEqual(String(PAGE_SEGMENT_NUMBER));

    server.close();
  });

  it('Make sure the component updates URL query parameter when page changes. Previous page', async () => {
    server.listen();

    await render(<App />);

    const buttonNextElement = await screen.findByRole('button', {
      name: /Next/i,
    });
    fireEvent.click(buttonNextElement);
    fireEvent.click(buttonNextElement);

    const buttonPrevElement = await screen.findByRole('button', {
      name: /Prev/i,
    });
    fireEvent.click(buttonPrevElement);

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    const pageNum = pathSegments[PAGE_SEGMENT_NUMBER];

    expect(pageNum).toEqual(String(PAGE_SEGMENT_NUMBER));

    server.close();
  });

  it('Checks page change using keyboard', async () => {
    server.listen();

    localStorage.setItem(SEARCH_DEFAULT, SEARCH_STRING_TEST);
    await render(<App />);

    const inputElement = await screen.findByPlaceholderText('pageNum');
    fireEvent.change(inputElement, { target: { value: PAGE_SEGMENT_NUMBER } });
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(window.location.href).toContain(
      `/page/${PAGE_SEGMENT_NUMBER}/search/${SEARCH_STRING_TEST}`
    );

    server.close();
  });
});
