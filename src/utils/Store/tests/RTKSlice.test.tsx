import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../Store';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { searchSlice } from '../Reducers/SearchReducer';
import { useEffect } from 'react';

const TEST_ID = 'testID';
const TEST_STRING = 'abracadabra';

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
  const searchRootString = useAppSelector((state) => state.searchSliceReducer.searchRootString);
  const { setRootSearch } = searchSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRootSearch(TEST_STRING));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div data-testid={TEST_ID}>{searchRootString}</div>;
};

describe('RTK slice tests', () => {
  it('Test if we can get and change a state using slices', async () => {
    render(<MockComponent />);

    const reduxValue = await screen.findByTestId(TEST_ID);

    expect(reduxValue.textContent).toEqual(TEST_STRING);
  });
});
