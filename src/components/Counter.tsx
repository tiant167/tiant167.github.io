import * as React from 'react'

const Counter = ({ count, onIncrement, onIncrementAsync }: { count: number, onIncrement: React.EventHandler<any>, onIncrementAsync: React.EventHandler<any> }) =>
  <div>
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    <hr />
    <div>
      Clicked: {count} times
    </div>
  </div>

export default Counter
