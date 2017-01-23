var margin={top:40, bottom:100, left:350, right:90},
    width=1200-margin.left-margin.right,
    height=700-margin.top-margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0,width],1);
var	y = d3.scale.linear().range([height, 0]);
var color = d3.scale.ordinal().range(["blue","gray","red"]);
 var	xAxis = d3.svg.axis().scale(x)
 	.orient("bottom");

var	yAxis = d3.svg.axis().scale(y)
	.orient("left");
  
  d3.json("output_json/parse2.json", function(error, data) {
  data.forEach(function(d) {
    d.country = d.countryName;
    d.Fat = d.FatConsumption;
    d.Protien = d.ProteinConsumption;
    d.carbohydrates = d.CarbohydrateConsumption;
  });

var	valueline = d3.svg.line()
	.x(function(d) { return x(d.country); })
	.y(function(d) { return y(d.Fat); });

var	valueline2 = d3.svg.line()
	.x(function(d) { return x(d.country); })
	.y(function(d) { return y(d.Protien); });

  var	valueline3 = d3.svg.line()
  	.x(function(d) { return x(d.country); })
  	.y(function(d) { return y(d.carbohydrates); });

    // Define the div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

var	svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xData=["Fat","Protien","carbohydrates"];

  x.domain(data.map(function(d){
      return d.country;
  }));
	
	y.domain([0, d3.max(data, function(d) { return Math.max(d.Fat, d.Protien,d.carbohydrates+200000); })]);

	svg.append("path")		
		.attr("class", "line")
    .style("stroke", color(0))
		.attr("d", valueline(data));


	svg.append("path")		
		.attr("class", "line")
		.style("stroke", color(1))  
		.attr("d", valueline2(data));

    svg.append("path")		
      .attr("class", "line")
      .style("stroke", color(2))  
      .attr("d", valueline3(data));


svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
       .attr("transform", "translate(" + width + ",0)")
       .attr("dy","1.3em")
       .attr("dx","1.2em")
       .style("font-size","15px")
       .style("font-weight","bold")
       .style("color","red")
       .text("Regions");

	

		svg.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
       .attr("transform", "rotate(-90)")
       .attr("dy","-7em")
       .style("text-anchor", "end")
       .style("font-size","15px")
       .style("font-weight","bold")
       .text("Quantity");


       svg.selectAll("dot") 
        .data(data)     
    .enter().append("circle")               
        .attr("r", 5)   
        .attr("cx", function(d) { return x(d.country); })     
        .attr("cy", function(d) { return y(d.Fat); })   
        .on("mouseover", function(d) {   
        d3.select(this).style({opacity:'0.2'}) 
            div.transition()    
                .duration(200)    
                .style("opacity", .9);  
            div .html(d.country + "<br/>"  + d["Fat"])  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY) + "px");  
            })          
        .on("mouseout", function(d) {  
        d3.select(this).style({opacity:'1'}) 
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });

        svg.selectAll("dot") 
        .data(data)     
    .enter().append("circle")               
        .attr("r", 5)   
        .attr("cx", function(d) { return x(d.country); })     
        .attr("cy", function(d) { return y(d.Protien); })   
        .on("mouseover", function(d) {    
          d3.select(this).style({opacity:'0.2'})
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
            div .html(d.country + "<br/>"  + d["Protien"])  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY) + "px");  

            })          
        .on("mouseout", function(d) { 
        d3.select(this).style({opacity:'1'})  
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });

        svg.selectAll("dot") 
        .data(data)     
    .enter().append("circle")               
        .attr("r", 5)   
        .attr("cx", function(d) { return x(d.country); })     
        .attr("cy", function(d) { return y(d.carbohydrates); })   
        .on("mouseover", function(d) { 
        d3.select(this).style({opacity:'0.2'})   
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
            div .html(d.country + "<br/>"  + d["carbohydrates"])  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY) + "px");  
            })          
        .on("mouseout", function(d) {   
          d3.select(this).style({opacity:'1'})
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });
        

       var legend = svg.selectAll(".legend")
         .data(color.domain().slice())
       .enter().append("g")
         .attr("class", "legend")
         .attr("transform", function(d, i) { return "translate(0," + i * 20 +")"; });


     legend.append("rect")
         .attr("x", width - 18)
         .attr("width", 18)
         .attr("height", 18)
         .style("fill", color);

     legend.append("text")
         .attr("x", width - 24)
         .attr("y", 9)
         .attr("dy", ".35em")
         .style("text-anchor", "end")
         .text(function(d,i) { return xData[i]; });

       
});