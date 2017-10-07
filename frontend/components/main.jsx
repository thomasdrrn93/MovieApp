import React from 'react';

class Main extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let results = new Bloodhound({
      datumTokenizer: function(data) {
        return Bloodhound.tokenizers.whitespace(data.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=c6f1a6811bf4dfe91346ab0c38fec056',
        filter: function(movies) {
          return $.map(movies.results, function(movie) {
            return {
              value: movie.original_title,
              id: movie.id
            };
          });
        }
      }
    });
    let promise = results.initialize();
  }

  render(){
    return(
      <div>
        <form>
          <input className="typeahead" type="text"/>
        </form>
      </div>
    );
  }
}

export default Main;
