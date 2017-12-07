import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'
import { addComment, removeComment, like_save_commAsync, diss_like_save_commAsync, like_save_comm, diss_like_save_comm } from './actions'

import CommentItem from './CommentItem'

import * as ReadableAPI from './ReadableApi'

const uuid = require('uuid-base62')

let ESCAPE_KEY = 27;
let ENTER_KEY = 13;

class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }


  handleChangeComment = (event) => {
      if (event.which === ESCAPE_KEY) {
        this.setState({valueComment: event.target.value});
        this.props.oncancelComment(event);
      } else if (event.which === ENTER_KEY) {
        this.handleSubmit(event);
      }
  }

  handleSubmit = (event) => {
    let data = {
      id: uuid.v4(),
      parentId: this.props.postId,
      timestamp: Date.now(),
      body: event.target.value,
      userId: this.props.user.id,
      author: this.props.user.name,
      photo: this.props.user.image,
      voteScore: 1,
      deleted: false,
      parentDeleted: false,
    }

    this.props.addComent(data)
    ReadableAPI.newComment(data).then((commentObj) => {
      let body = ReactDOM.findDOMNode(this.refs.newComment);
      body.value = ""
    })
  }

  deleteComment = (idComment) => {
    this.props.deleteComent(idComment)
    ReadableAPI.deleteComment(idComment)
  }

  editComment = (idComment) => {
    this.setState({editingComment: idComment});
  }

  cancelComment = () => {
    this.setState({editingComment: null});
  }

  likeCommentitem = (idPost) => {
    
    this.props.likeSComent(idPost)
    
    this.setState({
      liked: idPost
    })
    this.props.likeComment(idPost)
  }

  dissComment = (idPost) => {
    this.setState({
      liked: null
    })
    
    this.props.dissSComent(idPost)
    this.props.notlikeComment(idPost)
  }

  render() {

    return (
      <div className="comments-cont">
        <div className="cot-form-coments">
            <div className="photo-user">
              <div className="photo">
                <img src={this.props.user.image} alt={this.props.user.name} />
              </div>
            </div>
            <div className="text-input">
              <input type="text" ref="newComment" placeholder="Write a comment ..." onKeyDown={ this.handleChangeComment } />
            </div>
        </div>
        { (this.props.itemsnum !== 0) ?
          this.props.comObj.slice(0, this.props.itemsnum ).map((comment, i) => {
            return(
              <CommentItem
                key={i}
                keyobj = {i}
                itemComent = {comment}
                ondeleteComment={this.deleteComment}
                editingComment={this.state.editingComment === comment.id}
                oncommentPost={this.editComment}
                oncancelComment={this.cancelComment}
                idComment={this.state.editingComment}
                likeCommitem={this.likeCommentitem}
                dissLikeComm={this.dissComment}
                like={this.state.liked === comment.id}
              />
            )
          })
          : this.props.comObj.map((comment, i) => {
            return(
              <CommentItem
                key={i}
                keyobj = {i}
                itemComent = {comment}
                ondeleteComment={this.deleteComment}
                editingComment={this.state.editingComment === comment.id}
                oncommentPost={this.editComment}
                oncancelComment={this.cancelComment}
                idComment={this.state.editingComment}
                likeCommitem={this.likeCommentitem}
                dissLikeComm={this.dissComment}
                like={this.state.liked === comment.id}
              />
            )
          })
        }
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
    addComent: (data) => dispatch(addComment(data)),
    likeSComent: (id) => dispatch(like_save_commAsync(id)),
    dissSComent: (id) => dispatch(diss_like_save_commAsync(id)),
    deleteComent: (id) => dispatch(removeComment(id)),
    likeComment: (data) => dispatch(like_save_comm(data)),
    notlikeComment: (data) => dispatch(diss_like_save_comm(data)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Comments)
