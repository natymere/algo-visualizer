import React, { useCallback, useEffect, useState } from 'react';
import Button from '../components/button/button.component';
import Grid, { TGrid } from '../components/path-finding/grid.component';
import Layout from '../layouts/layout.component';

import styles from './pathfinding.module.css';

export type TNode = {
  isStart: boolean;
  isFinish: boolean;
  row: number;
  col: number;
  distance: any;
  visited: any;
  isWall: any;
  previousNode: any;
};

const options = [
  { value: '', text: 'Choose an option' },
  { value: 'dijkstra', text: "Dijkstra's algorithm" },
  { value: 'dfs', text: 'Depth-first search' },
];
const ROWS = 30;
const COLUMNS = 30;

export default function Pathfinding() {
  const [select, setSelect] = useState(options[0].value);
  const [grid, setGrid] = useState<TGrid>([]);
  const createNode = (row: number, col: number, start: number[], end: number[]) => {
    return {
      row,
      col,
      isStart: row === start[0] && col === start[1],
      isFinish: row === end[0] && col === end[1],
      distance: -1,
      visited: false,
      isWall: false,
      previousNode: null,
    };
  };
  const initGrid = useCallback((): TGrid => {
    let start = [Math.floor(ROWS / 2), 2];
    let end = [Math.floor(ROWS / 2), COLUMNS - 3];
    let grid = [] as TGrid;
    for (let i = 0; i < ROWS; i++) {
      let rowNodes = [];
      for (let j = 0; j < COLUMNS; j++) {
        rowNodes.push(createNode(i, j, start, end));
      }
      grid.push(rowNodes);
    }
    return grid;
  }, []);

  useEffect(() => {
    setGrid(initGrid());

    return () => {};
  }, [initGrid]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  return (
    <Layout>
      <div className="main">
        <h1 className={styles.heading}>Path Finding</h1>
        <div className={styles.selectGroup}>
          <label className={styles.label} htmlFor="algo-select">
            Choose path finding algorithm:
          </label>
          <select name="algo" id="algo-select" value={select} onChange={handleChange}>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.text}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <Button type="button" style={{ marginRight: '4px' }}>
            Visualize
          </Button>
          <Button type="button">Clear Grid</Button>
        </div>
        <div className={styles.grid}>
          <Grid grid={grid}></Grid>
        </div>
      </div>
    </Layout>
  );
}
