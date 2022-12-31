import Layout from '../layouts/layout.component';
import Button from '../components/button/button.component';
import React, { useEffect, useState } from 'react';
import styles from './sort.module.css';
import { BarContainer } from '../components/sort/bar-container';
import { BubbleSortAnimateTask, bubbleSortAnimation } from '../algorithms/bubblesort';
import { quickSortAnimation } from '../algorithms/quicksort';
import { MergeSortAnimateTask, mergeSortAnimation } from '../algorithms/mergesort';

type Card = {
  speed: number;
  sortName: string;
  complexity: string;
  timestamp: string;
};

type CardProps = Card;

const SPEED = 20;
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
      const { animationTasks, speed, complexity, sortName, timestamp } = mergeSortAnimation(bars);
      setCardList((state) => [...state, { sortName, complexity, speed, timestamp }]);
      setAnimation((state) => ({ ...state, isSorting: true }));
      performMergeSortAnimation(domBars, animationTasks);
    }
  }

  function performBubbleSortAnimation(
    domBars: NodeListOf<HTMLElement>,
    tasks: BubbleSortAnimateTask[]
  ) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      let domBarIndexA = domBars.item(task.indexA);
      let domBarIndexB = domBars.item(task.indexB);
      if (task.action === 'compare') {
        const bgColorIndexA = domBarIndexA.style.backgroundColor;
        const bgColorIndexB = domBarIndexB.style.backgroundColor;
        window.setTimeout(() => {
          domBarIndexA.style.backgroundColor = COMPARE_COLOR;
          domBarIndexB.style.backgroundColor = COMPARE_COLOR;
        }, i * SPEED);

        window.setTimeout(() => {
          domBarIndexA.style.backgroundColor = bgColorIndexA;
          domBarIndexB.style.backgroundColor = bgColorIndexB;
        }, (i + 1) * SPEED);
      } else if (task.action === 'swap') {
        window.setTimeout(() => {
          let temph = domBarIndexA.style.height;
          domBarIndexA.style.height = domBarIndexB.style.height;
          domBarIndexB.style.height = temph;
          // swap tooltip
          let tempText = domBarIndexA.childNodes[0].textContent;
          domBarIndexA.childNodes[0].textContent = domBarIndexB.childNodes[0].textContent;
          domBarIndexB.childNodes[0].textContent = tempText;
        }, i * SPEED);
      }
    }

    // complete animation
    window.setTimeout(() => {
      setAnimation((state) => ({ ...state, sorting: false, isSorted: true }));
    }, (tasks.length ? tasks.length - 1 : 0) * SPEED);

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
      let domBarIndexA = domBars.item(task.indexA);
      let domBarIndexB = domBars.item(task.indexB);
      if (task.action === 'compare') {
        const bgColorIndexA = domBarIndexA.style.backgroundColor;
        const bgColorIndexB = domBarIndexB.style.backgroundColor;
        window.setTimeout(() => {
          domBarIndexA.style.backgroundColor = COMPARE_COLOR;
          domBarIndexB.style.backgroundColor = COMPARE_COLOR;
        }, i * SPEED);

        window.setTimeout(() => {
          domBarIndexA.style.backgroundColor = bgColorIndexA;
          domBarIndexB.style.backgroundColor = bgColorIndexB;
        }, (i + 1) * SPEED);
      } else if (task.action === 'swap') {
        window.setTimeout(() => {
          let temph = domBarIndexA.style.height;
          domBarIndexA.style.height = domBarIndexB.style.height;
          domBarIndexB.style.height = temph;

          // swap tooltip
          let tempText = domBarIndexA.childNodes[0].textContent;
          domBarIndexA.childNodes[0].textContent = domBarIndexB.childNodes[0].textContent;
          domBarIndexB.childNodes[0].textContent = tempText;
        }, i * SPEED);
      }
    }

    // complete animation
    window.setTimeout(() => {
      setAnimation((state) => ({ ...state, sorting: false, isSorted: true }));
    }, tasks.length * SPEED);

    window.setTimeout(() => {
      domBars.forEach((dom) => {
        dom.style.backgroundColor = COMPLETE_COLOR;
        dom.style.opacity = '0.5';
      });
    }, tasks.length * SPEED);
  }

  function performMergeSortAnimation(
    domBars: NodeListOf<HTMLElement>,
    tasks: MergeSortAnimateTask[]
  ) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.action === 'compare') {
        let domBarIndexA = domBars.item(task.indexA);
        let domBarIndexB = domBars.item(task.indexB);
        const bgColorIndexA = domBarIndexA.style.backgroundColor;
        const bgColorIndexB = domBarIndexB.style.backgroundColor;
        window.setTimeout(() => {
          domBarIndexA.style.backgroundColor = COMPARE_COLOR;
          domBarIndexB.style.backgroundColor = COMPARE_COLOR;
        }, i * SPEED);

        window.setTimeout(() => {
          domBarIndexA.style.backgroundColor = bgColorIndexA;
          domBarIndexB.style.backgroundColor = bgColorIndexB;
        }, (i + 1) * SPEED);
      } else if (task.action === 'update') {
        window.setTimeout(() => {
          let domBar = domBars.item(task.index);
          const relativeHeight = Math.floor((task.val / 1000) * 800);
          domBar.style.height = relativeHeight + 'px';
        }, i * SPEED);
      }
    }

    // complete animation
    window.setTimeout(() => {
      setAnimation((state) => ({ ...state, sorting: false, isSorted: true }));
    }, tasks.length * SPEED);

    window.setTimeout(() => {
      domBars.forEach((dom) => {
        dom.style.backgroundColor = COMPLETE_COLOR;
        dom.style.opacity = '0.5';
      });
    }, tasks.length * SPEED);
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
