import { TNode } from '../../pages/pathfinding';
import Node from './node.component';

export type TGrid = Array<Array<TNode>>;

interface GridBoard {
  startNode: [number, number];
  endNode: [number, number];
  grid: TGrid;
}

export default function Grid({ grid }: { grid: TGrid }) {
  console.log(grid);
  return (
    <div>
      {grid.map((rowNodes, idx) => (
        <div key={idx}>
          {rowNodes.map((node) => {
            const { isFinish, isStart, row, col, ...rest } = node;
            return (
              <Node
                key={`row${row}-col${col}`}
                isFinish={isFinish}
                isStart={isStart}
                row={row}
                col={col}
                {...rest}
              ></Node>
            );
          })}
        </div>
      ))}
    </div>
  );
}
