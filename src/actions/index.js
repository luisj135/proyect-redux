import * as ReadableAPI from '../ReadableApi'

export const INIT_POST = 'INIT_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const UPDATE_LIKE_POST = 'UPDATE_LIKE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_LIKE_POST = 'ADD_LIKE_POST'

export const INIT_COMMENT = 'INIT_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const ADD_LIKE_COMMENT = 'ADD_LIKE_COMMENT'

export const INIT_CATEGORIES = 'INIT_CATEGORIES'
export const FILTER = 'FILTER'
export const ORDER = 'ORDER'
export const PAGE = 'PAGE'
export const USER = 'USER'
export const LIKE_SAVE = 'LIKE_SAVE'
export const DISS_LIKE_SAVE = 'DISS_LIKE_SAVE'
export const LIKE_SAVE_COMMENT = 'LIKE_SAVE_COMMENT'
export const DISS_LIKE_SAVE_COMMENT = 'DISS_LIKE_SAVE_COMMENT'




export function initPost (post) {
  return {
    type:'INIT_POST',
    post
  }
}

export function initPostAsync() {
  return dispatch => {
    ReadableAPI.getPostAll().then((postObj) => {
      let datapost = postObj.filter((item) => {
        return item.deleted === false
      })
      dispatch(initPost(datapost))
      datapost.forEach((post) => {
        dispatch(addCommentAsync(post.id))
      })
    })
  }
}

export function addPost (post) {
  return{
    type:'ADD_POST',
    post
  }
}

export function editPost (id, title, body) {
  return{
    type:'EDIT_POST',
    id,
    title,
    body
  }
}

export function editPostAsync (id, title, body) {
  return dispatch => {
    ReadableAPI.updatePost(id, title, body).then((objdelete) => {
      dispatch(editPost(id, title, body))
    })
  }
}

export function updatePost (id, post) {
  return{
    type:'UPDATE_LIKE_POST',
    id,
    post
  }
}


export function likePost ({ id, points }) {
  return{
    type:'ADD_LIKE_POST',
    id,
    points
  }
}

export function removePost ( id ) {
  return{
    type:'REMOVE_POST',
    id
  }
}

export function removePostAsync (id) {
  return dispatch => {
    ReadableAPI.deletePost(id).then((objdelete) => {
      dispatch(removePost(id))
    })
  }
}

export function initComment (comment) {
  return{
    type:'INIT_COMMENT',
    comment
  }
}

export function addComment (comment) {
  return{
    type:'ADD_COMMENT',
    comment
  }
}

export function addCommentAsync(idPost) {
  return dispatch => {
    ReadableAPI.getCommentbyPostId(idPost).then((commentObj) => {
      commentObj.forEach((element) => {
        dispatch(addComment(element))
      })
    })
  }
}

export function editComment (id, body) {
  return{
    type:'EDIT_COMMENT',
    id,
    body
  }
}

export function updateComment (id, body) {
  return{
    type:'UPDATE_COMMENT',
    id,
    body
  }
}

export function likeComment ({ id, points }) {
  return{
    type:'ADD_LIKE_COMMENT',
    id,
    points
  }
}

export function removeComment (id) {
  return{
    type:'REMOVE_COMMENT',
    id
  }
}


export function initCategories (categories) {
  return{
    type:'INIT_CATEGORIES',
    categories
  }
}

export function getInitListCategories() {
  let arraycat = []
  return dispatch => {
    ReadableAPI.getCategoriesAll().then((categoriesObj) => {
      Object.keys(categoriesObj.categories).map(function (key) {
        return arraycat[key] = categoriesObj.categories[key]
      },{})
      dispatch(initCategories(arraycat))
      return arraycat
    })
  };
}

export function filter (filter) {
  return{
    type:'FILTER',
    filter
  }
}

export function order (order) {
  return{
    type:'ORDER',
    order
  }
}


export function page ({ page }) {
  return{
    type:'PAGE',
    page
  }
}

export function user (user) {
  return{
    type:'USER',
    user
  }
}


export function like_save (id) {
  return{
    type:'LIKE_SAVE',
    id
  }
}


export function like_saveAsync (id) {
  return dispatch => {
    ReadableAPI.votePost(id, "upVote").then((objpost) => {
      dispatch(updatePost(id, objpost))
    })
  }
}


export function diss_like_save (id) {
  return{
    type:'DISS_LIKE_SAVE',
    id
  }
}

export function diss_likeAsync (id) {
  return dispatch => {
    ReadableAPI.votePost(id, "downVote").then((objpost) => {
      dispatch(updatePost(id, objpost))
    })
  }
}


export function like_save_comm (id) {
  return{
    type:'LIKE_SAVE_COMMENT',
    id
  }
}


export function like_save_commAsync (id) {
  return dispatch => {
    ReadableAPI.voteComment(id, "upVote").then((objpost) => {
      dispatch(updateComment(id, objpost))
    })
  }
}


export function diss_like_save_comm (id) {
  return{
    type:'DISS_LIKE_SAVE_COMMENT',
    id
  }
}


export function diss_like_save_commAsync (id) {
  return dispatch => {
    ReadableAPI.voteComment(id, "downVote").then((objpost) => {
      dispatch(updateComment(id, objpost))
    })
  }
}

