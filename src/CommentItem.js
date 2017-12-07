import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'
import { editComment } from './actions'

import * as ReadableAPI from './ReadableApi'

const uuid = require('uuid-base62')

let ESCAPE_KEY = 27;
let ENTER_KEY = 13;

class CommentItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      idkey: uuid.v4(),
      valueCom: ''
    }
  }

  componentDidMount(){
    this.setState({
      valueCom: this.props.itemComent.body
    })

    if(this.props.likeComm !== undefined){
      let likeuser = this.props.likeComm.filter((item) => {
        return  item === this.props.itemComent.id
      })

      this.setState({
        like: likeuser[0]
      })
    }

  }

  componentWillReceiveProps(next_props) {
    if(next_props.likeComm !== undefined){
      let likeuser = next_props.likeComm.filter((item) => {
        return  item === next_props.itemComent.id
      })

      this.setState({
        like: likeuser[0]
      })
    }
  }


  componentDidUpdate (prevProps) {
    if (!prevProps.editingComment && this.props.editingComment) {
      let body = ReactDOM.findDOMNode(this.refs.editComment);
      body.focus();
      body.setSelectionRange(body.value.length, body.value.length);

      this.setState({
        valueCom: this.props.itemComent.body
      })
    }
  }

  handleChangeComment = (event) => {
    if (this.props.editingComment) {
      this.setState({valueCom: event.target.value});
    }
  }


  handleChangeItemComment = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({valueComment: event.target.value});
      this.props.oncancelComment(event);
    } else if (event.which === ENTER_KEY) {
      this.handleItemSubmit(event);
      this.setState({valueComment: event.target.value});
    }
  }

  handleItemSubmit = (event) => {
    let body = event.target.value
    let id = this.props.idComment

    this.props.editComent(id, body)
    ReadableAPI.updateComment(id, body)
    this.props.oncancelComment()
    this.setState({
      valueCom: this.props.itemComent.body
    })
  }



  render() {
    const { itemComent } = this.props
    return (
      <div className={"item-comment " + (this.props.editingComment ? 'edit-comment': '')} key={this.props.keyobj}>
        <div className="cont-comm-item">
          <div className="photo-user">
            {
              itemComent.hasOwnProperty('photo') && (
                <div className="photo">
                  <img src={itemComent.photo} alt={itemComent.author} />
                </div>
              )
            }
          </div>
          <div className="text-cont">
            <p>{itemComent.body}</p>
            <input type="text" ref="editComment" className="edit-comment" onChange={this.handleChangeComment} onKeyDown={ this.handleChangeItemComment } value={this.state.valueCom}/>
          </div>
        </div>
        <div className="edit-act-comment">
          <div className="reactions actions-edit-comment">
          { this.props.user.id === itemComent.userId && (
              <ul>
                <li><span onClick={() => this.props.oncommentPost(itemComent.id)}><i className="fa fa-pencil"></i></span></li>
                <li><span onClick={() => this.props.ondeleteComment(itemComent.id)}><i className="fa fa-trash"></i></span></li>
              </ul>
            )
          }
          </div>
          <ul className="reactions">
            { (this.state.like === itemComent.id)?
              <li onClick={() => this.props.dissLikeComm(itemComent.id)}>
                <span className={(itemComent.voteScore
                  ? 'show'
                  : ' hidden')}>{(itemComent.voteScore < 0 ? '': itemComent.voteScore)}
                </span>
                <i className="fa fa-heart like" />
              </li>
              :
              <li onClick={() => this.props.likeCommitem(itemComent.id)}>
                <span className={(itemComent.voteScore
                  ? 'show'
                  : ' hidden')}>{(itemComent.voteScore < 0 ? '': itemComent.voteScore)}
                </span>
                <i className="fa fa-heart-o" />
              </li>
            }
          </ul>
        </div>
      </div>
    )
  }
}


function mapStateToProps (reducer){
  return {
    user: reducer.user,
    comment: Object.keys(reducer.comments).reverse().map(function (keyobj) {
            return reducer.comments[keyobj]
          },{}),
    likeComm: reducer.likeComm
  }
}

function mapDispathToProps (dispatch){
  return {
    editComent: (id, body) => dispatch(editComment(id, body)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(CommentItem)
