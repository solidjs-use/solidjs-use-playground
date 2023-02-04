import { render } from 'solid-js/web'
import { useMouse, useCounter } from 'solidjs-use'

const App = () => {
  const { x, y } = useMouse()
  const { count, inc, dec } = useCounter()
  return (
    <div style='text-align: center; margin-top: 100px'>
      <h1>Mouse: {x()} x {y()}</h1>
      <h1>
        Counter: {count()}{' '}
        <a onClick={() => inc()} style='margin-right: 10px;cursor: pointer;'>+</a>
        <a onClick={() => dec()} style='cursor: pointer;'>-</a>
      </h1>
    </div>
  );
};


render(() => <App />, document.getElementById("app")!);
