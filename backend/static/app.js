document.getElementById("generateBtn").addEventListener("click", () => {
    const numP = parseInt(document.getElementById("numP").value);
    const numR = parseInt(document.getElementById("numR").value);
    
    const createTable = (id) => {
        let html = "<table>";
        for (let i = 0; i < numP; i++) {
            html += "<tr>";
            for (let j = 0; j < numR; j++) {
                html += `<td><input type="number" class="matrix-input" data-row="${i}" data-col="${j}" value="0" min="0"></td>`;
            }
            html += "</tr>";
        }
        html += "</table>";
        document.getElementById(id).innerHTML = html;
    };

    createTable("allocationTable");
    createTable("requestTable");

    document.getElementById("matrixContainer").classList.remove("hidden");
    document.getElementById("runBtn").classList.remove("hidden");
});

document.getElementById("runBtn").addEventListener("click", async () => {
    const status = document.getElementById("status");
    const graphDiv = document.getElementById("graph");

    const scrapeMatrix = (containerId) => {
        const numP = parseInt(document.getElementById("numP").value);
        const numR = parseInt(document.getElementById("numR").value);
        const matrix = [];
        const inputs = document.querySelector(`#${containerId}`).querySelectorAll("input");
        
        let idx = 0;
        for (let i = 0; i < numP; i++) {
            const row = [];
            for (let j = 0; j < numR; j++) {
                row.push(parseInt(inputs[idx++].value) || 0);
            }
            matrix.push(row);
        }
        return matrix;
    };

    const allocation = scrapeMatrix("allocationTable");
    const request = scrapeMatrix("requestTable");

    status.className = "status";
    status.innerHTML = "⏳ Analyzing system state...";
    status.classList.remove("hidden");
    graphDiv.classList.add("hidden");

    try {
        const res = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ allocation, request })
        });

        const data = await res.json();

        if (data.error) {
            status.innerHTML = `❌ Error: ${data.error}`;
            return;
        }

        if (data.deadlock) {
            status.classList.add("deadlock");
            status.innerHTML = "❌ Deadlock Detected – Circular wait exists";
        } else {
            status.classList.add("safe");
            status.innerHTML = "✅ System Safe – No deadlock found";
        }

        graphDiv.classList.remove("hidden");
        if (typeof drawGraph === "function") {
            drawGraph(data.nodes, data.edges, data.cycles);
        }

    } catch (err) {
        console.error("Error:", err);
        status.innerHTML = "❌ Server Connection Error";
    }
});