//charthelpers.js
//M A Chatterjee 2020 Nov
var gColors = ['magenta','olive','plum','red','green','blue','yellow','cyan','brown','orange','purple','pink','grey','lime','tan','wheat'];

//======================================================
//Create a plotlyks line graph
function newPlotlyLineGraph(div_id,dims,layout) { // layout = {title : "accel"}
  var i, data=[];
  for (i=0; i < dims; i++) {
    data.push({x:[],y:[],mode: 'lines', line: {color:gColors[i%16]}});
  }

  //layout["margin"] = "auto";
  //layout["margin"] = 1;
  //layout["padding"] = {t:6,b:6,r:0,l:0};
  layout["displaylogo"]= false;
  layout['modeBarButtonsToRemove'] = ['pan2d','lasso2d'];
  Plotly.plot(div_id, data,layout);  
}
function newPlotlyScatterGraph(div_id,dims,layout) { // layout = {title : "accel"}
  var i, data=[];
  for (i=0; i < dims; i++) {
    data.push({x:[],y:[],mode: 'scatter', line: {color:gColors[i%16]}});
  }
  layout["type"] = 'scatter';
  //layout["margin"] = "auto";
  //layout["margin"] = 1;
  //layout["padding"] = {t:6,b:6,r:0,l:0};
  layout["displaylogo"]= false;
  layout['modeBarButtonsToRemove'] = ['pan2d','lasso2d'];
  Plotly.plot(div_id, data,layout);  
}

//======================================================
// update a plotlyjs line in the graph (note div and dimensions of x must agree with newPlotlyLineGraph)
// x = [d0,d1,d2,...]t = time()
// updatePlotlyLineGraph("mydiv",[2,3,4],time(),[-3,4])
var updatePlotlyLineGraph = function(div_id,x,t,yrange) {
    var a1 = [],b; 
    x = bw.toa(x,"array",x,[x]);
    for (b=0; b<x.length; b++)
        a1.push([t]);
    var update = { // 3 axes on the same time point..
          
      x:  a1,//[[t], [t], [t]],  
      y: x.map(function(a){return [a]}) //[[x[0]],[x[1]],x[2]]
    }
    var olderTime  = t.setSeconds(t.getSeconds()-10); //t.setMinutes(t.getMinutes() - 1);
    var futureTime = t.setSeconds(t.getSeconds()+10); //t.setMinutes(t.getMinutes() + 1);  
    var layoutView = {
          xaxis: {
            type: 'date',
            range: [olderTime,futureTime],
            showticklabels : false
          },
          yaxis : {
             //range : yrange,
             automargin : true
          },
      
          "displaylogo": false,
          'modeBarButtonsToRemove': ['pan2d','lasso2d']
        };
    Plotly.relayout(div_id, layoutView);
    var dx = [];
    for (b=0;b<x.length; b++)
        dx.push(b);
    Plotly.extendTraces(div_id, update, dx)
    //if(++cnt === 100) clearInterval(interval);
  }
  //var cnt = 0;
  //
  //======================================================
  // barchart
  // data = [[label,value,color],[label,value,color],[label,value,color]]
  var newPlotlyBarChart = function (div_id,data,layout) {

    layout = bw.toa(layout,"undefined",{},layout);
    var trace1 = {
        x: data.map(a=>a[0]) , //['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
        y: data.map(a=>a[1]), //[20, 14, 23, 25, 22],
        marker:{
          color: data.map(a=>a[2]) //['rgba(204,23,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,20,1)', 'rgba(204,204,204,1)', 'rgba(204,20,204,1)']
        },
        type: 'bar'
      };
      
      Plotly.newPlot(div_id, [trace1], layout);
      
  }
  
  
  var updatePlotlyBarGraph = function(div_id,data, layout) {
    
    var  layout = bw.toa(layout,"undefined",{},layout);
    var trace1 = {
        x: data.map(a=>a[0]) , //['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
        y: data.map(a=>a[1]), //[20, 14, 23, 25, 22],
        marker:{
          color: data.map(a=>a[2]) //['rgba(204,23,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,20,1)', 'rgba(204,204,204,1)', 'rgba(204,20,204,1)']
        },
        type: 'bar'
      };
      
    Plotly.redraw(div_id, [trace1], layout);
    
  }

//==========
//gauge chart... maybe..
/*

var opts = {
  angle: 0.15, // The span of the gauge arc
  lineWidth: 1, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.035, // The thickness
    color: '#33ab29' // Fill color
  },
  background: '#555',
  limitMax: true,     // If false, max value increases automatically if value > maxValue
  limitMin: true,     // If true, the min value of the gauge will be fixed
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  renderTicks: {
          divisions: 5,
          divWidth: 1.1,
          divLength: 0.7,
          divColor: '#333333',
          subDivisions: 3,
          subLength: 0.5,
          subWidth: 0.6,
          subColor: '#666666'
        },
    
  staticZones: [
   {strokeStyle: "#F03E3E", min: 100, max: 130}, // Red from 100 to 130
   {strokeStyle: "#FFDD00", min: 130, max: 150}, // Yellow
   {strokeStyle: "#30B32D", min: 150, max: 220}, // Green
   {strokeStyle: "#FFDD00", min: 220, max: 260}, // Yellow
   {strokeStyle: "#F03E3E", min: 260, max: 300}  // Red
],
staticLabels: {
  font: "10px sans-serif",  // Specifies font
  labels: [100, 130, 150, 220.1, 260, 300],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
},
};

//var div = document.getElementById('#gauge'); // your canvas element
bw.DOM("#gauge")[0].innerHTML="<canvas style='width:100%;height:100%'></canvas>";
var target = bw.DOM("#gauge")[0].firstChild;
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 3000; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 100; // set animation speed (32 is default value)
gauge.set(1250); // set actual value
*/
