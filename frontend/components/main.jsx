import React from 'react';

class Main extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <form>
          <input class="typeahead" type="text"/>
        </form>
      </div>
    );
  }
}

export default Main;
