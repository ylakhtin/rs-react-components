import React from 'react';
import { SEARCH_DEFAULT } from '../../data';

type SearchString = {
  changeSearchString: (newSearchString: string) => void;
};

class Search extends React.Component<SearchString, { inputValue: string }> {
  constructor(props: SearchString) {
    super(props);
    this.state = {
      inputValue: '',
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.setSearchString = this.setSearchString.bind(this);
  }

  setInputValue(searchString: string): void {
    this.setState({ inputValue: searchString });
  }

  setSearchString(): void {
    localStorage.setItem(SEARCH_DEFAULT, this.state.inputValue);
    // this.props.setSearch(this.state.inputValue);
    console.log(this.props);
    this.props.changeSearchString(this.state.inputValue);
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
