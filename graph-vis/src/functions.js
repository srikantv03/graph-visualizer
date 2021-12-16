function edmondsKarp(source, sink, parent, graph){
    var row = graph.length;
    function bfs(s, t, parent) {
        visited = [false] * self.row;
        q = [];
        q.push(s);
        
    }
    parent = [-1] * row;
    max_flow = 0;
    while (bfs(source, sink, parent)) {
        path_flow = Infinity;
        s = sink;
        while (s != source) {
            path_flow = min(path_flow, graph[parent[s]][s])
            s = parent[s];
            max_flow += path_flow;
            v = sink;
        } 
        while (v != source) {
            u = parent[v];
            graph[u][v] -= path_flow;
            graph[v][u] += path_flow;
            v = parent[v];
        }
    }
    return max_flow;


}