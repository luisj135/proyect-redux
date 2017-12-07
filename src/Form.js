import React, { Component } from 'react'
import './assets/css/component.css'
import './assets/css/app.css'
import './pages/css/pages.css'
import './pages/css/pages-icons.css'
import { addPost, user } from './actions'
import { connect } from 'react-redux'
import * as ReadableAPI from './ReadableApi'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const uuid = require('uuid-base62');

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      objform: '',
      input: {
        value : this.props.user.name
      },
      valuesel: '',
      valuetitle: '',
      valueautor: '',
      viewCat: true,
      valueBody: ''
    }
    this.catSel = this.catSel.bind(this);
    this.handleChangeAutor = this.handleChangeAutor.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  componentDidMount(){
    this.setState({
      valueautor: this.props.user.name
    })
    if(this.props.hasOwnProperty('defaultfilter')){
      this.setState({
        valuesel: this.props.defaultfilter
      })

      this.setState({
       viewCat: false
      })
    }
  }

  componentWillReceiveProps(next_props) {
    this.setState({
      valueautor: this.props.user.name
    })
  }

  submitData = () => {
    document.getElementById('title-input').style.border = "1px solid #e6e6e6"
    document.getElementById('body-input').style.border = "1px solid #e6e6e6"
    document.getElementsByClassName('Select-value')[0].style.border = "1px solid #e6e6e6"
    if(this.state.valuetitle !== '' && this.state.valueBody !== '' && this.state.valuesel !== ''){
      let data = {
          id: uuid.v4(),
          timestamp: Date.now(),
          title: this.state.valuetitle,
          body: this.state.valueBody,
          author: this.state.valueautor,
          photo: this.props.user.image,
          category: this.state.valuesel,
          voteScore: 1,
          deleted: false
        }
      this.props.putPost(data)
      ReadableAPI.newPost(data)
      document.getElementById('title-input').value = ""
      document.getElementById('status-q1').value = ""
      this.setState({
        valuetitle: ''
      });
      this.setState({
        valueBody: ''
      });
      this.setState({
        valuesel: this.props.defaultfilter
      });
    }else{
      if(this.state.valuetitle === ''){
        document.getElementById('title-input').style.border = "1px solid red"
      }
      if(this.state.valueBody === ''){
        document.getElementById('body-input').style.border = "1px solid red"
      }
      if(this.state.valuesel === ''){
        document.getElementsByClassName('Select-value')[0].style.border = "1px solid red"
      }
    }
    let user = this.props.user
    user.name = this.state.valueautor
    this.props.getUser(user)
  }

  changeBody = (event) => {
    this.setState({
      valueBody: event.target.value
    });
  }

  catSel(val) {
    this.setState({
      valuesel: val.value
    });
  }

  handleChangeAutor(event) {
    this.setState({
      valueautor:  event.target.value
    });
    console.log(this.state.valueautor)

  }

  handleChangeTitle(event) {
    this.setState({
      valuetitle: event.target.value
    });
  }

  render() {
    const { categories } = this.props
    let opciones = []
    categories.map((item, i) => {
      return opciones[i] = { value: item.path, label: item.name}
    })
    return (
      <div className="feed row">
        <div className="user-cont">
          <div className="photo">
            <img src={this.props.user.image} alt={this.props.user.name} />
          </div>
          <div className="nameuser">
            <p>Author:</p>
            <input ref="authorEdit" type="text" defaultValue={this.state.valueautor} placeholder={this.state.valueautor} onChange={this.handleChangeAutor}/>
          </div>
          <div className="cont-data">
            <p>Title:</p>
            <input type="text" placeholder="Title" onChange={this.handleChangeTitle} id="title-input"/>
          </div>
        </div>
        { (this.state.viewCat) && (
          <div className="cont-cat">
            <p>Category:</p>
            <Select
              name="form-field-cat"
              value={this.state.valuesel}
              options={opciones}
              onChange={this.catSel}
            />
          </div>
          )
        }
        <div className="day" data-social="day">
          <div className="card social-card col2 padding-20" data-social="item" id="body-input">
            <form className="simform no-margin" autoComplete="off" data-social="status">
              <div className="status-form-inner">
                <ol className="questions">
                  <li className="current">
                    <span>
                      <label htmlFor="status-q1">What on your mind?</label>
                    </span>
                    <input id="status-q1" name="q1" type="text" onChange={this.changeBody} />
                  </li>
                </ol>
                <button className="submit" type="submit">Send answers</button>
                <div className="controls">
                  <button className="next" />
                  <div className="progress" />
                  <span className="number">
                    <span className="number-current" />
                    <span className="number-total" />
                  </span>
                  <span className="error-message" />
                </div>
              </div>
              <span className="final-message" />
            </form>

            <button className="btn btn-complete btn-cons pull-right" onClick={this.submitData}>Publicar</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (reducer){
  return {
    categories:
      Object.keys(reducer.categories).map(function (key) {
        let objsave = reducer.categories[key]
        let arraycat = []
        Object.keys(objsave).map(function (keyobj) {
          return arraycat[keyobj] = objsave[keyobj]
        },{})
        return arraycat
      },{}),
    user: reducer.user
  }
}

function mapDispathToProps (dispatch){
  return {
    putPost: (data) => dispatch(addPost(data)),
    getUser: (data) => dispatch(user(data)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Form)
