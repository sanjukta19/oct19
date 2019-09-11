<script src="https://d3js.org/d3.v4.min.js"></script>





<script>
  

function getTextWidth(text, fontSize, fontName) 

  {
          c = document.createElement("canvas");
            
             ctx = c.getContext("2d");
            
             ctx.font = fontSize + ' ' + fontName;
            
             return ctx.measureText(text).width;
        
  }

        

function DataSegregator(array, on) 
  {
          var SegData;
            
             OrdinalPositionHolder = {
                
             valueOf: function () {
                    
             thisObject = this;
                    
             keys = Object.keys(thisObject);
                    
             keys.splice(keys.indexOf("valueOf"), 1);
                                
             keys.splice(keys.indexOf("keys"), 1);
                                 
             return keys.length == 0 ? -1 : d3.max(keys, function (d) { return thisObject[d] })
                }
                
             , keys: function () {
                    
                     keys = Object.keys(thisObject);
                    
                     keys.splice(keys.indexOf("valueOf"), 1);
                    
                     keys.splice(keys.indexOf("keys"), 1);
                    
                     return keys;
                 
                                 }
            }
            
             array[0].map(function (d) { return d[on] }).forEach(function (b) {
                
             value = OrdinalPositionHolder.valueOf();
                
             OrdinalPositionHolder[b] = OrdinalPositionHolder > -1 ? ++value : 0;
            })

            

             SegData = OrdinalPositionHolder.keys().map(function () {
                return [];
            });

            
                     array.forEach(function (d) {
                
                     d.forEach(function (b) {
                    
                     SegData[OrdinalPositionHolder[b[on]]].push(b);
                })
            });

            
                     return SegData;
        }


   
     
  Data = [
{ Date: "British (35)", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 389 }, { Name: "Category3", Value: 567 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },
       
{ Date: "Gulf (25)", Categories: [{ Name: "Category1", Value: 521 }, { Name: "Category2", Value: 123 }, { Name: "Category3", Value: 653 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },

      { Date: "EasyJet (36)", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 236 }, { Name: "Category3", Value: 537 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },
      
{ Date: "Indigo (45)", Categories: [{ Name: "Category1", Value: 423 }, { Name: "Category2", Value: 330 }, { Name: "Category3", Value: 689 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 70 }] },
{ Date: "AirAsia (54)", Categories: [{ Name: "Category1", Value: 601 }, { Name: "Category2", Value: 423 }, { Name: "Category3", Value: 490 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 70 }] },
{ Date: "Kuwait (34)", Categories: [{ Name: "Category1", Value: 412 }, { Name: "Category2", Value: 461 }, { Name: "Category3", Value: 321 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 70 }] }
        ]

      


           var margin = { top: 20, right: 30, bottom: 60, left: 40 },
                   width = 960 - margin.left - margin.right,
            
                height = 500 - margin.top - margin.bottom;

        

           var textWidthHolder = 0;
        

/// Adding Date in LineCategory
        
          Data.forEach(function (d) {
            
          d.LineCategory.forEach(function (b) {
                
          b.Date = d.Date;
            })
        });




        
          var Categories = new Array();
        

// Extension method declaration

        

         Categories.pro

        
               var Data;
        
               var ageNames;
        
               var x0 = d3.scaleBand()
               .rangeRound([0, width]).padding(0.1);
        
               var XLine = d3.scaleBand()
               .rangeRound([0, width]).padding(0.1);
        
               var x1 = d3.scaleBand();

 
       
               var y = d3.scaleLinear()
               .rangeRound([height, 0]);

        
               var YLine = d3.scaleLinear()
               .rangeRound([height, 0])
        
               .domain([0, d3.max(Data, function (d) { return d3.max(d.LineCategory, function (b) { return b.Value }) })]);

       

          var color = d3.scaleOrdinal().range(["#5ee08e", "#000000", "#e33500", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        
          var line = d3.line().x(function (d) {
            return x0(d.Date) + x0.bandwidth() / 2;
        }).y(function (d) { return YLine(d.Value) });




        
     
          var xAxis = d3.axisBottom(x0);

        
          var yAxis = d3.axisLeft(y);

        
          var YLeftAxis = d3.axisRight(YLine);

        

// var YLeftAxis = d3.svg.axis().scale(YLine).orient("right").tickFormat(d3.format(".2s"));

   

    

         var svg = d3.select("body").append("svg")
            
            .attr("width", width + margin.left + margin.right)
            
            .attr("height", height + margin.top + margin.bottom)
            
            .append("g")
            
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        

// Bar Data categories
        
   
        Data.forEach(function (d) {
            
             d.Categories.forEach(function (b) {
                
             if (Categories.findIndex(function (c) { 
             return c.Name===b.Name}) == -1) {
                    
             b.Type = "bar";
                    
            console.log(JSON.stringify(b))
                    
            Categories.push(b)
                }
            })
        });


  
      


// Line Data categories
        
          Data.forEach(function (d) {
            
             d.LineCategory.forEach(function (b) {
                
             if (Categories.findIndex(function (c) { 
                 return c.Name === b.Name }) == -1) {
                    
                 b.Type = "line";
                    
                 console.log(JSON.stringify(b))
                    
                 Categories.push(b)
                }
            })
        });

 
       

// Processing Line data
        
           lineData = DataSegregator(Data.map(function (d) { 
             return d.LineCategory }), "Name");

        

// Line Coloring
        
          LineColor = d3.scaleOrdinal();
       
          LineColor.domain(Categories.filter(function (d) { 
          return d.Type == "line" }).map(function (d) { 
          return d.Name }));
        

          LineColor.range(["#d40606", "#06bf00", "#2bed92", "#671919", "#0b172b"]);

  
     
          x0.domain(Data.map(function (d) { return d.Date; }));


        
          XLine.domain(Data.map(function (d) { return d.Date; }));
        
          
          x1.domain(Categories.filter(function (d) 
         { return d.Type == "bar" }).map(function (d) { return d.Name})).rangeRound([0, x0.bandwidth()]);

        
//Error
        
     // x1.domain(Categories.filter(function (d) { return d.Type == "bar" }).map(function (d) { return d.Name})).rangeRoundBands([0, x0.rangeBand()]);
        

//Fail
        
//x1.domain(Categories).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(Data, function (d) { return d3.max(d.Categories, function (d) { return d.Value; }); })]);

        

   svg.append("g")
            
      .attr("class", "x axis")
            
      .attr("transform", "translate(0," + height + ")")
                 
      .call(xAxis)
      .selectAll("text")	
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-90)");       

   svg.append("g")
 
     .attr("class", "y axis")
            
     .attr("transform", "translate(" + (width) + ",0)")
           
     .call(YLeftAxis)


         
  
  svg.append("text")
           
     .attr("transform", "rotate(-90)")
           
     .attr("y", -10)
           
     .attr("dy", width)
           
     .style("text-anchor", "end")
           
     .text("Percent");

        
  
  svg.append("g")
            
    .attr("class", "y axis")
            
    .call(yAxis)

   
       
  svg.append("text")

    .attr("transform", "rotate(-90)")
            
    .attr("y", 6)
            
    .attr("dy", ".71em")
            
    .style("text-anchor", "end")
            
    .text("Population");


        

var state = svg.selectAll(".state")
            
   .data(Data)
            
   .enter().append("g")
            
   .attr("class", "state")
            
   .attr("transform", function (d) { return "translate(" + x0(d.Date) + ",0)"; });



             

   state.selectAll("rect")
                    
   .data(function (d) { return d.Categories; })
                    
   .enter().append("rect")
                    
   .attr("width", x1.bandwidth())
                    
   .attr("x", function (d) { return x1(d.Name); })
                    
   .attr("y", function (d) { return y(d.Value); })
                    
   .attr("fill", function (d) { return color(d.Name); })
                

//.attr("height", function (d)  { return height - y(d.Value); })
  .transition().delay(500).attrTween("height", function (d) {
                

   var i = d3.interpolate(0, height - y(d.Value));
                
   return function (t)
                {
                    return i(t);
                }
            });

        
   var linesD = svg.selectAll(".lines")
        
       .data(lineData)
        
       .enter().append("g")
        
       .attr("class", "line")


        
  
       linesD.each(function (d) {
            
               Name=d[0].Name

            
               d3.select(this).append("path")
              
                              .attr("d", function (b) { return line(b) })
              
			      .attr('stroke', LineColor(Name))
              
                              .attr('stroke-width', 2)
 
                              .attr("stroke-dasharray", 15)
             
                              .attr('fill', 'none ')
              
                              .transition().duration(1500);

              
        
                               });

        

// Legends

        

       var LegendHolder = svg.append("g").attr("class", "legendHolder");
        
       var legend = LegendHolder.selectAll(".legend")
            
          .data(Categories.map(function (d) { return {"Name":d.Name,"Type":d.Type}}))
            
          .enter().append("g")
            
          .attr("class", "legend")
            
          .attr("transform", function (d, i) { return "translate(0," +( height+ margin.bottom/2 )+ ")"; })
            
          .each(function (d,i) {
                

//  Legend Symbols


                
        d3.select(this).append("rect")
                
          .attr("width", function () { return 18 })
                
          .attr("x", function (b) {

 left = (i+1) * 15 + i * 18 + i * 5 + textWidthHolder;
                    return left;
                })
                    .attr("y", function (b) { return b.Type == 'bar'?0:7})
                
          .attr("height", function (b) { return b.Type== 'bar'? 18:5 })
                
          .attr("fill", function (b) { return b.Type == 'bar' ? color(d.Name) : LineColor(d.Name) });

                

//  Legend Text

               
       d3.select(this).append("text")
                
         .attr("x", function (b) {

 
               left = (i+1) * 15 + (i+1) * 18 + (i + 1) * 5 + textWidthHolder;

                    
               return left;
                })
          
         .attr("y", 9)
                
         .attr("dy", ".35em")
                
         .style("text-anchor", "start")
                
         .text(d.Name);

                

         textWidthHolder += getTextWidth(d.Name, "10px", "calibri");
            });


        

// Legend Placing

        

       d3.select(".legendHolder")
         .attr("transform", function (d) {
            
         thisWidth = d3.select(this).node().getBBox().width;
            
         return "translate(" + ((width) / 2 - thisWidth / 2) + ",0)";
        })


  
</script>
