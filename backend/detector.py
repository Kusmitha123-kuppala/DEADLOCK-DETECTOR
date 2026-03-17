import networkx as nx

def detect_deadlock(allocation, request):
    G = nx.DiGraph()

    processes = [f"P{i}" for i in range(len(allocation))]
    resources = [f"R{i}" for i in range(len(allocation[0]))]

    # Allocation edges: Resource → Process
    for i in range(len(allocation)):
        for j in range(len(allocation[0])):
            if allocation[i][j] == 1:
                G.add_edge(resources[j], processes[i])

    # Request edges: Process → Resource
    for i in range(len(request)):
        for j in range(len(request[0])):
            if request[i][j] == 1:
                G.add_edge(processes[i], resources[j])

    cycles = list(nx.simple_cycles(G))

    return {
        "deadlock": len(cycles) > 0,
        "cycles": cycles,
        "nodes": list(G.nodes()),
        "edges": list(G.edges())
    }