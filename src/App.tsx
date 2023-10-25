import React from 'react';
import SearchButton from './components/SearchButton/SearchButton';
import SearchInput from './components/SearchInput/SearchInput';
import Beer from './components/Beer/Beer';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="wrapper">
        <section className="box">
          <SearchInput />
          <SearchButton />
        </section>
        <section className="box">
          <Beer />
        </section>
      </div>
    );
  }
}

export default App;
