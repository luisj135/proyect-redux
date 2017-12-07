import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './assets/css/component.css'
import './assets/css/app.css'
import './pages/css/pages.css'
import './pages/css/pages-icons.css'
import Formcomponent from './Form'
import Objpost  from './Objpost'
import Filter  from './Filter'
import CategoryFilter  from './CategoryView'
import Error  from './Error'
import { connect } from 'react-redux'
import { initCategories, initPostAsync, user, initComment, addPost, addComment, order, filter } from './actions'
import * as ReadableAPI from './ReadableApi'

var faker = require('faker')
faker.locale = 'en'

const uuid = require('uuid-base62')


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      categoryObj:[],
      user:{},
      contemp:[],
    }
    this.number_rand = this.number_rand.bind(this)
  }
  componentDidMount(){
    let user = {
      id: uuid.v4(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      bio: faker.lorem.sentence(),
      image: faker.image.avatar()
    }

    this.setState({
      user
    });

    this.props.getUserInit(user)
    let arraycat = []
    ReadableAPI.getCategoriesAll().then((categoriesObj) => {
      Object.keys(categoriesObj.categories).map(function (key) {
        return arraycat[key] = categoriesObj.categories[key]
      },{})
      this.props.getAllCategoryInit(arraycat)
    })
         
    this.props.getAllPostInit()
    

    // let useragent = ['Mobile','Android','IOS', 'Chrome', 'Safari', 'Opera', 'Firefox']
    // let maxpost = this.number_rand(1, 2);
    // for (var i = 0; i < maxpost; i++) {
    //   let postId = uuid.v4()
    //   let maxcom = this.number_rand(1, 2)
    //   let comentspost = []
    //   for (var c = 0; c < maxcom; c++) {
    //     let comment = {
    //       id: uuid.v4(),
    //       parentId: postId,
    //       timestamp: Date.now(),
    //       body: faker.lorem.sentence(),
    //       userId: uuid.v4(),
    //       author: faker.name.findName(),
    //       photo: faker.image.avatar(),
    //       voteScore: faker.random.number(),
    //       deleted: false,
    //       parentDeleted: false,
    //     }
    //     arraycoments.push(comment)
    //     comentspost.push(comment)
    //     ReadableAPI.newComment(comment)
    //   }

    //   let post = {
    //     id: postId,
    //     timestamp: Date.now(),
    //     title: faker.lorem.sentence(),
    //     body: faker.lorem.text(),
    //     author: faker.name.findName(),
    //     photo: faker.image.avatar(),
    //     category: arraycat[Math.floor(Math.random()*arraycat.length)].name || 'udacity',
    //     device: useragent[Math.floor(Math.random()*useragent.length)],
    //     voteScore: 1,
    //     deleted: false,
    //     commentCount: comentspost.length
    //   }
    //   ReadableAPI.newPost(post)
    //   this.props.addPost(post)
    // }
    //this.props.getCommentInit(arraycoments)
  }

  onContact = (item) => {
    let itemobj = this.state.contemp
    if(itemobj.length > 0){
      itemobj.push(item)
    }else{
      itemobj = item
    }

    this.setState({
      contemp: itemobj
    });
  }

  number_rand(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  onFilterdata = (datafilter) => {
    this.props.filterBy(datafilter)
  }

  orderby = (dataorder) => {
    this.props.orderBy(dataorder)
  }

  render() {
    const { postObj } = this.props
    return (
      <div>
        <Route exact path='/' render={() => (
          <div className="page-container ">
            <div className="page-content-wrapper ">
              <div className="content ">
                <div className="social-wrapper">
                  <div className="social " data-pages="social">
                    <div className="jumbotron" data-pages="parallax" data-social="cover">
                      <div className="cover-photo">
                        <img alt="Cover" src="assets/img/social/cover.jpg" />
                      </div>
                      <div className=" container-fluid   container-fixed-lg sm-p-l-0 sm-p-r-0">
                        <div className="inner">
                          <div className="pull-bottom bottom-left m-b-40 sm-p-l-15">
                            <h5 className="text-white no-margin">Welcome to</h5>
                            <h1 className="text-white no-margin"><span className="semi-bold">social</span> Prodigious</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" container-fluid   container-fixed-lg sm-p-l-0 sm-p-r-0">
                      <Formcomponent />
                      <Filter filterSelect={this.onFilterdata} orderby={this.orderby}/>
                      <Objpost obj={postObj.entities} user={this.state.user}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" container-fluid  container-fixed-lg footer">
                <div className="copyright sm-text-center">
                  <p className="small no-margin pull-left sm-pull-reset">
                    <span className="hint-text">LuisJhoham © 2017 </span>
                    <span className="font-montserrat">FACTOLABS</span>.
                    <span className="hint-text">All rights reserved. </span>
                  </p>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
          </div>
        )}/>

        <Route exact path='/:categoryPath' render={(props) => (
          <CategoryFilter filterSelect={this.onFilterdata} orderby={this.orderby} user={this.state.user} {...props}/>
        )}/>
        <Route exact path='/:categoryPath/:postPath' render={(props) => (
          <CategoryFilter filterSelect={this.onFilterdata} orderby={this.orderby} user={this.state.user} {...props}/>
        )}/>
        <Route exact path='/404' component={Error} />
      </div>
    );
  }
}

function mapStateToProps (reducer){
  return {
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
    },
    user: reducer.user,
    comment: Object.keys(reducer.comments).map(function (keyobj) {
          return reducer.comments[keyobj]
        },{})
  }
}

function mapDispathToProps (dispatch){
  return {
    getAllCategoryInit: (data) => dispatch(initCategories(data)),
    getAllPostInit: (data) => dispatch(initPostAsync(data)),
    getUserInit: (data) => dispatch(user(data)),
    getCommentInit: (data) => dispatch(initComment(data)),
    addPost: (data) => dispatch(addPost(data)),
    addComent: (data) => dispatch(addComment(data)),
    filterBy: (data) => dispatch(filter(data)),
    orderBy: (data) => dispatch(order(data)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(App)
