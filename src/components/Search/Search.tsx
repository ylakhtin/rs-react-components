import React from 'react';
import { SEARCH_DEFAULT } from '../../data';

type SearchString = {
  changeSearchString: (newSearchString: string) => void;
};

class Search extends React.Component<
  SearchString,
  { inputValue: string; hasError: boolean }
> {
  constructor(props: SearchString) {
    super(props);
    this.state = {
      inputValue: '',
      hasError: false,
    };

    this.setInputValue = this.setInputValue.bind(this);
    this.setSearchString = this.setSearchString.bind(this);
  }

  private setInputValue(searchString: string): void {
    this.setState({ inputValue: searchString });
  }

  private setSearchString(): void {
    localStorage.setItem(SEARCH_DEFAULT, this.state.inputValue);
    this.props.changeSearchString(this.state.inputValue);
  }

  public componentDidMount(): void {
    if (typeof localStorage.getItem(SEARCH_DEFAULT) === 'string') {
      this.setState({
        inputValue: localStorage.getItem(SEARCH_DEFAULT) as string,
      });
    }
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      throw Error('this is to check the Error Boundary feature');
    }

    return (
      <div className="search-container">
        <input
          type="text"
          onChange={(event) => this.setInputValue(event.target.value)}
          value={this.state.inputValue}
          className="search-input"
          placeholder="Input search string here..."
        />
        <button onClick={this.setSearchString} className="search-button">
          Search
        </button>
        <button
          onClick={() => {
            this.setState({ hasError: true });
          }}
        >
          Throw error
        </button>
      </div>
    );
  }
}

export default Search;
