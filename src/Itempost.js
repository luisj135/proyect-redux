import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ModalPost from './ModalPost'

import { connect } from 'react-redux'
import { user, addPost, like_save_comm, diss_like_save_comm } from './actions'
import './assets/css/itempost.css'
import Comments from './Comments'

class Itempost extends Component {
  constructor(props){
    super(props)
    this.state = {
      commentPost: [],
      itemPost:{},
      opened: false,
      editing: false,
      valueBody:'',
      valueTitle: '',
      viewuser: false,
      showModal: false
    }
  }
  componentDidMount(){
    this.setState({
      itemPost:{
        author: this.props.item.author,
        body: this.props.item.body,
        category: this.props.item.category,
        commentCount: this.props.item.commentCount,
        deleted: this.props.item.deleted,
        id: this.props.item.id,
        timestamp: this.props.item.timestamp,
        title: this.props.item.title,
        voteScore: this.props.item.voteScore,
        photo: this.props.item.photo || "",
        device: this.props.item.device
      }
    })
    this.setState({
      valueTitle: this.props.item.title
    })

    this.setState({
      valueBody: this.props.item.body
    })

    if(this.props.like !== undefined){
      let likeuser = this.props.like.filter((item) => {
        return  item === this.props.item.id
      })

      this.setState({
        like: likeuser[0]
      })
    }

    let comentsbyPost = this.props.comment.filter((comitem) => {
      return comitem.parentId === this.props.item.id
    })
    this.setState({
      commentPost: comentsbyPost
    })

    if(this.props.modalOpen !== undefined){
      if(this.props.item.id === this.props.def){
        this.setState({
          showModal: true
        })
      }else{
        this.setState({
          showModal: false
        })
      }
    }
  }

  componentWillReceiveProps(next_props) {
    if(next_props.comment.length !== this.props.comment.length) {
      let comentsbyPost = next_props.comment.filter((comitem) => {
        return comitem.parentId === next_props.item.id
      })
      this.setState({
        commentPost: comentsbyPost
      })
    }
    if(next_props.item !== this.props.item) {
      this.setState({
        itemPost:{
          author: next_props.item.author,
          body: next_props.item.body,
          category: next_props.item.category,
          commentCount: next_props.item.commentCount,
          deleted: next_props.item.deleted,
          id: next_props.item.id,
          timestamp: next_props.item.timestamp,
          title: next_props.item.title,
          voteScore: next_props.item.voteScore,
          photo: next_props.item.photo || "",
          device: next_props.item.device
        }
      })
      this.setState({
        valueTitle: next_props.item.title
      })

      this.setState({
        valueBody: next_props.item.body
      })

      if (next_props.item.author === next_props.user.name){
        this.setState({
          viewuser: true
        })
      }

      let comentsbyPost = next_props.comment.filter((comitem) => {
        return comitem.parentId === next_props.item.id
      })
      this.setState({
        commentPost: comentsbyPost
      })

    }

    if(next_props.like !== undefined){
      let likeuser = next_props.like.filter((item) => {
        return  item === next_props.item.id
      })

      this.setState({
        like: likeuser[0]
      })
    }

  }

  componentDidUpdate (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      let body = ReactDOM.findDOMNode(this.refs.editBody);
      body.focus();
      body.setSelectionRange(body.value.length, body.value.length);
    }
  }

  handleChangeTitle = (event) => {
    if (this.props.editing) {
      this.setState({valueTitle: event.target.value});
    }
  }

  handleChangeBody = (event) => {

    if (this.props.editing) {
      this.setState({valueBody: event.target.value});
    }
  }


  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = () =>{
    this.setState({ showModal: true });
  }

  render() {
    const { item, keyobj } = this.props
    const { itemPost } = this.state
    if (!itemPost.hasOwnProperty('title')){
      return null
    }
    return (
      <div className={"card social-card share  col1 " + (this.props.editing ? 'edit-item': '')} data-social="item" key={keyobj}>
        <div className="circle" data-toggle="tooltip" title="Label" data-container="body">
        </div>
        <div className="card-header clearfix">
          <div className={"user-pic" + (itemPost.photo ? '': ' hidden')}>
            <img alt="Profile" src={itemPost.photo} />
          </div>
          <h5>{itemPost.author}</h5>
          <h6>{itemPost.title}</h6>
          <input type="text" ref="editTitle" className="edit" onChange={ this.handleChangeTitle } value={this.state.valueTitle}/>
        </div>
        <div className="card-description">
          <p>{itemPost.body}</p>
          <textarea
            ref="editBody"
            className="edit"
            onChange={ this.handleChangeBody }
            value={this.state.valueBody}
          />
          <div className={"via" + (itemPost.device ? '': ' hidden')}>By {itemPost.device}</div>
          <ul className="reactions actions-save pull-right">
            <li><a onClick={() => this.props.onsavePost(itemPost.id, this.state.valueTitle, this.state.valueBody)}><i className="fa fa-floppy-o"></i></a></li>
            <li><a onClick={() => this.props.oneditclosePost()}><i className="fa fa-times"></i></a></li>
          </ul>
        </div>
        <div className="card-footer clearfix">
          <div className="time">{(keyobj === 0)?'few seconds ago': new Date(itemPost.timestamp).toDateString()}</div>
          <div className="edit-act">
            <ul className="reactions actions-edit">
              { (this.state.viewuser || !this.props.view ) ? 
                <li><a href={`/${itemPost.category}/${itemPost.id}`} target="_self"><i className="fa fa-expand"></i></a></li>
                : ''
              }
              { (this.state.viewuser && this.props.view) ?
                  <li><a onClick={() => this.props.oneditPost(itemPost.id)}><i className="fa fa-pencil"></i></a></li>
                :''
              }
              { (this.state.viewuser && this.props.view) ?
                  <li><a onClick={() => this.props.ondeletePost(itemPost.id)}><i className="fa fa-trash"></i></a></li>
                :''
              }
            </ul>
            <ul className="reactions">
              <li onClick={() => this.props.oneditComment(itemPost.id)}><span className={(this.state.commentPost.length > 0 ? 'show': ' hidden')}>{this.state.commentPost.length}</span><i className="fa fa-comment-o" />
              </li>
              { (this.state.like === itemPost.id)?
                <li onClick={() => this.props.dissLikePost(itemPost.id)}>
                  <span className={(itemPost.voteScore
                    ? 'show'
                    : ' hidden')}>{(itemPost.voteScore < 0 ? '': item.voteScore)}
                  </span>
                  <i className="fa fa-heart like" />
                </li>
                :
                <li onClick={() => this.props.likePost(itemPost.id)}>
                  <span className={(itemPost.voteScore
                    ? 'show'
                    : ' hidden')}>{(itemPost.voteScore < 0 ? '': item.voteScore)}
                  </span>
                  <i className="fa fa-heart-o" />
                </li>
              }
            </ul>
          </div>
        </div>
        <div className={"content-comment " + (this.props.opened ? 'comment-view': '')}>
          <Comments
            comObj={this.state.commentPost}
            postId = {this.props.item.id}
          />
        </div>
        < ModalPost
          showModal={this.state.showModal}
          close={this.closeModal}
          open={this.openModal}
          item={itemPost}
          itemsnum = {2}
        />
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
    like: reducer.like,
  }
}

function mapDispathToProps (dispatch){
  return {
    addPost: (data) => dispatch(addPost(data)),
    getUserInit: (data) => dispatch(user(data)),
    likeComment: (data) => dispatch(like_save_comm(data)),
    notlikeComment: (data) => dispatch(diss_like_save_comm(data)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Itempost)
