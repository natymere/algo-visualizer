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
  const { node, row, col, isWall, isStart, isFinish, onMouseEnter, onMouseDown, onMouseUp } = props;

  let className = 'node';
  if (isStart) className = 'node startNode';
  else if (isFinish) className = 'node endNode';
  else if (isWall) className = 'node wallNode';

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
