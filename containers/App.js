import React from 'react';
import Container from './Container'

class App extends React.Component {
	render(){
		return (
			<div id="app">
				<div style={{textAlign:'center'}}>
					<h3>A react+redux+d3 template</h3>
				</div>
				<Container></Container>
			</div>
		)
	}
}
export default App