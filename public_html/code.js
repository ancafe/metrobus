
// Aux functions
var getCoordinatesByName = name => coordinates[stopsnames.indexOf(name)]

var createElement= (n, v) => {
        n = document.createElementNS("http://www.w3.org/2000/svg", n);
        for (var p in v)
                n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), v[p]);
        return n
}

var overlaps = (a, b) =>  {
        const rect1 = a.getBoundingClientRect();
        const rect2 = b.getBoundingClientRect();
        const isInHoriztonalBounds =
          rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
        const isInVerticalBounds =
          rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
        return isOverlapping;
}

var overlaps_array = (element, array) => array.some(e => overlaps(e, element))

// Global variables
var state = 0;
var notSelectedRadious = 3;
var selectedRadious = 5;
var walkingSpeed = 4 * 0.277778
var busSpeed = 15 * 16.66

var dijkstra = new jKstra.algos.Dijkstra(graph);
var stopsnames = Object.keys(stops)

// Coordinates GPS projection, mapping and scaling
var coordinates = stopsnames.map(k => stops[k]).map(e => e.split(',')).map(e => [parseFloat(e[0]),parseFloat(e[1])])
//var coordinatesgps = stopsnames.map(k => stops[k]).map(e => e.split(',')).map(e => [parseFloat(e[0]),parseFloat(e[1])])
//var coordinates = coordinatesgps.map(e => projector.project(e[0],e[1],0)).map(e => [e[0],e[1]])

var minlat = Math.min(...coordinates.map(e => e[0]))
var minlon = Math.min(...coordinates.map(e => e[1]))
var referenceCoordinate = [minlat, minlon]
coordinates = coordinates.map(e => [(e[0]-minlat),e[1]-minlon])
var maxlat = Math.max(...coordinates.map(e => e[0]))
var maxlon = Math.max(...coordinates.map(e => e[1]))
var scale = (maxlat > maxlon) ? maxlat : maxlon
var coordinates = coordinates.map(e => [(0.05+e[0]/maxlat),0.05+e[1]/maxlon])

window.onload = _ => {
        var svg = document.getElementById("map");
        
        // Creating lines from bus lines
        for (const line in lines) {
                var group = document.createElementNS('http://www.w3.org/2000/svg',"g")
                group.setAttributeNS(null, "id", line)
                group.classList.add("linegroup")
                
                for (const segment of lines[line]) {
                        var from = getCoordinatesByName(segment[0])
                        var to = getCoordinatesByName(segment[1])
						
						console.log(from);

                        var r = createElement('line', { 
                                x1: from[1]*90 + "%", 
                                y1: from[0]*90+ "%", 
                                x2: to[1]*90+ "%", 
                                y2: to[0]*90+ "%",
                                line: line,
                                id:  line +"-"+segment[0].split("-")[0]+"-"+segment[1].split("-")[0]});
                        
                        r.classList.add("line")
                        r.classList.add("line"+line)
                        group.appendChild(r);    
                }
                svg.appendChild(group)
        }


        // Adding stations dots and station labels
        coordinates.map((e, i) => [e, stopsnames[i]]).forEach(e => {
				//console.log(e);
                var r = createElement('circle', { 
                        cx: e[0][1]*90 + "%",
                        cy: e[0][0]*90 + "%", 
                        r: notSelectedRadious , 
                        id: e[1]});
                r.classList.add("station")

                var t = createElement('text', {
                        x: 1+e[0][1]*90 + "%",
                        y: 1+e[0][0]*90+ "%",
                        id: "t"+e[1]});

                t.classList.add("stopText")

                t.innerHTML = e[1];

                svg.appendChild(r);
                svg.appendChild(t);
        })

        // Adding hovers to lines
        document.querySelectorAll(".linegroup").forEach(l => {
                l.addEventListener('mouseover', e => {
                        if (state != 2) {
                                document.getElementById("info").innerHTML = "Linea " + e.target.getAttribute("line").toUpperCase()
                                document.getElementById("info").classList.add("line"+e.target.getAttribute("line"))

                                document.getElementById(e.target.getAttribute("line")).classList.add("activeRoute")
                        }
                }) 

                l.addEventListener('mouseout', e => {
                        if (state != 2) {
                                document.getElementById("info").innerHTML = ""
                                document.getElementById("info").classList.remove("line"+e.target.getAttribute("line"))

                                document.getElementById(e.target.getAttribute("line")).classList.remove("activeRoute")
                        }
                })
        })

        var routeFrom, routeTo;
        document.querySelectorAll('circle').forEach(c => {
                c.addEventListener('mouseover', e => {
                        if (state != 2) {
                                document.getElementById("t"+e.target.getAttribute("id")).style.display = "block";
                        }
                })

                c.addEventListener('mouseout', e => {
                        if (state != 2) {
                                document.getElementById("t"+e.target.getAttribute("id")).style.display = "none";
                        }
                })

                c.addEventListener('click', e => {
                        if (state === 0) {
                                // Set from point
                                state = 1;
                                e.target.setAttribute("r",selectedRadious)

                                routeFrom = e.target.getAttribute("id");
                                console.log("FROM: " + routeFrom)
                        }else if(state === 1){
                                // Set to point
                                state = 2;
                                e.target.setAttribute("r",selectedRadious)

                                routeTo = e.target.getAttribute("id");
                                console.log("TO: " + routeTo)

                                // Calculate paths
                                var startLines = linesinstop[routeFrom];
                                var endLines = linesinstop[routeTo];

                                var minTime = 99999999;
                                var minDistance = 0;
                                var finalPath = null;
                                var stopTime = 0.5;

                                for (const startL of startLines) {
                                        for (const endL of endLines) {
                                                console.log("TESTING: " + startL + '-' + routeFrom + ' to ' + endL + '-' + routeTo)

                                                var path = dijkstra.shortestPath(
                                                        getNodeByName(startL + '-' + routeFrom),
                                                        getNodeByName(endL + '-' + routeTo), {
                                                        edgeCost: (e, costDone) => e.data.time + stopTime
                                                });

                                                var totalTime = path.map(e => e.data.time + stopTime).reduce((a, b) => a + b, 0) - stopTime
                                                var totalDistance = path.map(e => e.data.distance).reduce((a, b) => a + b, 0);
                                                
                                                if(totalTime < minTime){
                                                        minTime = totalTime;
                                                        minDistance = totalDistance;
                                                        finalPath = path;
                                                }
                                        }
                                }

                                // Consoles
                                console.log(finalPath.map((e) => { return e.data.type + " ("
                                        + (e.data.time).toFixed(2) + " min - "
                                        + (e.data.distance/1000).toFixed(2) + " km): "
                                        + e.from.data.name + " -> " + e.to.data.name 
                                        + "\n"}).join(""));                                
                                console.log("TOTAL: " +  (minTime).toFixed(2) +  " min - "+  (minDistance/1000).toFixed(2) +  " km")


                                // Set route on SVG
                                finalPath.forEach(e => {
                                        if (e.data.type != "Change" ){
                                                var element = document.getElementById(e.from.data.name.split('-')[0] + "-" + e.from.data.name.split('-')[1] + "-" + e.to.data.name.split('-')[1])
                                                if (element) {
                                                        element.classList.add("activeRoute")        
                                                }else{
                                                        element = document.getElementById(e.from.data.name.split('-')[0] + "-" + e.to.data.name.split('-')[1] + "-" + e.from.data.name.split('-')[1])
                                                }
                                                element.classList.add("activeRoute")        
                                        }
                                })

                                document.getElementById("t"+routeFrom).style.display = "block";
                                document.getElementById("t"+routeTo).style.display = "block";

                                // Set info box
                                // SPAGUETTI CODE FROM HERE 
                                var linename = "";
                                finalPath = finalPath.map(e => [e.data.type,e.from.data.name,e.to.data.name])

                                var textPath = {};
                                finalPath.forEach(e => {
                                        if (e[0] != "Change") {
                                                if (textPath[e[0]] === undefined) {
                                                        textPath[e[0]] = []  
                                                }
                                                textPath[e[0]].push(e[1].split('-')[1],e[2].split('-')[1])
                                        }
                                })

                                finalPath.forEach((e,i) => {
                                        var p = document.createElement("p")
                                        p.classList.add("routeInfo")
                                        
                                        if (e[0]== "Change" ) {
                                                p.innerHTML = "Cambia de línea <b class='line" + e[1].split('-')[0] + "'>" + e[1].split('-')[0] + "</b> a línea <b class='line" + e[2].split('-')[0] + "'>" + e[2].split('-')[0] + "</b>"
                                                p.classList.add("walkingline")
                                        }else{
                                                if (textPath[e[0]] !== undefined) {
                                                        linename = e[0]
                                                        p.innerHTML = "Trayecto de <b>" + textPath[e[0]][0] + "</b> a <b>" + textPath[e[0]][textPath[e[0]].length-1] + "</b>"
                                                        p.classList.add("line"+linename) 
                                                        delete textPath[e[0]]
                                                }       
                                        }

                                        document.getElementById("cornerleft").appendChild(p)
                                })

                                var p = document.createElement("p")
                                p.classList.add("routeInfo")
                                p.innerHTML = "<b>Tiempo aproximado: " +  (minTime).toFixed(0) +  " min </b> "
                                document.getElementById("cornerleft").appendChild(p)
                                // SPAGUETTI CODE TO HERE 

                        }
                });
        });

        // Removing all routes afet calculation and click
        var removeroute = _ => {
                state = 0;
                // Remove route info
                document.querySelectorAll(".routeInfo").forEach(e => {
                        e.parentNode.removeChild(e)
                })

                document.querySelectorAll(".stopText").forEach(e => {
                        e.style.display = "none";
                })

                // Remove walking lines
                document.querySelectorAll(".walkingline").forEach(e => {
                        e.parentNode.removeChild(e)
                })

                // Remove activeRoute class
                document.querySelectorAll(".activeRoute").forEach(e => {
                        e.classList.remove("activeRoute")
                })

                document.querySelectorAll("circle").forEach(e => {
                        e.setAttribute("r",notSelectedRadious)
                })
        }

        document.addEventListener('click', e => {
                if (state == 2 && e.target.getAttribute("id") === "map") {
                        removeroute()
                }
        })


}

