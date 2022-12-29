import React, { useCallback, useEffect, useRef, useState } from 'react';
import { dijkstras, getShortestPath } from '../algorithms/dijkstras';
import Button from '../components/button/button.component';
import Grid, { TGrid } from '../components/path-finding/grid.component';
import Layout from '../layouts/layout.component';

import styles from './pathfinding.module.css';

export type TNode = {
  row: number;
  col: number;
  baseDistance: number;
  visited: boolean;
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  distanceFromStart: number;
  previousNode: TNode | null;
};

export type TGridState = {
  key: string;
  grid: TGrid;
  animate: boolean;
  rows: number;
  columns: number;
  startPos: [number, number];
  endPos: [number, number];
  isAnimating: boolean;
  isAnimated: boolean;
  isChangingStartNode: boolean;
  isChangingFinishNode: boolean;
};

const options = [
  { value: '', text: 'Choose an option' },
  { value: 'dijkstra', text: "Dijkstra's algorithm" },
  { value: 'dfs', text: 'Depth-first search' },
];
const MIN_ROWS = 24;
const MIN_COLUMNS = 40;
const START_POS: [number, number] = [10, Math.floor(MIN_ROWS / 2)];
const END_POS: [number, number] = [MIN_COLUMNS - 11, Math.floor(MIN_ROWS / 2)];

export default function Pathfinding() {
  const [select, setSelect] = useState(options[0].value);
  const [gridState, setGridState] = useState<TGridState>({
    key: Math.random().toString(),
    grid: [],
    animate: false,
    rows: MIN_ROWS,
    columns: MIN_COLUMNS,
    startPos: START_POS,
    endPos: END_POS,
    isAnimating: false,
    isAnimated: false,
    isChangingStartNode: false,
    isChangingFinishNode: false,
  });

  const timeoutListRef = useRef<number[]>([]);
  const createNode = (row: number, col: number, startPos: number[], endPos: number[]): TNode => {
    return {
      row,
      col,
      baseDistance: 1,
      visited: false,
      isWall: false,
      isStart: row === startPos[1] && col === startPos[0],
      isFinish: row === endPos[1] && col === endPos[0],
      distanceFromStart: Infinity,
      previousNode: null,
    };
  };

  const initGrid = useCallback((rows: number, columns: number): TGrid => {
    let grid = [] as TGrid;
    for (let i = 0; i < rows; i++) {
      let rowNodes = [];
      for (let j = 0; j < columns; j++) {
        rowNodes.push(createNode(i, j, START_POS, END_POS));
      }
      grid.push(rowNodes);
    }
    return grid;
  }, []);

  useEffect(() => {
    const grid = initGrid(MIN_ROWS, MIN_COLUMNS);
    setGridState((state) => ({ ...state, grid: grid }));
  }, [initGrid]);

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const handleVisualize = () => {
    if (select === '') alert('choose an option');
    else if (select === 'dijkstra') {
      animateVisitedNodes();
    } else if (select === 'dfs') {
      alert('not implemented yet');
    }
  };

  // does not reset grid
  const handleClearPath = () => {};

  const animateVisitedNodes = () => {
    setGridState((state) => ({ ...state, isAnimating: true }));
    // get state
    const { grid, startPos, endPos } = gridState;
    const startNode = grid[startPos[1]][startPos[0]];
    const endNode = grid[endPos[1]][endPos[0]];

    const visitedNodes = dijkstras(grid, startNode, endNode);
    const paths = getShortestPath(endNode);

    const domNodes: HTMLElement[] = [];
    // animate searching effect
    for (let i = 0; i < visitedNodes.length; i++) {
      const id = window.setTimeout(() => {
        const node = visitedNodes[i];
        let domNode = document.querySelector<HTMLElement>(`#row${node.row}-col${node.col}`);
        if (domNode !== null) {
          const isStartNode = domNode.className.includes('startNode');
          const isEndNode = domNode.className.includes('endNode');
          if (isStartNode || isEndNode) {
            return;
          }
          domNodes.push(domNode);
          domNode.classList.add('visitedNode');
        }
        timeoutListRef.current.shift();
      }, i * 5);
      timeoutListRef.current = [...timeoutListRef.current, id];
    }

    // remove visited nodes effect and paint the path
    const id = window.setTimeout(() => {
      for (let i = 0; i < domNodes.length; i++) {
        const domNode = domNodes[i];
        if (domNode !== null) {
          domNode.classList.remove('visitedNode');
        }
      }
      animathPath(paths);
    }, visitedNodes.length * 5);
    timeoutListRef.current.push(id);
  };

  const animathPath = (path: TNode[]) => {
    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      let domNode = document.querySelector<HTMLElement>(`#row${node.row}-col${node.col}`);
      const id = window.setTimeout(() => {
        if (domNode == null) return;
        domNode.classList.add('visitedNode', 'rightArrow');
        timeoutListRef.current.shift();
        setGridState((gridState) => ({ ...gridState, isAnimating: false, isAnimated: true }));
      }, i * 5);
      timeoutListRef.current = [...timeoutListRef.current, id];
    }
  };

  const handleResetGrid = () => {
    const grid = initGrid(MIN_ROWS, MIN_COLUMNS);
    for (const id of timeoutListRef.current) {
      window.clearTimeout(id);
    }
    setGridState((state) => ({
      ...state,
      key: Math.random().toString(),
      grid: grid,
      isAnimating: false,
      isAnimated: false,
      startPos: START_POS,
      endPos: END_POS,
    }));
  };

  const getGridWithNewStartNode = (grid: TGrid, row: number, col: number) => {
    let gridCopy = [...grid];
    const node = gridCopy[row][col];
    const newNode = { ...node, isStart: !node.isStart };
    gridCopy[row][col] = newNode;
    return gridCopy;
  };

  const getGridWithNewFinishNode = (grid: TGrid, row: number, col: number) => {
    let gridCopy = [...grid];
    const node = gridCopy[row][col];
    const newNode = { ...node, isFinish: !node.isFinish };
    gridCopy[row][col] = newNode;
    return gridCopy;
  };

  const getGridWithNewWallNode = (grid: TGrid, row: number, col: number) => {
    let gridCopy = [...grid];
    const node = gridCopy[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    gridCopy[row][col] = newNode;
    return gridCopy;
  };

  const handleMouseDown = (node: TNode, row: number, col: number) => {
    if (gridState.isAnimated || gridState.isAnimating) return;

    if (node.isStart) {
      const newGrid = getGridWithNewStartNode(gridState.grid, row, col);
      setGridState((state) => ({
        ...state,
        grid: newGrid,
        isChangingStartNode: true,
      }));
    } else if (node.isFinish) {
      const newGrid = getGridWithNewFinishNode(gridState.grid, row, col);
      setGridState((state) => ({
        ...state,
        grid: newGrid,
        isChangingFinishNode: true,
      }));
    } else {
      const newGrid = getGridWithNewWallNode(gridState.grid, row, col);
      setGridState((state) => ({
        ...state,
        grid: newGrid,
      }));
    }
  };

  const handleMouseUp = (node: TNode, row: number, col: number) => {
    if (gridState.isAnimated || gridState.isAnimating) return;
    if (gridState.isChangingStartNode) {
      const newGrid = getGridWithNewStartNode(gridState.grid, row, col);
      setGridState((state) => ({
        ...state,
        grid: newGrid,
        startPos: [col, row],
        isChangingStartNode: false,
      }));
    }

    if (gridState.isChangingFinishNode) {
      const newGrid = getGridWithNewFinishNode(gridState.grid, row, col);
      setGridState((state) => ({
        ...state,
        grid: newGrid,
        endPos: [col, row],
        isChangingFinishNode: false,
      }));
    }
  };

  const handleMouseEnter = (node: TNode, row: number, col: number) => {
    if (gridState.isChangingStartNode) {
    }
    console.log(node);
    console.log(row);
    console.log(col);
  };

  const { isAnimating, isAnimated } = gridState;

  return (
    <Layout>
      <div className="main">
        <h1 className={styles.heading}>Path Finding</h1>
        <div className={styles.selectGroup}>
          <label className={styles.label} htmlFor="algo-select">
            Choose path finding algorithm:
          </label>
          <select name="algo" id="algo-select" value={select} onChange={handleDropdownChange}>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.text}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <Button
            disabled={isAnimating || isAnimated}
            type="button"
            style={{ marginRight: '4px' }}
            onClick={handleVisualize}
          >
            Visualize
          </Button>
          <Button
            disabled={isAnimating}
            type="button"
            style={{ marginRight: '4px' }}
            onClick={handleResetGrid}
          >
            Clear Path
          </Button>
          <Button type="button" onClick={handleResetGrid}>
            Reset Grid
          </Button>
        </div>
        <div className={styles.grid}>
          <Grid
            key={gridState.key}
            grid={gridState.grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
          ></Grid>
        </div>
      </div>
    </Layout>
  );
}
