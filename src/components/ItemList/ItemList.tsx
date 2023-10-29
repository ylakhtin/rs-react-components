import React from 'react';
import { EMPTY_ITEMS_ARRAY } from './data';
import { IBeerDetails } from './data';
import API from '../API/API';

type PropsType = { searchString: string | null };

class ItemList extends React.PureComponent<
  PropsType,
  { beerList: IBeerDetails[]; isLoading: boolean; requestOK: boolean }
> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      beerList: EMPTY_ITEMS_ARRAY,
      isLoading: false,
      requestOK: true,
    };

    this.queryData = this.queryData.bind(this);
  }

  private async queryData(): Promise<void> {
    this.setState({ isLoading: true });

    const dataQuery = new API();
    this.setState({
      requestOK: await dataQuery.queryItems(
        this.props.searchString,
        (obj: { beerList: IBeerDetails[] }) => this.setState(obj)
      ),
    });

    this.setState({ isLoading: false });
  }

  public componentDidMount(): void {
    this.queryData();
  }

  public componentDidUpdate(prevProps: PropsType) {
    if (this.props.searchString !== prevProps.searchString) {
      this.queryData();
    }
  }

  public render(): React.ReactNode {
    return (
      <div>
        <div>
          {!this.state.beerList.length || !this.state.requestOK ? (
            <div>No matches found</div>
          ) : (
            <div>Matches on this page: {this.state.beerList.length}</div>
          )}
        </div>
        <div>
          {!this.state.requestOK ? (
            <div className="loader">Bad request</div>
          ) : (
            <div>
              {this.state.isLoading ? (
                <div className="loader">Loading, please wait...</div>
              ) : (
                this.state.beerList.map((beer, index) => (
                  <div className="flex-container" key={index}>
                    <div className="data-container">
                      <div>{beer.name}</div>
                      <div>{beer.tagline}</div>
                      <div>Volume: {beer.abv}%</div>
                      <div>{beer.description}</div>
                      <div>First brewed: {beer.first_brewed}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ItemList;
