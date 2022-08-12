import { Component } from 'react';

class CreateContent extends Component {
    render() {
      return (
        <article>
        <h2>Create</h2>
         <form action="/create_process" method='POST'
         onSubmit={function(e){
          e.preventDefault();
          this.props.onSubmit(e.target.title.value, e.target.desc.value);
          // console.log(e.target.title.value)
         }.bind(this)}>
          <p><input type="text" name="title" placeholder='title'></input> </p>
          <p><textarea name='desc' placeholder='descpiption'></textarea></p>
          <p><input type="submit"></input></p>
         </form>
        </article>
      );
    }
}

export default CreateContent;
