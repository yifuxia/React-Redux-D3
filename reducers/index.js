import { combineReducers } from 'redux'

const bar_data = (state='sample_data', action) => {
	switch (action.type) {
    case 'BAR_DATA_CHANGED':
      if (state === 'sample_data'){
        return 'sample_data_2'
      }else{
        return 'sample_data'
      }
    default:
      return state
  }
}
var numValues = 12;  // Get original dataset's length
var maxRange = Math.random() * 1000;  // Get max range of new values
let dataset = [];  // Initialize empty array
for(var i=0; i<numValues; i++) {
    var newNumber1 = Math.floor(Math.random() * maxRange);  // Random int for x
    var newNumber2 = Math.floor(Math.random() * maxRange);  // Random int for y
    dataset.push([newNumber1, newNumber2]);  // Add new numbers to array
}
const scatter_data = (state=dataset, action) => {
  switch (action.type) {
    case 'SCATTER_DATA_CHANGED':
      var numValues = Math.floor(12 + Math.random()*10);  // Get original dataset's length
      var maxRange = Math.random() * 1000;  // Get max range of new values
      dataset = [];  // Initialize empty array
      for(var i=0; i<numValues; i++) {
          var newNumber1 = Math.floor(Math.random() * maxRange);  // Random int for x
          var newNumber2 = Math.floor(Math.random() * maxRange);  // Random int for y
          dataset.push([newNumber1, newNumber2]);  // Add new numbers to array
      }
      return dataset
    default:
      return state
  }
}



export default combineReducers({
bar_data,
scatter_data
})