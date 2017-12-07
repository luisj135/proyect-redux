import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filter, order } from './actions'

import Select from 'react-select';
import 'react-select/dist/react-select.css';


class Filter extends Component {
  constructor(props){
    super(props)
    this.state = {
      filterAct:0,
      valuesel: '',
      valueOrder: 'all',
      redirect:false,
      filter: [{'path':'all', 'name': 'All post'}, {'path':'lastvoted', 'name': 'Least voted'}, {'path':'morevoted', 'name': 'More voted'}, {'path':'date', 'name': 'Created date'}]
    }
    this.filterSel = this.filterSel.bind(this);
  }

  componentDidMount(){
    if(this.props.hasOwnProperty('defaultfilter')){
      this.setState({
        valuesel: this.props.defaultfilter
      })
    }
  }

  filterSel = (val) =>{
    if(val.hasOwnProperty('value')){
      this.setState({
        valuesel: val.value
      })

      window.location = `/${val.value}`
    }
  }


  orderSel = (val) => {
    this.setState({
      valueOrder: val.value
    });
    this.props.orderby(val.value)
  }

  render() {
    const { categories } = this.props
    let filterop = []

    this.state.filter.map((item, i) => {
      return filterop[i] = { value: item.path, label: item.name}
    })

    let opciones = []
    categories.map((item, i) => {
      return opciones[i] = { value: item.path, label: item.name}
    })
    return (
      <div className="cont-filter">
        <p>Order By:</p>
        <Select
          name="form-field-filter"
          value={this.state.valueOrder}
          options={filterop}
          onChange={this.orderSel}
        />
        <p>Filter:</p>
        <Select
          name="form-field-filter"
          value={this.state.valuesel}
          options={opciones}
          onChange={this.filterSel}
        />
      </div>
    )
  }
}

function mapStateToProps (reducer){
  return {
    filter: reducer.post.filter,
    order: reducer.post.order,
    categories:
      Object.keys(reducer.categories).map(function (key) {
        let objsave = reducer.categories[key]
        let arraycat = []
        Object.keys(objsave).map(function (keyobj) {
          return arraycat[keyobj] = objsave[keyobj]
        },{})
        return arraycat
      },{})
  }
}

function mapDispathToProps (dispatch){
  return {
    filterSelect: (data) => dispatch(filter(data)),
    orderSelect: (data) => dispatch(order(data)),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Filter)
