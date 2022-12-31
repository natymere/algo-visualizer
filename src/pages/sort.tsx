import Layout from '../layouts/layout.component';
import Button from '../components/button/button.component';
import React, { useEffect, useState } from 'react';
import styles from './sort.module.css';
import { BarContainer } from '../components/sort/bar-container';
import { BubbleSortAnimateTask, bubbleSortAnimation } from '../algorithms/bubblesort';
import { quickSortAnimation } from '../algorithms/quicksort';

type Card = {
  speed: number;
  sortName: string;
  complexity: string;
  timestamp: string;
};

type CardProps = Card;

const SPEED = 0.2;
const COMPARE_COLOR = 'green';
const COMPLETE_COLOR = 'blue';

const options = [
  { value: '', text: 'Choose an option' },
  { value: 'quicksort', text: 'Quick sort' },
  { value: 'mergesort', text: 'Merge sort' },
  { value: 'bubblesort', text: 'Bubble sort' },
];

function initBarValues() {
  let arr = [];
  for (let i = 0; i < 1000; i++) {
    arr.push(i);
  }
  return arr;
}

function initBars(size: number) {
  let BAR_VALUES = initBarValues();
  let bars = getRandomIntArray(BAR_VALUES, size);
  return bars;
}

function getRandomIntArray(arr: number[], size: number) {
  let result = [];
  for (let i = 0; i < size; i++) {
    result.push(getRandomInt(arr));
  }
  return result;
}

function getRandomInt(arr: number[]) {
  let rand = Math.floor(Math.random() * arr.length);
  const result = arr[rand];
  arr.splice(rand, 1);
  return result;
}

function clearAllTimeout() {
  let id = window.setTimeout(function () {}, 0);

  while (id--) {
    window.clearTimeout(id);
  }
}

export default function Sort() {
  const [selectedSort, setSelectedSort] = useState(options[0].value);
  const [bars, setBars] = useState<number[]>([]);
  const [animation, setAnimation] = useState({
    isSorting: false,
    isSorted: false,
  });
  const [cardList, setCardList] = useState<Card[]>([]);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    setBars(initBars(100));
  }, []);

  function handleDropdownChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSort(e.target.value);
  }

  function handleReset() {
    clearAllTimeout();
    setResetKey((state) => state + 1);
    setBars(initBars(100));
    setAnimation((state) => ({ ...state, isSorted: false, isSorting: false }));
  }

  function handleSort() {
    if (selectedSort === '') return;
    const domBars = document.querySelectorAll<HTMLElement>('.bar');
    if (selectedSort === 'bubblesort') {
      setAnimation((state) => ({ ...state, isSorting: true }));
      const { animationTasks, speed, complexity, sortName, timestamp } = bubbleSortAnimation(bars);
      setCardList((state) => [...state, { sortName, complexity, speed, timestamp }]);
      performBubbleSortAnimation(domBars, animationTasks);
    } else if (selectedSort === 'quicksort') {
      const { animationTasks, speed, complexity, sortName, timestamp } = quickSortAnimation(bars);
      setCardList((state) => [...state, { sortName, complexity, speed, timestamp }]);
      performQuickSortAnimation(domBars, animationTasks);
      setAnimation((state) => ({ ...state, isSorting: true }));
    } else if (selectedSort === 'mergesort') {
      setAnimation((state) => ({ ...state, isSorting: true }));
    }
  }

  function performBubbleSortAnimation(
    domBars: NodeListOf<HTMLElement>,
    tasks: BubbleSortAnimateTask[]
  ) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.action === 'compare') {
        const bgColorIndexA = domBars.item(task.indexA).style.backgroundColor;
        const bgColorIndexB = domBars.item(task.indexB).style.backgroundColor;
        window.setTimeout(() => {
          domBars.item(task.indexA).style.backgroundColor = COMPARE_COLOR;
          domBars.item(task.indexB).style.backgroundColor = COMPARE_COLOR;
        }, i * SPEED);

        window.setTimeout(() => {
          domBars.item(task.indexA).style.backgroundColor = bgColorIndexA;
          domBars.item(task.indexB).style.backgroundColor = bgColorIndexB;
        }, (i + 1) * SPEED);
      } else if (task.action === 'swap') {
        window.setTimeout(() => {
          let temph = domBars.item(task.indexA).style.height;
          domBars.item(task.indexA).style.height = domBars.item(task.indexB).style.height;
          domBars.item(task.indexB).style.height = temph;
        }, i * SPEED);
      }

      window.setTimeout(() => {
        setAnimation((state) => ({ ...state, sorting: false, isSorted: true }));
      }, (tasks.length ? tasks.length - 1 : 0) * SPEED);
    }

    window.setTimeout(() => {
      domBars.forEach((dom) => {
        dom.style.backgroundColor = COMPLETE_COLOR;
        dom.style.opacity = '0.5';
      });
    }, tasks.length * SPEED);
  }

  function performQuickSortAnimation(
    domBars: NodeListOf<HTMLElement>,
    tasks: BubbleSortAnimateTask[]
  ) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.action === 'compare') {
      } else if (task.action === 'swap') {
        window.setTimeout(() => {
          let temph = domBars.item(task.indexA).style.height;
          domBars.item(task.indexA).style.height = domBars.item(task.indexB).style.height;
          domBars.item(task.indexB).style.height = temph;
        }, i * SPEED);
      }
    }
  }

  const { isSorted, isSorting } = animation;

  return (
    <Layout>
      <div className="main">
        <h1 className={styles.heading}>Sort</h1>
        <div className={styles.selectGroup}>
          <label className={styles.label} htmlFor="sort-select">
            Choose sorting algorithm:
          </label>
          <select name="sort" id="sort-select" value={selectedSort} onChange={handleDropdownChange}>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.text}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <Button
            type="button"
            style={{ marginRight: '4px' }}
            onClick={handleSort}
            disabled={isSorting || isSorted}
          >
            Sort
          </Button>
          <Button type="button" style={{ marginRight: '4px' }} onClick={handleReset}>
            Reset
          </Button>
        </div>
        <BarContainer key={resetKey} bars={bars}></BarContainer>
        <h1 className={styles.heading}>Time complexity Logs</h1>
        <div className="cards">
          {cardList.map((card) => (
            <Card
              key={card.timestamp}
              sortName={card.sortName}
              complexity={card.complexity}
              speed={card.speed}
              timestamp={card.timestamp}
            ></Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export function Card({ sortName, complexity, speed, timestamp }: CardProps) {
  return (
    <article className="card">
      <header>
        <h2>{sortName}</h2>
      </header>
      <div className="content">
        <p style={{ marginBottom: '5px' }}>Complexity: {complexity}</p>
        <p style={{ marginBottom: '5px' }}>Runtime execution: {speed} ms</p>
        <p style={{ marginBottom: '5px' }}>Timestamp: {timestamp}</p>
      </div>
    </article>
  );
}
