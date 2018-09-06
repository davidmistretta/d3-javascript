var countries = Object.keys(refugees[0]).filter(function(k) { return k != "Year"; });
var d3   = require('d3'),
//console.log(countries[2])


//console.log("Hello there")
d3.select("#Reg select")
    .selectAll("option").data(countries)
    .enter().append("option")
    .attr("value", function(d) { return d; })
    .text(function(d) { return d; });


//console.log(refugees["Year"][0]);
//console.log("My nameisjeff")

var height = 600;
var width = 1100;

var margin = {top: 20, bottom: 100, left: 100, right: 20};
//create line graph

var svg = d3.select("#linechart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")

    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // Add the valueline path.


//yAxis creation
var y = d3.scaleLinear()
  .domain([220000, 0])
  .rangeRound([0, height]);

var yAxis = d3.axisLeft().scale(y);
yAxis.tickFormat(d3.formatPrefix(".0",1e3))
svg.append("g")
  .call(yAxis);

//xAxis creation
var x = d3.scaleLinear()
  .domain([1975, d3.max(refugees.map(function(d) { return d.Year; }))]) // go to maximum value
  .range([0, width]);

var xAxis = d3.axisBottom().scale(x);
svg.append("g")
  .attr("transform", "translate(0," + height + ")") // move to bottom
  .call(xAxis); // draw axis

var valueline = d3.line()
  .x(function(d,i){ return x(d.Year)})
  .y(function(d,i) {
      //console.log(d[country])
     return y(d.Africa)})

  svg.append("path")
      .attr("class", "line")
      .attr("d", valueline(refugees));
    
svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 + (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("font-weight", "bold")
  .text("Refugees Entering U.S. by Year");

svg.append("text")
  .attr("x", (width / 2))
  .attr("y", height + (margin.bottom / 2) - 10)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Year");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -325)
  .attr("y", (height / 2) - 350)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .text("Refugees")

function updateLineChart(country){
 valueline = d3.line()
  .x(function(d,i){ return x(d.Year)})
  .y(function(d,i) {
      //console.log(d[country])
     return y(d[country])});
  var transition = d3.select("#linechart").transition();
  
    transition.select(".line").duration(500)
      .attr("class", "line")
      .attr("d", valueline(refugees));
}
