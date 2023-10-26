import React from 'react';
import Search from './components/Search/Search';
import Beer from './components/Beer/Beer';
import { SEARCH_DEFAULT } from './data';

class App extends React.Component {
  initSearch: string | null = localStorage.getItem(SEARCH_DEFAULT);

  render(): React.ReactNode {
    return (
      <div className="wrapper">
        <section className="box">
          <Search />
        </section>
        <section className="box">
          <Beer searchString={this.initSearch} />
        </section>
      </div>
    );
  }
}

export default App;
