import clsx from 'clsx';
import { TNode } from '../../pages/pathfinding';

type TNodeProps = {
  node: TNode;
  row: number;
  col: number;
  baseDistance: number;
  visited: boolean;
  isWall: any;
  isStart: boolean;
  isFinish: boolean;
  distanceFromStart: number;
  previousNode: TNode | null;
  onMouseEnter: (row: number, col: number) => void;
  onMouseDown: (node: TNode, row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
  onTouchUp?: any;
  onTouchStart?: any;
  onTouchMove?: any;
  onTouchEnd?: any;
};

export default function Node(props: TNodeProps) {
  const {
    node,
    row,
    col,
    baseDistance,
    visited,
    isWall,
    isStart,
    isFinish,
    distanceFromStart,
    previousNode,
    onMouseEnter,
    onMouseDown,
    onMouseUp,
    onTouchUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = props;

  const className = clsx(
    'node',
    isStart ? 'startNode' : null,
    isFinish ? 'endNode' : null,
    isWall ? 'wallNode' : null
  );

  return (
    <div
      id={`row${row}-col${col}`}
      className={className}
      onMouseDown={() => onMouseDown(node, row, col)}
      onMouseUp={() => onMouseUp(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
    ></div>
  );
}
