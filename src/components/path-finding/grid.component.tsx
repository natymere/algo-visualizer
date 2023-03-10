import { TNode } from '../../pages/pathfinding';
import Node from './node.component';

export type TGrid = Array<Array<TNode>>;

type GridProps = {
  grid: TGrid;
  onMouseEnter: (row: number, col: number) => void;
  onMouseDown: (node: TNode, row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
};

export default function Grid({ grid, onMouseDown, onMouseEnter, onMouseUp }: GridProps) {
  return (
    <div>
      {grid.map((rowNodes, idx) => (
        <div key={idx}>
          {rowNodes.map((node) => {
            const {
              isFinish,
              isStart,
              row,
              col,
              baseDistance,
              visited,
              previousNode,
              isWall,
              distanceFromStart,
            } = node;
            return (
              <Node
                key={`row${row}-col${col}`}
                row={row}
                col={col}
                baseDistance={baseDistance}
                visited={visited}
                isWall={isWall}
                isStart={isStart}
                isFinish={isFinish}
                distanceFromStart={distanceFromStart}
                previousNode={previousNode}
                node={node}
                onMouseDown={() => onMouseDown(node, row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp(row, col)}
              ></Node>
            );
          })}
        </div>
      ))}
    </div>
  );
}
