import clsx from 'clsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { TNode } from '../../pages/pathfinding';

import styles from './node.module.css';

export default function Node(props: TNode) {
  const [nodeState, setNodeState] = useState<TNode>({
    row: props.row,
    col: props.col,
    baseDistance: props.distanceFromStart,
    visited: props.visited,
    isWall: props.isWall,
    isStart: props.isStart,
    isFinish: props.isFinish,
    distanceFromStart: props.distanceFromStart,
    previousNode: null,
    onMouseEnter: null,
    onMouseUp: null,
    onTouchUp: null,
    onTouchStart: null,
    onTouchMove: null,
    onTouchEnd: null,
  });

  useEffect(() => {
    setNodeState((state) => ({
      ...state,
      distanceFromStart: props.distanceFromStart,
      previousNode: props.previousNode,
      visited: props.visited,
      isWall: props.isWall,
      isStart: props.isStart,
      isFinish: props.isFinish,
    }));
  }, [
    props.distanceFromStart,
    props.previousNode,
    props.visited,
    props.isWall,
    props.isStart,
    props.isFinish,
  ]);

  const { row, col } = nodeState;
  return (
    <div
      id={`row${row}-col${col}`}
      className={clsx(
        'node',
        nodeState.isStart ? 'startNode' : null,
        nodeState.isFinish ? 'endNode' : null
      )}
    ></div>
  );
}
