import { TGrid } from '../components/path-finding/grid.component';
import { TNode } from '../pages/pathfinding';

export function dijkstras(grid: TGrid, startNode: TNode, endNode: TNode): TNode[] {
  let visitedQueue: TNode[] = [];
  let unvisited = [];
  startNode.distanceFromStart = 0;

  // initialize unvisited nodes
  for (const row of grid) {
    for (const node of row) {
      unvisited.push(node);
    }
  }
  while (unvisited.length > 0) {
    // visit unvisted node with the smallest distance from start node
    unvisited.sort((a, b) => a.distanceFromStart - b.distanceFromStart);
    let currentNode = unvisited.shift() as TNode;
    if (currentNode.isWall) continue;
    if (currentNode.distanceFromStart === Infinity) return visitedQueue;
    currentNode.visited = true;
    visitedQueue.push(currentNode);
    if (currentNode === endNode) return visitedQueue;

    // find all neighbour nodes from current node (up, down, left, right)
    const { row, col } = currentNode;
    let neighbourNodes = [];
    if (row > 0) {
      neighbourNodes.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
      neighbourNodes.push(grid[row + 1][col]);
    }
    if (col > 0) {
      neighbourNodes.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
      neighbourNodes.push(grid[row][col + 1]);
    }

    // filter to examine unvisited neighbour nodes
    neighbourNodes = neighbourNodes.filter((node) => node.visited === false);

    // calculate distance for each node from start node
    for (const node of neighbourNodes) {
      // if calculated distance is less than known distance, update the node distance and prev node
      if (node.previousNode !== null) {
        const distance = node.previousNode.distanceFromStart + node.baseDistance;
        if (distance < node.distanceFromStart) {
          node.distanceFromStart = distance;
          node.previousNode = currentNode;
        }
      } else {
        node.distanceFromStart = node.baseDistance;
        node.previousNode = currentNode;
      }
    }
  }
  return visitedQueue;
}

export function getShortestPath(finishNode: TNode): TNode[] {
  let path = [];
  let node = finishNode.previousNode;
  if (node === null) {
    return [];
  }
  while (node !== null && node.isStart !== true) {
    path.push(node);
    node = node.previousNode;
  }
  path.reverse();
  return path;
}
