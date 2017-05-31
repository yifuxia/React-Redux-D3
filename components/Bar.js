import React from 'react';

let all_data = {
  'sample_data': [
    {name: 'A', count: 10},
    {name: 'B', count: 15},
    {name: 'C', count: 20},
    {name: 'D', count: 4},
    {name: 'E', count: 23},
    {name: 'F', count: 43},
    {name: 'G', count: 21}
  ],
'sample_data_2' : [
  {name: 'A', count: 30},
  {name: 'B', count: 15},
  {name: 'D', count: 14},
  {name: 'X', count: 143},
  {name: 'Y', count: 13}
]
}


let CANVAS_ID = 'bar_chart',
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
var x = d3.scaleBand()
    .padding(.3)
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
export default class Bar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {bar_data} = this.props
    console.log(bar_data);
    let data = all_data[bar_data]
    //Rescaling
    y.domain([0, d3.max(data, function(d) { return d.count; })]);
    x.domain(data.map(d => d.name))

    // JOIN new data with old elements
    let bars = g.selectAll('.bar')
                .data(data)
    // EXIT old elements not present in new data.
    bars.exit()
        .attr("class","exit")
        .transition()
        .duration(500)
        .style('fill','skyblue')
        .attr('width',0)
        .remove()
    // UPDATE old elements present in new data.
    bars.attr('class','update bar')
    .transition().duration(1000)
    .delay(function(d, i) {
          return i / data.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
    })
    .attr("x", function(d){ return x(d.name)})
    .attr("y", function(d) { return y(d.count); })
    .attr("height", function(d) { return 300 - y(d.count); })
    .attr("width", x.bandwidth())

    // ENTER new elements present in new data.
    bars.enter()
    .append('rect')
    .attr('class', 'bar')
    .style('fill', 'grey')   
    .transition().duration(1000)
    .on("start", function() {  
          d3.select(this)  
            .attr("fill", "pink")
        })
    .delay(function(d, i) {
        return i / data.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
    })
    .attr("x", function(d){ return x(d.name)})
    .attr("y", function(d) { return y(d.count); })
    .attr("height", function(d) { return 300 - y(d.count); })
    .attr("width", x.bandwidth())
    .on("end", function() {  
          d3.select(this)  
            .attr("fill", "black")  
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

    g.selectAll('.bar')
    .on('mouseover',function(d){
      tooltip.style("display", null)
      var xPosition = x(d.name) + 200;
      var yPosition = y(d.count) + 100;
      tooltip.attr("transform", "translate(" + xPosition+ "," + yPosition + ")");
      tooltip.select("text").text(d.count);
      tooltip.select("text").attr('x', x.bandwidth()/2)
      tooltip.select('rect').attr('width', x.bandwidth())
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
