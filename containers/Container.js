import React from 'react';
import { connect } from 'react-redux';
import Bar from '../components/Bar'
import Scatterplot from '../components/Scatterplot'
import {change_bar_chart, change_scatterplot} from '../actions'
class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  	const {bar_data, scatter_data} = this.props
    return (
            <div>
              <div style={{textAlign:'center',position:'fixed',left:'5vw',top:'30vh'}}>
                <h3>Bar chart</h3>
                <p onClick = {() => this.props.change_bar_chart()}>change data</p>
                <h3>Scatter plot</h3>
                <p id="scatter_plot_btn" onClick = {() => this.props.change_scatterplot()}>change data</p>
              </div>
              <Bar bar_data={bar_data}/>
              <Scatterplot scatter_data={scatter_data}/>
            </div> 
    )
  }
}

function mapStateToProps(state) {
  return {
    bar_data: state.bar_data,
    scatter_data: state.scatter_data
  }
}

export default connect(
  mapStateToProps,
  {change_bar_chart, change_scatterplot}
)(Container)