import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Itempost  from './Itempost'

import { connect } from 'react-redux'
import { editPostAsync, like_saveAsync, removePostAsync, diss_likeAsync, like_save, diss_like_save } from './actions'


class Objpost extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
  }

  componentDidMount(){
    this.setState({
      def: this.props.defaultpost
    });
  }

  componentWillReceiveProps(next_props) {
    this.setState({
      def: next_props.defaultpost
    });
  }

  editPost = (idPost) => {
    this.setState({editing: idPost});
  }


  deletePost = (idPost) => {
    this.props.deletePost(idPost)
  }

  editClosePost = (idPost) => {
    this.setState({editing: idPost});
  }

  savePost = (idPost, title, body) => {
    this.props.editPost(idPost, title, body)
    this.setState({editing: 0});
  }

  commentBox = (idPost) => {
    this.setState({
      opened: idPost,
    });
  }

  likeBox = (idPost) => {
    
    this.setState({
      liked: idPost
    })
    this.props.updatePostLike(idPost)
    this.props.likePost(idPost)
  }

  dissBox = (idPost) => {
    this.setState({
      liked: null
    })
    
    this.props.updatePostdissLike(idPost)
    this.props.notlikePost(idPost)
  }

  render() {
    const { obj } = this.props
    if (obj.length === 0){
      return null
    }
    if (this.state.redirect){
      return <Redirect to='/404'/>;
    }
    return (
      <div className="contentfeed">
        {
          obj.map((item, i) => {
            return(
              <Itempost
                item={item}
                key={i}
                keyobj={i}
                oneditPost={this.editPost}
                oneditclosePost={this.editClosePost}
                onsavePost={this.savePost}
                ondeletePost={this.deletePost}
                editing={this.state.editing === item.id}
                oneditComment={this.commentBox}
                likePost={this.likeBox}
                dissLikePost={this.dissBox}
                like={this.state.liked === item.id}
                opened={this.state.opened === item.id}
                modalOpen={this.props.defaultpost === item.id}
                def={this.props.defaultpost}
                view = {this.props.user.name === item.author}
                />
              )
          }, {})
        }
      </div>
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
    editPost: (id, title, body) => dispatch(editPostAsync(id, title, body)),
    updatePostLike: (id) => dispatch(like_saveAsync(id)),
    updatePostdissLike: (id) => dispatch(diss_likeAsync(id)),
    deletePost: (data) => dispatch(removePostAsync(data)),
    likePost: (data) => dispatch(like_save(data)),
    notlikePost: (data) => dispatch(diss_like_save(data)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Objpost)
