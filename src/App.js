import './App.css';
import Toc from './component/Toc';
import ReadContent from './component/ReadContent';
import Subject from './component/Subject';
import Control from './component/Control';
import CreateContent from './component/CreateContent';
import UpdateContent from './component/UpdateContent';
import { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3; // UI에 영향이 없는 state 값은 밖으로 뺀다. 
    this.state = {
        mode:'welcome',
        selected_content_id:2,
        subject:{title:'WEB', sub:"world wide web!1"}, 
        welcome:{title:'welcome', desc:"hello react."}, 
        contents:[
          {id:1, title:"HTML", desc:"HTML is...1"},
          {id:2, title:"CSS", desc:"CSS is..."},
          {id:3, title:"JavaScript", desc:"JavaScript is..."}
        ]
    }
  }
  
  getReadContent(){
    var i = 0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if (data.id ===this.state.selected_content_id) {
        return data;
        break;
      }
      i = i +1;
    }
  }

  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode ==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} dssc={_desc}></ReadContent>
    } else if (this.state.mode ==='read') {
      var _contents = this.getReadContent();
      _article = <ReadContent title={_contents.title} dssc={_contents.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){

      // console.log(_title, _desc)
      this.max_content_id = this.max_content_id +1;

      // --> 원본을 변경 기능 push (이걸 쓰면 안됨. shouldComponentUpdate가 인식하지 못함)
      // this.state.contents.push(
      // {id:this.max_content_id, title:_title, desc:_desc});

      // // --> 원본을 유지 후 신규 생성된 변수만 변경
      var _contents = this.state.contents.concat(
        {id:this.max_content_id, title:_title, desc:_desc}
      )
      
      // --> 다른 방법 Array.from(this.state.contents); 은 배열을 복제해서 새로운 객체를 생성하기에 이렇게 하면 됨.
      // var _contents = Array.from(this.state.contents);
      // _contents.push({id:this.max_content_id, title:_title, desc:_desc});

      this.setState({
        contents:_contents, //원본의 복제복을 만들어서 setState 해야함.
        mode:'read',
        selected_content_id : this.max_content_id
      })

      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      var _contents = this.getReadContent();
      _article = <UpdateContent data={_contents} onSubmit={
      function(_id, _title, _desc){

        //-> Array.from(this.state.contents); 은 배열을 복제해서 새로운 객체를 생성하기에 이렇게 하면 됨.
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length) {
          if (_contents[i].id === _id) {
            _contents[i] = {id:_id, title:_title, desc:_desc}
            break;
          }
          i= i +1;
        }
        this.setState({
          contents:_contents, //원본의 복제복을 만들어서 setState 해야함.
          mode:'read'
        })
      }.bind(this)}></UpdateContent>
    }
    return _article
  }

  render() {
    // console.log('render', this);
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode:'welcome'
            })
          }.bind(this)}
          >
        </Subject>

        <Toc data={this.state.contents} onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}></Toc>

        <Control onChangeMode={function(_mode){
          if (_mode === "delete") {
            if (window.confirm("정말 삭제 할거인?")) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i= i +1;
              }
            }
            this.setState({
              contents:_contents,
              mode:'welcome'
            });
            alert("삭제완료");
            
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>

        {this.getContent()}

      </div>
    );
  }
}

export default App;
