import React, { Component } from 'react'
import Itempost  from './Itempost'
import { Modal } from 'react-bootstrap';

import { connect } from 'react-redux'
import { editPost, updatePost, removePost, like_save, diss_like_save } from './actions'

import * as ReadableAPI from './ReadableApi'


const uuid = require('uuid-base62')

class ModalPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      pid: uuid.v4()
    }
  }

  editPost = (idPost) => {
    this.setState({editing: idPost});
  }


  deletePost = (idPost) => {
    ReadableAPI.deletePost(idPost).then((objdelete) => {
      this.props.deletePost(idPost)
    })
  }

  editClosePost = (idPost) => {
    this.setState({editing: idPost});
  }

  savePost = (idPost, title, body) => {
    this.props.editPost(idPost, title, body)
    ReadableAPI.updatePost(idPost, title, body).then((objdelete) => {
      this.setState({editing: 0});
    })
  }

  commentBox = (idPost) => {
    this.setState({
      opened: idPost,
    });
  }

  likeBox = (idPost) => {
    ReadableAPI.votePost(idPost, "upVote").then((objpost) => {
      this.props.updatePost(idPost, objpost)
    })
    this.setState({
      liked: idPost
    })
    this.props.likePost(idPost)
  }

  dissBox = (idPost) => {
    this.setState({
      liked: null
    })
    ReadableAPI.votePost(idPost, "downVote").then((objpost) => {
      this.props.updatePost(idPost, objpost)
    })
    this.props.notlikePost(idPost)
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.close} dialogClassName="slide-right">
        <Modal.Header closeButton>
          <Modal.Title>Detail Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-dialog modal-sm">
            <div className="modal-content-wrapper">
                <div className="modal-content table-block">
                    <div className="modal-body v-align-middle text-center   ">
                        <Itempost
                          item={this.props.item}
                          key={this.state.pid}
                          keyobj={this.state.pid}
                          oneditPost={this.editPost}
                          oneditclosePost={this.editClosePost}
                          onsavePost={this.savePost}
                          ondeletePost={this.deletePost}
                          editing={this.state.editing === this.props.item.id}
                          oneditComment={this.commentBox}
                          opened={this.state.opened === this.props.item.id}
                          itemsnum = {0}
                          view = {true}
                          likePost={this.likeBox}
                          dissLikePost={this.dissBox}
                          />
                    </div>
                </div>
            </div>
        </div>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps (reducer){
  return {
    user: reducer.user,
    postObj: {
      page: reducer.post.page,
      entities:
        Object.keys(reducer.post.entities).reverse().map(function (key) {
          let objsave = reducer.post.entities[key]
          let arrayobj = []
          Object.keys(objsave).map(function (keyobj) {
            return arrayobj[keyobj] = objsave[keyobj]
          },{})
          return arrayobj
        },{})
    }
  }
}

function mapDispathToProps (dispatch){
  return {
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
    updatePost: (id, post) => dispatch(updatePost(id, post)),
    deletePost: (data) => dispatch(removePost(data)),
    likePost: (data) => dispatch(like_save(data)),
    notlikePost: (data) => dispatch(diss_like_save(data)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(ModalPost)
