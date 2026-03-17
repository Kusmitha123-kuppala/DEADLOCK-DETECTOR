function drawGraph(nodes, edges, cycles = []) {
    const width = document.getElementById("graphBox").clientWidth || 440;
    const height = 260;

    // Helper to check if an edge (u, v) is part of any cycle
    const isEdgeInCycle = (u, v) => {
        return cycles.some(cycle => {
            for (let i = 0; i < cycle.length; i++) {
                const start = cycle[i];
                const end = cycle[(i + 1) % cycle.length];
                if (start === u && end === v) return true;
            }
            return false;
        });
    };

    // Helper to check if a node is part of any cycle
    const isNodeInCycle = (nodeId) => {
        return cycles.some(cycle => cycle.includes(nodeId));
    };

    // Clear previous graph
    d3.select("#graphBox").selectAll("*").remove();

    const svg = d3.select("#graphBox")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Arrowhead definition
    const defs = svg.append("defs");
    
    // Normal Arrow
    defs.append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-0 -5 10 10")
        .attr("refX", 20)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .append("svg:path")
        .attr("d", "M 0,-5 L 10 ,0 L 0,5")
        .attr("fill", "#38bdf8");

    // Highlighted Arrow
    defs.append("marker")
        .attr("id", "arrowhead-highlight")
        .attr("viewBox", "-0 -5 10 10")
        .attr("refX", 20)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .append("svg:path")
        .attr("d", "M 0,-5 L 10 ,0 L 0,5")
        .attr("fill", "#ef4444");

    const simulation = d3.forceSimulation(nodes.map(d => ({id: d})))
        .force("link", d3.forceLink(edges.map(d => ({source: d[0], target: d[1]}))).id(d => d.id).distance(80))
        .force("charge", d3.forceManyBody().strength(-250))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(edges.map(d => ({source: d[0], target: d[1]})))
        .enter().append("line")
        .attr("stroke", d => isEdgeInCycle(d.source, d.target) ? "#ef4444" : "#38bdf8")
        .attr("stroke-width", d => isEdgeInCycle(d.source, d.target) ? 3 : 2)
        .attr("marker-end", d => isEdgeInCycle(d.source, d.target) ? "url(#arrowhead-highlight)" : "url(#arrowhead)");

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 15)
        .attr("fill", d => d.startsWith("P") ? "#22c55e" : "#eab308")
        .attr("stroke", d => isNodeInCycle(d) ? "#ef4444" : "none")
        .attr("stroke-width", d => isNodeInCycle(d) ? 3 : 0)
        .style("filter", d => isNodeInCycle(d) ? "drop-shadow(0 0 5px #ef4444)" : "none")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const label = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .text(d => d)
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("dy", 4);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
}