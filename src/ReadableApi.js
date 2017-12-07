
const api = "http://localhost:3000"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategoriesAll = async () =>{

  const response = await fetch(`${api}/categories`, { headers })
  const json = await response.json();
  return json;
}

export const getPostbyCategory = (catId) =>
  fetch(`${api}/categories/${catId}/post`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPostAll = async () => {
  const response = await fetch(`${api}/posts`, { headers })
  const json = await response.json()
  return json;
}

export const getPostbyId = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.post)

export const newPost = async (shelf) =>{
  const response = await fetch(`${api}/posts/`, { method: 'POST', headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shelf)
  })
  const json = await response.json()
  return json;
}

export const updatePost = (postId, title, body) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title:title, body:body})
  }).then(res => res.json())

export const votePost = (postId, shelf) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body:shelf})
  }).then(res => res.json())

export const deletePost = async (idpost) =>{
  const response = await fetch(`${api}/posts/${idpost}`, { method: 'DELETE', headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json;
}

export const getCommentbyPostId = async (postId) => {
  const response = await fetch(`${api}/posts/${postId}/comments`, { headers })
  const json = await response.json();
  return json;
}


export const newComment = async (shelf) =>{
  const response = await fetch(`${api}/comments`, { method: 'POST', headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shelf)
  })
  const json = await response.json()
  return json;
}

export const getCommentbyId = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data.comment)


export const updateComment = (commentId,body) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body:body})
  }).then(res => res.json())

export const voteComment = (commentId, shelf) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body:shelf })
  }).then(res => res.json())

export const deleteComment = async (idcomment) =>{
  const response = await fetch(`${api}/comments/${idcomment}`, { method: 'DELETE', headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json;
}
