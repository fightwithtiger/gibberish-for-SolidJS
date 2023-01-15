import { Component, createSignal } from 'solid-js';
import styles from './App.module.css';

const App: Component = () => {
  const [counter, setCounter] = createSignal(0)
  console.log('App exec')

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div>count: {counter()}</div>

        <button onClick={() => setCounter(counter() + 1)}>add</button>
      </header>
    </div>
  );
};

export default App;
