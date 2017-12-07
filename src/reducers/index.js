import {
  INIT_POST,
  ADD_POST,
  EDIT_POST,
  UPDATE_LIKE_POST,
  REMOVE_POST,
  ADD_LIKE_POST,
  INIT_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
  ADD_LIKE_COMMENT,
  INIT_CATEGORIES,
  FILTER,
  ORDER,
  PAGE,
  USER,
  LIKE_SAVE,
  DISS_LIKE_SAVE,
  LIKE_SAVE_COMMENT,
  DISS_LIKE_SAVE_COMMENT,
} from '../actions'

const initialState = {
  post:{
    page:1,
    filter:'all',
    entities: [],
  },
  comments: [],
  categories: [],
  user:[]
}

function reducer(state =  initialState, action = {}){

  const { post, page } = action

  switch (action.type){
    case INIT_POST: {
      return {
        ...state,
        post:{...state.post,
          entities: action.post
        }
      }
    }
    case ADD_POST: {
      return {
        ...state,
        post:{
          ...state.post,
          entities: [...state.post.entities, action.post]
        }
      }
    }
    case EDIT_POST: {
      let datapost = state.post.entities.map((item, index) => {
        if (item.id === action.id){
          item['title']= action.title
          item['body']= action.body
          item['timestamp']= Date.now()
        }
        return item
      })
      return {
        ...state,
        post:{
          ...state.post,
          entities: datapost
        }
      }
    }
    case UPDATE_LIKE_POST: {
      let datapost = state.post.entities.map((item, index) => {
        if (item.id === action.post.id){
          item['voteScore']= action.post.voteScore
        }
        return item
      })
      return {
        ...state,
        post:{
          ...state.post,
          entities: datapost
        }
      }
    }
    case REMOVE_POST: {
      let datafiltred = state.post.entities.filter((itemdata) => {
        return itemdata.id !== action.id
      })
      return {
        ...state,
        post:{ ...state.post,
          entities: datafiltred
        }
      }
    }
    case ADD_LIKE_POST: {
      return
    }
    case INIT_COMMENT: {
      return {
        ...state,
        comments: action.comment
      }
    }
    case ADD_COMMENT: {
      return {
        ...state,
        comments: [
          ...state.comments,
          action.comment
        ]
      }
    }
    case EDIT_COMMENT: {
      let datacomments = state.comments.map((item, index) => {
        if (item.id === action.id){
          item['body']= action.body
          item['timestamp']= Date.now()
        }
        return item
      })
      return {
        ...state,
        comments: datacomments
      }
    }

    case UPDATE_COMMENT: {
      let datacomments = state.comments.map((item, index) => {
        if (item.id === action.body.id){
          item['voteScore']= action.body.voteScore
        }
        return item
      })
      return {
        ...state,
        comments: datacomments
      }
    }

    case REMOVE_COMMENT: {
      let datafiltred = state.comments.filter((itemdata) => {
        return itemdata.id !== action.id
      })
      return {
        ...state,
        comments: datafiltred
      }
    }
    case ADD_LIKE_COMMENT: {
      return
    }

    case INIT_CATEGORIES: {
      let objcat = []
      objcat.push({ name: 'All Post', path: ''})
      action.categories.map((item) =>{
        return objcat.push(item)
      })
      return {
        ...state,
        categories: objcat
      }
    }

    case FILTER: {
      return {
        ...state,
        post: {...state.post,
          filter: action.filter
        }
      }
    }

    case ORDER: {
      console.log(action.order)
      switch (action.order){
        case 'lastvoted': {
          let arraynew = state.post.entities.sort((a, b) => a.voteScore + b.voteScore)
          return {
            ...state,
            post: {
              entities: arraynew
            }
          }
        }
        case 'morevoted': {
          let arraynew = state.post.entities.sort((a, b) => a.voteScore - b.voteScore)
          return {
            ...state,
            post: {
              entities: arraynew
            }
          }
        }
        case 'date': {
          let arraynew = state.post.entities.sort((a, b) => a.timestamp + b.timestamp)
          return{
            ...state,
            post: {
              entities: arraynew
            }
          }
        }
        case 'all': {
          let arraynew = state.post.entities.sort((a, b) => a.timestamp - b.timestamp)
          return{
            ...state,
            post: {
              entities: arraynew
            }
          }
        }
        default:{
          return state
        }
      }
    }

    case PAGE: {
      return {
        ...state,
        [post]: {
          ...state[post][page] = action.page
        }
      }
    }

    case USER: {
      return {
        ...state,
        user: action.user
      }
    }
    case LIKE_SAVE: {
      if(state.hasOwnProperty('like')){
        if(state.like.length > 0){
          return {
            ...state,
            like: [...state.like, action.id]
          }
        }else{
          return {
            ...state,
            like: [action.id]
          }
        }
      }else{
        return {
            ...state,
            like: [action.id]
          }
      }

    }

    case DISS_LIKE_SAVE: {
      let datafiltred = state.like.filter((itemdata) => {
        return itemdata !== action.id
      })
      return {
        ...state,
        like: datafiltred
      }
    }

    case LIKE_SAVE_COMMENT: {
      if(state.hasOwnProperty('likeComm')){
        if(state.likeComm.length > 0){
          return {
            ...state,
            likeComm: [...state.likeComm, action.id]
          }
        }else{
          return {
            ...state,
            likeComm: [action.id]
          }
        }
      }else{
        return {
            ...state,
            likeComm: [action.id]
          }
      }

    }

    case DISS_LIKE_SAVE_COMMENT: {
      let datafiltred = state.likeComm.filter((itemdata) => {
        return itemdata !== action.id
      })
      return {
        ...state,
        likeComm: datafiltred
      }
    }

    default:{
      return state
    }
  }

}

export default reducer