import clsx from 'clsx';
import { useState } from 'react';
import { TNode } from '../../pages/pathfinding';

import styles from './node.module.css';

export default function Node(props: TNode) {
  const [nodeState, setNodeState] = useState({
    row: null,
    col: null,
    distance: null,
    visited: null,
    iswall: null,
    prevCell: null,
    cell: null,
    isStart: props.isStart,
    isFinish: props.isFinish,
    onMouseEnter: null,
    onMouseUp: null,
    onTouchUp: null,
    onTouchStart: null,
    onTouchMove: null,
    onTouchEnd: null,
  });

  return (
    <div
      className={clsx(
        styles.node,
        nodeState.isStart ? styles.startNode : null,
        nodeState.isFinish ? styles.endNode : null
      )}
    ></div>
  );
}
