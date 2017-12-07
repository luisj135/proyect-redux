import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './assets/css/component.css'
import './assets/css/app.css'
import './pages/css/pages.css'
import './pages/css/pages-icons.css'
import Formcomponent from './Form'
import Objpost  from './Objpost'
import Filter  from './Filter'
import { connect } from 'react-redux'
import { order, filter } from './actions'

var faker = require('faker')
faker.locale = 'en'


class CategoryView extends Component {
  constructor(props){
    super(props)
    this.state = {
      categoryObj:[],
      user:{},
      postfilter:[],
      imageheader: '',
      redirect: false,
      render: true
    }
  }

  componentDidMount(){
    let datafilter = this.props.postObj.entities.filter((item) => {
      return item.category === this.props.match.params.categoryPath
    })

    if(datafilter.length === 0 && this.props.postObj.entities.length > 0){
      this.setState({
        redirect: true
      });
    }

    this.setState({
      postfilter: datafilter
    });

    this.setState({
      imageheader: faker.image.image()
    })

    if (this.props.match.params.postPath){
      this.setState({
        idpostDef: this.props.match.params.postPath
      });

    }

    if(this.props.match.params.categoryPath === '404'){
      this.setState({
        render:false
      })
    }
  }

  componentWillReceiveProps(next_props) {
    if(next_props.postObj.entities !== this.props.postObj.entities) {
      let datafilter = next_props.postObj.entities.filter((item) => {
        return item.category === this.props.match.params.categoryPath
      })

      if(datafilter.length === 0 && next_props.postObj.entities.length > 0){
        this.setState({
          redirect: true
        });
      }
      this.setState({
        postfilter: datafilter
      });

      if (this.props.match.params.postPath){
        this.setState({
          idpostDef: this.props.match.params.postPath
        });

        let filterpost = next_props.postObj.entities.filter((item) => {
          return  item.id === this.props.match.params.postPath
        })
        if(filterpost.length === 0 && next_props.postObj.entities.length > 0){
          this.setState({
            redirect: true
          })
          this.setState({
            render:false
          })
        }
      }

      if(this.props.match.params.categoryPath === '404'){
        this.setState({
          render:false
        })
      }
    }
  }

  orderby = (dataorder) => {
    console.log(dataorder)
    this.props.orderBy(dataorder)
  }

  render() {
    if (!this.state.render && this.state.redirect ){
      return <Redirect to='/404'/>;
    }

    if (!this.state.render){
      return null;
    }

    if (this.state.redirect ){
      return <Redirect to='/404'/>;
    }
    return (
      <div>
        <div className="page-container ">
          <div className="page-content-wrapper ">
            <div className="content ">
              <div className="social-wrapper">
                <div className="social " data-pages="social">
                  <div className="jumbotron" data-pages="parallax" data-social="cover">
                    <div className="cover-photo">
                      <img alt="Cover" src={this.state.imageheader} />
                    </div>
                    <div className=" container-fluid   container-fixed-lg sm-p-l-0 sm-p-r-0">
                      <div className="inner">
                        <div className="pull-bottom bottom-left m-b-40 sm-p-l-15">
                          <h5 className="text-white no-margin">Welcome to</h5>
                          <h1 className="text-white no-margin"><span className="semi-bold">social</span> Prodigious / <span className="semi-bold">{this.props.match.params.categoryPath}</span></h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" container-fluid   container-fixed-lg sm-p-l-0 sm-p-r-0">
                    <Formcomponent defaultfilter={this.props.match.params.categoryPath} />
                    <Filter filterSelect={this.onFilterdata} orderby={this.orderby} defaultfilter={this.props.match.params.categoryPath}/>
                    <Objpost obj={this.state.postfilter} user={this.state.user} defaultpost={this.props.match.params.postPath}/>
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
    filterBy: (data) => dispatch(filter(data)),
    orderBy: (data) => dispatch(order(data)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(CategoryView)
