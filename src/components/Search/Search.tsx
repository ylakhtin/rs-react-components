import React from 'react';
import { SEARCH_DEFAULT } from '../../data';

class Search extends React.Component<object, { inputValue: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: '',
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.setSearchString = this.setSearchString.bind(this);
  }

  setInputValue(searchString: string): void {
    console.log('set input value is called');
    this.setState({ inputValue: searchString });
    console.log('current state is - ', this.state.inputValue);
  }

  setSearchString(): void {
    localStorage.setItem(SEARCH_DEFAULT, this.state.inputValue);
  }

  render(): React.ReactNode {
    return (
      <div className="search-container">
        <input
          type="text"
          onChange={(event) => this.setInputValue(event.target.value)}
          className="search-input"
          placeholder="Input search string here..."
        />
        <button onClick={this.setSearchString} className="search-button">
          Search
        </button>
      </div>
    );
  }
}

export default Search;
