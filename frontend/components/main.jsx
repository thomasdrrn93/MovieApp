import React from 'react';

class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      id: 100
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount(){
    let url = `https://api.themoviedb.org/3/movie/${this.state.id}?&api_key=cfe422613b250f702980a3bbf9e90716`;
    this.fetchData(url);

    let results = new Bloodhound({
      datumTokenizer: function(data) {
        return Bloodhound.tokenizers.whitespace(data.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        wildcard: '%QUERY',
        url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=c6f1a6811bf4dfe91346ab0c38fec056',
        transform: function(movies) {
          return $.map(movies.results, function(movie) {
            return {
              title: movie.original_title,
              id: movie.id
            };
          });
        }
      }
    });
    results.initialize();

    $('.typeahead').typeahead({
      minLength: 1,
      highlight: true,
      hint: true,
    },
    {
      displayKey: 'title',
      source: results,
      limit: 5
    }).on('typeahead:selected', function(obj, data){
      const fetchedUrl = `https://api.themoviedb.org/3/movie/${data.id}?&api_key=cfe422613b250f702980a3bbf9e90716`;
      this.fetchData(fetchedUrl);
    }.bind(this));
  }

  componentDidUpdate() {
    document.body.style.backgroundImage = 'url(' + this.state.backdrop + ')';
  }

  fetchData(url){
    fetch(url).then((res) => res.json()).then((data) => {
      this.setState({
        id: data.id,
        title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: 'https://image.tmdb.org/t/p/w500' +  data.poster_path,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: 'https://image.tmdb.org/t/p/original' + data.backdrop_path

      })
    })

  }

  render(){
    return(
      <div id='app'>
        <div id='search'>
          <form>
            <input className="typeahead" type="text" placeholder='Search for a film'/>
          </form>
        </div>
        <div id='main-container'>
          <div id="poster-container">
            <img id="poster" src={this.state.poster}/>
          </div>
          <div id="info-container">
            <div id="title">
              <h1>{this.state.title}</h1>
            </div>
            <div id="overview">{this.state.overview}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
