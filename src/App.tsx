import React from 'react';
import Search from './components/Search/Search';
import Beer from './components/ItemList/ItemList';
import { SEARCH_DEFAULT } from './data';

class App extends React.Component<object, { searchString: string | null }> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchString: localStorage.getItem(SEARCH_DEFAULT),
    };
    this.setSearchString = this.setSearchString.bind(this);
  }

  public setSearchString(newSearchString: string): void {
    this.setState({ searchString: newSearchString });
  }

  public render(): React.ReactNode {
    return (
      <div className="main-space">
        <div className="wrapper">
          <section className="box">
            <Search changeSearchString={this.setSearchString} />
          </section>
          <section className="box">
            <Beer searchString={this.state.searchString} />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
