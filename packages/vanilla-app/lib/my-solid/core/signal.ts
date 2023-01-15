interface Signal {
  value: unknown
}
const effectMap = new WeakMap()

function readValue<T>(this: Signal): T {
  return this.value as T
}

function writeValue<T>(this: Signal, newValue: T, dep: () => T) {
  this.value = newValue
  const effects = effectMap.get(dep)
  if(effects && effects.length > 0) {
    for(let effect of effects) {
      effect()
    }
  }
}

type SignalRes<T> = [() => T, (newValue: T) => void]

export function createSignal<T extends any=any>(initialValue: T): SignalRes<T> {
  const signal: Signal = {
    value: initialValue
  }

  const read = readValue.bind(signal) as () => T

  const write = (newValue: T) => {
    writeValue.call(signal, newValue, read)
  }

  return [read, write]
}

export function runEffect(effect: () => void, dep: any) {
  effect()
  let effects = effectMap.get(dep)
  if(!effects) {
    effects = [effect]
    effectMap.set(dep, effects)
  }else {
    effects.push(effect)
  }
}
