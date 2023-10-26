import { Component } from "react";
import { SearchInputProps, SearchInputState } from "../types/interfaces";

class SearchInput extends Component<SearchInputProps, SearchInputState> {
    constructor(props: SearchInputProps) {
        super(props);
        this.state = {
            searchTerm: localStorage.getItem('searchTerm') || '',
        };
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: e.target.value.trim() });
      };

    handleSearch = () => {
        const { searchTerm } = this.state;
        this.props.onSearch(searchTerm);
        localStorage.setItem('searchTerm', searchTerm);
      };

    render() {
        return (
          <div>
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleSearch}>Search</button>
          </div>
        );
      }
    }

 
    export default SearchInput;
