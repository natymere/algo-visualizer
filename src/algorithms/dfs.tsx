import { TGrid } from '../components/path-finding/grid.component';
import { TNode } from '../pages/pathfinding';

export function dfs(grid: TGrid, startNode: TNode, endNode: TNode): TNode[] {
  let visitedQueue: TNode[] = [];
  let unvisited = [];
  startNode.distanceFromStart = 0;
  unvisited.push(startNode);

  while (unvisited.length > 0) {
    const currentNode = unvisited.pop() as TNode;
    if (currentNode.isWall) continue;
    currentNode.visited = true;
    visitedQueue.push(currentNode);
    if (currentNode === endNode) return visitedQueue;
    // find neighbour nodes
    const { row, col } = currentNode;
    let neighbourNodes = [];
    // look left
    if (col > 0) {
      neighbourNodes.push(grid[row][col - 1]);
    }
    // look down
    if (row < grid.length - 1) {
      neighbourNodes.push(grid[row + 1][col]);
    }
    // look right
    if (col < grid[0].length - 1) {
      neighbourNodes.push(grid[row][col + 1]);
    }
    // look up
    if (row > 0) {
      neighbourNodes.push(grid[row - 1][col]);
    }

    neighbourNodes = neighbourNodes.filter((node) => node.visited === false);
    for (const n of neighbourNodes) {
      unvisited.push(n);
    }
  }
  return visitedQueue;
}
