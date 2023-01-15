import { createSignal, runEffect } from '../lib/my-solid'

export function setupCounter(element: HTMLButtonElement) {

  const [counter, setCounter] = createSignal(0)

  runEffect(() => {
    element.innerHTML = `count is ${counter()}`
  }, counter)

  element.addEventListener('click', () => setCounter(counter() + 1))

  // return (
  //   <button onClick=(() => setCounter(counter() + 1))>`count is ${counter()}`</button>
  // )
}
