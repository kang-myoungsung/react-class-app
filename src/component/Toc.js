import { Component } from 'react';

class Toc extends Component {
  shouldComponentUpdate(newProps, newState) { 
    // console.log("===>toc", newProps.data, this.props.data);
    if (newProps.data === this.props.data) {
      return false; // 처음만 render가 호출되고 나머지는 호출이 안된다.
    } 
    return true;
  }

  render() {
    // console.log("toc")
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a href={"/content/" + data[i].id} 
          data-abcd = {data[i].id} // 방법 1
          onClick={function(id,e){ // 방법 2
            e.preventDefault();
            // debugger;
            this.props.onChangePage(e.target.dataset.abcd);  // 방법 1
          }.bind(this, data[i].id)} // 방법 2
          >{data[i].title} </a>
          </li>)
      i = i +1;
    }

    return (
      <nav>
      <ul> 
        {lists}
      </ul>
    </nav>
    );
  }
}

export default Toc;
