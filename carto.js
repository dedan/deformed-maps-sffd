var margin = {top: 50, right: 30, bottom: 30, left: 40},
  height = 600 - margin.top -  margin.bottom,
    width = 900- margin.right - margin.left;

var projection = d3.geo.mercator()
    .center([-122.4, 37.775])
    .scale(200000)
    .rotate([0,0]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height+margin.bottom + margin.top);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(1.5);

var g = svg.append("g")

var color = d3.scale.category20b();

// Load and display SF outline
d3.json("sf_geo.json", function(error, data) {
svg.append("g")
      .attr("class", "SF")
    .selectAll("path")
      .data(topojson.feature(data, data.objects.bayarea).features)
    .enter().append("path")
      .attr("class", function(d){ return d.id.replace(/ /g, "_")})
      .attr("d", path)
});

var carto = d3.cartogram()
 .projection(projection)
 .value(function(d) {
   return Math.random() * 100;
 });

// Load and display streets
d3.json("SF_Streets_topo.json", function(error, Streets) {
  svg.append("g")
      .attr("class", "SF_Streets")
    .selectAll("path")
      .data(topojson.feature(Streets, Streets.objects.SF_Streets).features)
    .enter().append("path")
      .style("stroke", function(d){ return color(d.properties.street)})
      .style("stroke-width", "0.3")
      .attr("d", path)
});

// Load and display tracts
d3.json("sf_geo.json", function(error, tracts) {
  svg.append("g")
      .attr("class", "tract")
    .selectAll("path")
      .data(carto(tracts, tracts.objects.tracts.geometries).features)
    .enter().append("path")
      // .style("stroke", function(d){ return color(d.properties.street)})
      // .style("stroke-width", "0.3")
      .attr("d", carto.path)
});
