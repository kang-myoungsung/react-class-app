import { Component } from 'react';

class ReadContent extends Component {
    render() {
      return (
        <article>
          <h2>{this.props.title}</h2>
          {this.props.dssc}
        </article>
      );
    }
}

export default ReadContent;
