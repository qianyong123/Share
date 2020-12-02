
# Hook 简介

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

# 没有破坏性改动

## 在我们继续之前，请记住 Hook 是：

- **完全可选的**。 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。
- **100% 向后兼容的**。 Hook 不包含任何破坏性改动。
- **现在可用**。 Hook 已发布于 v16.8.0。
- **没有计划从 React 中移除 class**。 你可以在本页底部的章节读到更多关于 Hook 的渐进策略。

- **Hook 不会影响你对 React 概念的理解**。 恰恰相反，Hook 为已知的 React 概念提供了更直接的 API：props， state，context，refs 以及生命周期。稍后我们将看到，Hook 还提供了一种更强大的方式来组合他们。


# 什么是 Hook?

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

# State Hook

这个例子用来显示一个计数器。当你点击按钮，计数器的值就会增加：

```jsx

import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

# 等价的 class 示例

如果你之前在 React 中使用过 class，这段代码看起来应该很熟悉：
```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

在这里，useState 就是一个 Hook （等下我们会讲到这是什么意思）。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

useState 唯一的参数就是初始 state。在上面的例子中，我们的计数器是从零开始的，所以初始 state 就是 0。值得注意的是，不同于 this.state，这里的 state 不一定要是一个对象 —— 如果你有需要，它也可以是。这个初始 state 参数只有在第一次渲染时会被用到。

#### 声明多个 state 变量

你可以在一个组件中多次使用 State Hook:

```jsx

function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}

```

数组解构的语法让我们在调用 useState 时可以给 state 变量取不同的名字。当然，这些名字并不是 useState API 的一部分。React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。每次state更新过后，组件都会重写渲染。


# Effect Hook

你之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。

useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。（我们会在使用 Effect Hook 里展示对比 useEffect 和这些方法的例子。）

```jsx

import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
      console.log(`You clicked ${count} times`)
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。（我们会在使用 Effect Hook 中跟 class 组件的生命周期方法做更详细的对比。）

副作用函数还可以通过返回一个函数来指定如何“清除”副作用。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作：

```jsx


import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
 
  useEffect(() => {
    // 组件第一次渲染时或者state和props有更新时执行
    const time = setInterval(()=>{
      console.log('倒计时')
    },1000)
    return () => {
      // 组件卸载时执行这个函数，清除倒计时
      clearInterval(time)
    };
  });

   return null;

}


```

在这个示例中，React 会在组件销毁时取消对 ChatAPI 的订阅，然后在后续渲染时重新执行副作用函数。（如果传给 ChatAPI 的 props.friend.id 没有变化，你也可以告诉 React 跳过重新订阅。）

跟 **useState** 一样，你可以在组件中多次使用 **useEffect** ：

```jsx

function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
      console.log(`You clicked ${count} times`)
  });

  useEffect(() => {
    // 组件第一次渲染时或者state和props有更新时执行
    const time = setInterval(()=>{
      console.log('倒计时')
    },1000)
    return () => {
      // 组件卸载时执行这个函数，清除倒计时
      clearInterval(time)
    };
  });

   return null;
}

```

**Hook 允许我们按照代码的用途分离他们**， 而不是像生命周期函数那样。React 将按照 effect 声明的顺序依次调用组件中的每一个 effect。

# 提示: 通过跳过 Effect 进行性能优化

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。在 class 组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决：

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}

```

这是很常见的需求，所以它被内置到了 useEffect 的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可：

```jsx
useEffect(() => {
    console.log(`You clicked ${count} times`)
}, [count]); // 仅在 count 更改时更新

```

上面这个示例中，我们传入 [count] 作为第二个参数。这个参数是什么作用呢？如果 count 的值是 5，而且我们的组件重渲染的时候 count 还是等于 5，React 将对前一次渲染的 [5] 和后一次渲染的 [5] 进行比较。因为数组中的所有元素都是相等的(5 === 5)，React 会跳过这个 effect，这就实现了性能的优化。

当渲染时，如果 count 的值更新成了 6，React 将会把前一次渲染时的数组 [5] 和这次渲染的数组 [6] 中的元素进行对比。这次因为 5 !== 6，React 就会再次调用 effect。如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 effect。

对于有清除操作的 effect 同样适用

```jsx

function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
      console.log(`You clicked ${count} times`)
  });

  useEffect(() => {
    // 组件第一次渲染时或者state和props有更新时执行
    const time = setInterval(()=>{
      console.log('倒计时')
    },1000)
    return () => {
      // 组件卸载时执行这个函数，清除倒计时
      clearInterval(time)
    };
  },[props.id]);// 仅在 props.id 发生变化时，重新订阅

  return null;
} 

```
## 如果你只想让 useEffect 在第一次渲染时执行一次，第二个参数传个空数组即可

```jsx

useEffect(() => {
    console.log(`You clicked ${count} times`)
}, []); // 仅在在第一次渲染时执行

```

# Hook 规则

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

Hook 本质就是 JavaScript 函数，但是在使用它时需要遵循两条规则。

## 只在最顶层使用 Hook

不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

## 只在 React 函数中调用 Hook

不要在普通的 JavaScript 函数中调用 Hook。你可以：

- ✅ 在 React 的函数组件中调用 Hook
- ✅ 在自定义 Hook 中调用其他 Hook 

#### 遵循此规则，确保组件的状态逻辑在代码中清晰可见。


# 其他的 Hook

## useContext
```jsx
const value = useContext(MyContext);

```
接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

## useReducer
```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）

## useCallback
```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
- 返回一个 memoized 回调函数。

- 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

## useMemo
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- 返回一个 memoized 值。

- 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

- 记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

- 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

## useRef
```js
const refContainer = useRef(initialValue);
```
- useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

## useImperativeHandle
```js
useImperativeHandle(ref, createHandle, [deps])
```
- useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。- useImperativeHandle 应当与 forwardRef 一起使用：

## useLayoutEffect

- 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

- 尽可能使用标准的 useEffect 以避免阻塞视觉更新。

## useDebugValue
```js
useDebugValue(value)
```

useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

[React 官方中文文档](https://react.docschina.org/docs/hooks-reference.html)


