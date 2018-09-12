
// BAR CHART CREATION

var height = 400;
var width = 600;
var totalMax = d3.max(refugees.map(function(d) { return d.Total; }))
var buffer = 1000;

var margin = {top: 20, bottom: 100, left: 100, right: 20};
var svg = d3.select("#barchart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g") // add a group to translate everything according to margins
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//yAxis creation
var y = d3.scaleLinear()
  .domain([0, (totalMax + buffer)])  
  .range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
yAxis.tickFormat(d3.formatPrefix(".0", 1e3))
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

//bar creation
svg.selectAll("rect").data(refugees)
  .enter().append("rect")
  .attr("x", function(d,i) { return x(d.Year);}) 
  .attr("y", function(d){ return y(d.Total)})
  .attr("width", 10)
  .attr("height", function(d,i) {return y((totalMax+buffer) - d.Total);})  //subtract the max by d.Total to inverse graph
  .style("fill", "purple");

//TITLE
svg.append("text")
  .attr("x", (width/2))
  .attr("y", (margin.top/2) )
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("font-weight", "bold")
  .text("Refugees Entering U.S. by Year");

//X AXIS
svg.append("text")
   .attr("x", (width/2))
   .attr("y", height + (margin.bottom/2) )
   .attr("text-anchor", "middle")
   .style("font-size", "15px")
   .style("font-weight", "bold")
   .text("Year");
//Y AXIS
svg.append("text")
   .attr("transform","translate(-250, "+ height/2 + ") rotate(-90)")
   .attr("x",  0)
   .attr("y", (height/2) )
   .attr("text-anchor", "middle")
   .style("font-size", "15px")
   .style("font-weight", "bold")
   .text("Total");



//STACKED CHART 



var height = 400;
var width = 600;
var totalMax = d3.max(refugees.map(function(d) { return d.Total; }))
var buffer = 1000;


var margin = {top: 20, bottom: 100, left: 100, right: 20};
var svg = d3.select("#stackedchart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g") // add a group to translate everything according to margins
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//yAxis creation
var y = d3.scaleLinear()
  .domain([0, (totalMax + buffer)]) 
  .range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
      yAxis.tickFormat(d3.formatPrefix(".0", 1e3))
//xAxis creation
var x = d3.scaleLinear()
  .domain([1975, d3.max(refugees.map(function(d) { return d.Year; }))])   
  .range([0, width]);
var xAxis = d3.axisBottom().scale(x);

  

//append svg to stackedchart
var stackedChart = d3.select("#stackedChart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g") // add a group to translate everything according to margins
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//call x and y axis's into the canvas
stackedChart.append("g")
  .attr("transform", "translate(0," + height + ")") // move to bottom
  .call(xAxis);		
stackedChart.append("g")
  .call(yAxis);

//call the text into the canvas
stackedChart.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 + (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("font-weight", "bold")
  .text("Refugees Entering U.S. by Year");
stackedChart.append("text")
  .attr("transform","translate(-250, "+ height/2 + ") rotate(-90)")
  .attr("x",  0)
  .attr("y", (height/2) )
  .attr("text-anchor", "middle")
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .text("Total");
stackedChart.append("text")
  .attr("x", (width / 2))
  .attr("y", height + (margin.bottom / 2) - 10)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Year");

//create the colors for the countries
var colorScheme = d3.scaleOrdinal(d3.schemeCategory10);

//create the stack according to the keys with africa starting at the bottom of the stack
var stack = d3.stack()
  .keys(["Africa", "Asia", "Europe", "Former Soviet Union", "Kosovo", "Latin America\/Caribbean", "Near East\/South Asia"])
  .order(d3.stackOrderNone)
  .offset(d3.stackOffsetNone);

//get the data from refugees in a stack format
var stackData = stack(refugees);
var finishedStack;
	
	finishedStack = stackedChart.selectAll("g.z") //g.z is arbitrary
	.data(stackData)
	.enter().append("g")
  .attr("class", "g.z")
	.style("fill", function(d, i) {return colorScheme(i); } )
	.selectAll("rect")
 	.data(function (d) {
    //console.log(d)
    return d; } )
	.enter().append("rect")
	.attr("x", function(d, i) {return x(refugees[i].Year) }) //append bars to appropriate year
  .attr("y", function(d) {  return height-d[1]/(totalMax/height); } )//divide by totalMax/height to get accurate scaling
	.attr("height", function(d, i) { 
  //console.log(d[1], d[0])
                                  return ((d[1] - d[0])/(totalMax/height));} )
	.attr("width", 10); 




//LINE CHART


var countries = Object.keys(refugees[0]).filter(function(k) { return k != "Year"; });

//console.log(countries[2])


d3.select("#Reg select")
  .selectAll("option").data(countries)
  .enter().append("option")
  .attr("value", function(d) { return d; })
  .text(function(d) { return d; });


var height = 600;
var width = 1100;
var margin = {top: 20, bottom: 100, left: 100, right: 20};

//create line graph
var svg = d3.select("#linechart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
  .call(xAxis); 

//create the valueLine to be referenced and later used in updateLineChart function
var valueLine = d3.line()
  .x(function(d,i){ return x(d.Year)})
  .y(function(d,i) {
      //console.log(d[country])
     return y(d.Africa)}) //instantiate with Africa

  svg.append("path")
  .attr("class", "line")
  .attr("d", valueLine(refugees));
    
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
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .text("Year");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -325)
  .attr("y", (height / 2) - 350)
  .attr("text-anchor", "start")
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .text("Total");


//function to update and transition linechart
function updateLineChart(country)
{
  valueLine = d3.line()
    .x(function(d,i){ return x(d.Year)})
    .y(function(d,i) {
      //console.log(d[country])
     return y(d[country])});
  var transition = d3.select("#linechart").transition();
  transition.select(".line").duration(500)
    .attr("class", "line")
    .attr("d", valueLine(refugees));
}
