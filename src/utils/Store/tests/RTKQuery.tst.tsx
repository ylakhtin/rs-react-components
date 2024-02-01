import { Provider } from 'react-redux';
import { beerAPI } from '../../services/BeerService';
import { setupStore } from '../Store';
import { render, screen, waitFor } from '@testing-library/react';
import { server } from '../../MockService/Server';

const TEST_QUERY_STRING = 'https://api.punkapi.com/v2/beers?page=1&per_page=4';
const TEST_ID = 'testID';
const ERROR_STRING = 'error occurred';
const SUCCESS_STRING = 'Request Success';

const MockComponent = function () {
  const store = setupStore();

  return (
    <div>
      <Provider store={store}>
        <TestComponent />
      </Provider>
    </div>
  );
};

const TestComponent = function () {
  const { data, error } = beerAPI.useFetchDataQuery(TEST_QUERY_STRING);

  return (
    <div>
      {data && !error ? (
        <div data-testid={TEST_ID}>{SUCCESS_STRING}</div>
      ) : (
        <div data-testid={TEST_ID}>{ERROR_STRING} </div>
      )}
    </div>
  );
};

describe('RTK query tests', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.close();
  });

  it('Test if we can get data using RTK Query', async () => {
    render(<MockComponent />);

    await waitFor(() => screen.getByTestId(TEST_ID));
    const successElement = await screen.getByTestId(TEST_ID);

    expect(successElement.textContent).toEqual(SUCCESS_STRING);
  });
});
