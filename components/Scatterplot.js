import React from 'react';

let CANVAS_ID = 'scatterplot_chart',
    CANVAS_WIDTH = '80vw',
    VIEW_BOX = '0 0 1000 500',
    MARGIN = {top: 100, right: 200, bottom: 100, left: 200}
//Initialize responsive canvas for the bar chart
let svg = d3.select("body").append("svg").attr("id",CANVAS_ID)
          .attr("viewBox", VIEW_BOX)
          .attr('preserveAspectRatio',"xMidYMid meet")
          .attr('width',CANVAS_WIDTH)
          .style('margin-left','10vw')
//Initialize chart position
let g = svg.append("g")
        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");
//Scales
var x = d3.scaleLinear()
    .rangeRound([0, 600]);
var y = d3.scaleLinear()
    .rangeRound([300, 0]);

//Axises
svg.append('g')
    .attr('transform', 'translate(200, 400)')
    .attr('class', 'x axis')
svg.append('g')
    .attr('transform', 'translate(200, 100)')
    .attr('class', 'y axis')
export default class Scatterplot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {scatter_data} = this.props
    console.log(scatter_data);
    let data = scatter_data
    //Rescaling
    x.domain([d3.min(data, d =>d[0]), d3.max(data, d =>d[0])]);
    y.domain([d3.min(data, d =>d[1]), d3.max(data, d =>d[1])]);

    // JOIN new data with old elements
    let points = g.selectAll('.point')
                .data(data)
    // EXIT old elements not present in new data.
    points.exit()
        .attr("class","exit")
        .transition()
        .duration(500)
        .style('fill','skyblue')
        .attr('width',0)
        .remove()
    // UPDATE old elements present in new data.
    points.attr('class','update point')
    .transition().duration(1000)
    .on("start", function() {  
          d3.select(this)  
          .attr("fill", "red")
          .attr('r',6)
      })
    .delay(function(d, i) {
          return i / data.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
    })
    .attr("cx", function(d){ return x(d[0])})
    .attr("cy", function(d) { return y(d[1]); })
    .attr("r", 3)
    .on("end", function() {  
        d3.select(this)  
        .attr("fill", "black") 
        .attr('r',3) 
     })

    // ENTER new elements present in new data.
    points.enter()
    .append('circle')
    .attr('class', 'point') 
    .transition().duration(1000)
    .on("start", function() {  
          d3.select(this)  
          .attr("fill", "red")
          .attr('r',6)
      })
    .delay(function(d, i) {
          return i / data.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
    })
    .attr("cx", function(d){ return x(d[0])})
    .attr("cy", function(d) { return y(d[1]); })
    .attr("r", 3)
    .on("end", function() {  
        d3.select(this)  
        .attr("fill", "black") 
        .attr('r',3) 
     })
    

    //Update axises
    let xAxis = d3.axisBottom(x)
    svg.select('.x.axis').transition().call(xAxis)

    let yAxis = d3.axisLeft(y)
    svg.select('.y.axis').transition().call(yAxis)

    //Tooltips
    var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
    tooltip.append("rect")
      .attr("height", 20)
      .attr("fill", "white")
      .style("opacity", 0.5);

    tooltip.append("text")
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    g.selectAll('.point')
    .on('mouseover',function(d){
      tooltip.style("display", null)
      var xPosition = x(d[0]) + 200;
      var yPosition = y(d[1]) + 100;
      tooltip.attr("transform", "translate(" + xPosition+ "," + yPosition + ")");
      tooltip.select("text").text(d.count);
     })
     .on('mouseout',function(d){
        tooltip.style("display", "none");
     });

    
    return (
            <div>
              
            </div> 
    );
  }
}
