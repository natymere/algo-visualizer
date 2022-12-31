import { Bar } from './bar';
import styles from './bar-container.module.css';

type BarContainerProps = {
  bars: number[];
};

export function BarContainer({ bars }: BarContainerProps) {
  const containerHeight = 800;
  const barNodes = bars.map((bar, idx) => (
    <Bar key={idx} containerHeight={containerHeight} val={bar}></Bar>
  ));
  return (
    <div
      className={styles.barContainer}
      style={{ height: containerHeight + 'px', marginBottom: '20px' }}
    >
      {barNodes}
    </div>
  );
}
