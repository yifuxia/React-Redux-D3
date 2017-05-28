import React from 'react';
import { connect } from 'react-redux';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  	//const {} = this.props
    return (
            <div>
            </div> 
    );
  }
}
function mapStateToProps(state) {
  return {
  }
}

export default connect(
  mapStateToProps
)(CanvasContainer)