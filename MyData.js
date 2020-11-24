d3.select('body')
  // .append('svg').attr('width', 400).attr('height', 400).attr('id', 'chart')
let zoom = d3.zoom().on("zoom", zoomed); 
let svg = d3.select('#chart').append('g').attr('transform', 'translate(50, 30)').call(zoom).on("dblclick.zoom", null);
let yScale = d3.scaleLinear()
    .domain([0, 50])
    .range([100, 0])
    //.call(zoom)
    //.on("dblclick.zoom", null);

  // <svg id="chart" width=400 height=400>
d3.csv("./MyData.csv").then( (mydata) => {
    console.log(mydata)
    /* let xScale = d3.scaleBand()
        .domain(forage.map(d => d.kind)) // in coordinates of the data
        .range([10, 10 + forage.length*20]) // in pixels
        .round(true) */

    let legend = {'Tue 27th': '#333399', 'Wed 28th': '#aa6633', 'Th 29th': '#333399', 'Fri 30th ': '#aa6633', 'Sat 31st': '#333399', 'Sun 1st': '#aa6633', 'Mon 2nd': '#333399', 'Tue 3rd': '#aa6633'}
    // display a color legend (-> html?)
    /* sel.selectAll('text') // grabs the first two tick labels :(
       .data(['water', 'brush'])
       .text(d => d)
       .attr('x', 200)
       .attr('y', (d,i) => -40 - i*10)
       .style('fill', d => legend[d]) */

    // the actual bar chart
    let g = svg.append('g')
      .selectAll('rect')
      .data(mydata)
      .enter()
          .append('rect')
          .attr('x', d => 10 + 30*d.id)
          .attr('y', d => yScale(d.PhoneChecked)) // 100 - d[1]
          .attr('width', 15)
          .attr('height', d => 2*d.PhoneChecked)
          .style('fill', d => { return legend[d.Week] })
          .call(zoom)
          .on("dblclick.zoom", null);


    let xLabels = svg.append('g')
       .selectAll('text')
       .data(mydata)


    xLabels
       .enter()
            .append('text')
            .attr('transform', d => `translate(${10 + 30*d.id}, 115)`) // , rotate(-30)
            .attr('x', 0)
            .attr('y', 0)
            .text(d => { return {'Tue 27th': 'Tu', 'Wed 28th': 'We', 'Th 29th' : 'Th', 'Fri 30th' : 'Fr', 'Sat 31st' : 'Sa', 'Sun 1st' : 'Su', 'Mon 2nd' : 'Mo', 'Tue 3rd' : 'Tu'}[d.Week] } )
})




svg.append('g')
//    .attr('transform', 'translate(10, 100)')
   .call(d3.axisLeft(yScale).ticks(5))
svg.append('text')
   .attr('transform', 'translate(-30, 50) rotate(270)')
      .text('Phone checked')
      .style("text-anchor", "middle")

function zoomed() {
    g.attr("transform", d3.event.transform);
}






  // <text x="10" y="10">hello world</text>

