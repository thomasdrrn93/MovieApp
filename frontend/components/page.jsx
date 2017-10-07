import React from 'react';

class Page extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <form>
          <input type="text"/>
        </form>
      </div>
    );
  }
}

export default Page;
