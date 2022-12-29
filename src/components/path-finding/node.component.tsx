import clsx from 'clsx';
import { min } from 'lodash-es';
import { useEffect, useLayoutEffect, useState } from 'react';
import { TNode } from '../../pages/pathfinding';

import styles from './node.module.css';

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
  onMouseEnter?: any;
  onMouseDown?: any;
  onMouseUp?: any;
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
      onMouseUp={() => onMouseUp(node, row, col)}
      onMouseEnter={() => onMouseEnter(node, row, col)}
    ></div>
  );
}
