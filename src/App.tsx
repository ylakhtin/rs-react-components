import React from 'react';
import Search from './components/Search/Search';
import Beer from './components/Beer/Beer';
import { SEARCH_DEFAULT } from './data';

class App extends React.Component<object, { searchString: string | null }> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchString: localStorage.getItem(SEARCH_DEFAULT),
    };
    this.setSearchString = this.setSearchString.bind(this);
  }

  setSearchString(newSearchString: string): void {
    this.setState({ searchString: newSearchString });
  }

  render(): React.ReactNode {
    return (
      <div className="wrapper">
        <section className="box">
          <Search changeSearchString={this.setSearchString} />
        </section>
        <section className="box">
          <Beer searchString={this.state.searchString} />
        </section>
      </div>
    );
  }
}

export default App;
