import { TNode } from '../../pages/pathfinding';
import Node from './node.component';

export type TGrid = Array<Array<TNode>>;

export default function Grid({ grid }: { grid: TGrid }) {
  return (
    <div>
      {grid.map((rowNodes, idx) => (
        <div key={idx}>
          {rowNodes.map((node) => {
            const { isFinish, isStart, row, col, previousNode: previousNode, ...rest } = node;
            return (
              <Node
                key={`row${row}-col${col}`}
                isFinish={isFinish}
                isStart={isStart}
                row={row}
                col={col}
                previousNode={previousNode}
                {...rest}
              ></Node>
            );
          })}
        </div>
      ))}
    </div>
  );
}
