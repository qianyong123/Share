React 函数式组件的性能优化
不论是类组件还是函数式组件，React 性能优化的主要方向有下面几个：

减少重新 render 的次数
减少计算量
减少渲染的节点、降低渲染量
合理设计组件
一、减少重新 render 的次数
React 中最重的（时间开销最大的）一块就是 reconciliation ，翻译为调和、和解。reconciliation 的最终目标是以最有效的方式，根据新的状态来更新 UI，我们可以简单地理解为 diff。如果不发生 render，就不会发生 reconciliation。

1、使用 React.memo 缓存组件
React.memo 是在 16.6 中新增的 API，与 PureComponent 相似，可以减少重新 render 的次数。

下面我们从问题入手：

index.js：
```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";

const App = () => {
  const [title, setTitle] = useState("这是一个 title");

  return (
    <div className="App">
      <h1>{title}</h1>
      <button onClick={() => setTitle("title 已经改变")}>改名字</button>
      <Child name="陈星星" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```
复制代码
其中包含了一个子组件 Child。

Child.js：
```jsx
import React from "react";

const Child = ({ name }) => {
  console.log(name);
  return <h1>{name}</h1>;
};

export default Child;
```

复制代码
当首次渲染的时候，会在控制台打印 「陈星星」。当在页面上点击 button 来更改 title 时，title 更改了，但是 「陈星星」也会被打印出来，而传递给 Child 组件的 props 并没有发生改变。我们知道原因是 —— 当父组件重新 render 也会导致子组件重新 render。

假设 Child 组件是一个非常庞大的组件，里面有大量的计算，这样的 Child 组件渲染一次会消耗很多的性能，我们应该减少或者避免 Child 组件的不必要渲染。所以，我们的优化点是 —— 在传递给子组件的 props 没有变化的时候，让子组件不渲染。

在函数式组件中，我们可以使用 React.memo 来做到这一点，memo 即 memorized，是记住的意思。

React.memo 是一个高阶组件，可以用它来包裹一个函数式组件之后，在 props 不变的情况下，这个被包裹的组件是不会重新渲染的。React.memo 会对参数进行浅比较，如果引用相同，则跳过 render 阶段，直接使用之前记忆的结果，即缓存组件。

所以，我们可以把 Child 组件改造一下：

// ...
export default React.memo(Child);
复制代码
由于 React.memo 默认情况下只会对参数进行浅比较，如果我们想控制对比过程，React.memo 是支持第二个参数的，我们可以将自定义的比较函数通过第二个参数传入来实现。
```jsx
const MyComponent = (props) => {
  /* 使用 props 渲染 */
};
const areEqual = (prevProps, nextProps) => {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
};
export default React.memo(MyComponent, areEqual);
```
复制代码
比较时，我们应当尽可能地做到精细化比对。

不过这里需要注意：与 class 组件中 shouldComponentUpdate() 方法不同的是，使用 React.memo 时，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值是相反的。

2、使用 React.useCallback 缓存引用
现在我们稍稍改动下上面的例子，给子组件 Child 传递一个函数 props。

App.js：
```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";

const App = () => {
  const [title, setTitle] = useState("这是一个 title");

  const print = () => {
    console.log("I am a function props");
  };

  return (
    <div className="App">
      <h1>{title}</h1>
      <button onClick={() => setTitle("标题改变了")}>改标题</button>
      <Child name="陈星星" onClick={print} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```
复制代码
Child.js：
```jsx
import React from "react";

const Child = ({ name, onClick }) => {
  console.log(name);
  return <h1>{name}</h1>;
};

export default React.memo(Child);
```
复制代码
我们使用了 React.memo，并且传递给 Child 组件的 props 似乎也没有发生改变，但是在点击 button 之后，依然打印出了「陈星星」，为什么呢？

因为每次点击 button 更新父组件的时候，对于函数式组件来说，每次 render 都会重新从头开始执行函数调用，所以传递给子组件 Child 的函数 print 每次都是新生成的。函数是引用类型的数据，每次生成的地址自然会不同。因此，React 会认为子组件的 props 发生了变化，子组件将重新渲染。

同样地，如果传递给子组件的是一个普通的引用变量，也会发生同样的情况：

App.js：
```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";

const App = () => {
  const [title, setTitle] = useState("这是一个 title");

  const a = [1];

  return (
    <div className="App">
      <h1>{title}</h1>
      <button onClick={() => setTitle("标题改变了")}>改标题</button>
      <Child name="陈星星" a={a} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```
复制代码
Child.js：

import React from "react";

const Child = ({ name, a }) => {
  console.log(name);
  return <h1>{name}</h1>;
};

export default React.memo(Child);
复制代码
如何解决呢？

（1）将函数或者引用变量放在组件的外边

我们把传递的函数 props 放在组件的外边不就就行了吗？是的，这样可以避免子组件重复渲染的问题：

import React, { useState } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";

const print = () => {
  console.log("I am a function props");
};

const a = [1];

const App = () => {
  const [title, setTitle] = useState("这是一个 title");

  return (
    <div className="App">
      <h1>{title}</h1>
      <button onClick={() => setTitle("标题改变了")}>改标题</button>
      <Child name="陈星星" onClick={print} a={a} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
复制代码
对于一些不属于组件的（不涉及到组件的 props 或者 state 计算的）变量，我们应当将它放在组件的外边。

可是如果传递的函数需要依赖于组件的 state 该怎么办呢？这就需要用到 React 提供的 useCallback 这个 API 了。

（2）使用 useCallback

useCallback 返回一个 memoized 回调函数，它接受两个参数，第一个参数是一个函数，第二个参数是一个依赖数组。只有当依赖数组中的值发生了变化，它才会返回一个新函数，否则将会使用之前所记忆的函数。

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
复制代码
所以，我们可以改造下 print 函数：

import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";

const App = () => {
  const [title, setTitle] = useState("这是一个 title");
  const [subtitle, setSubtitle] = useState("这是一个 subtitle");

  const print = useCallback(() => {
    console.log("I am a function props");
  }, [subtitle]);

  return (
    <div className="App">
      <h1>{title}</h1>
      <h1>{subtitle}</h1>
      <button onClick={() => setTitle("标题改变了")}>改标题</button>
      <button onClick={() => setSubtitle("副标题改变了")}>改副标题</button>
      <Child name="陈星星" onClick={print} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
复制代码
上面的例子中，只有当 subtitle 这个状态改变时，才会重新生成 print 函数，子组件才会更新。

使用 useCallback 的时候，如果传一个空数组作为依赖数组，那么子组件就不再受父组件的影响了，子组件接受的函数里面的参数永远都是初始化使用 useCallback 时的值，如：

App.js：

import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";

const App = () => {
  const [title, setTitle] = useState("这是一个 title");
  const [subtitle, setSubtitle] = useState("这是一个 subtitle");

  const print = useCallback(() => {
    console.log(`title: ${title}`);
  }, []);

  return (
    <div className="App">
      <h1>{title}</h1>
      <h1>{subtitle}</h1>
      <button onClick={() => setTitle("标题改变了")}>改标题</button>
      <button onClick={() => setSubtitle("副标题改变了")}>改副标题</button>
      <Child name="陈星星" onClick={print} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
复制代码
Child.js：

import React from "react";

const Child = ({ onClick }) => <button onClick={onClick}>print</button>;

export default React.memo(Child);
复制代码
只能拿到第一次初始化 title 的值，这样的结果不是我们需要的。如果需要这样的结果，那么也应该将 print 函数放在组件之外。

3、避免使用匿名函数
我们看段代码：

const Main = ({ list }) => (
  <List>
    {list.map((i) => (
      <Item key={i.id} onClick={() => handleDelete(i.id)} value={i.value} />
    ))}
  </List>
);
复制代码
这段代码很常见，虽然使用匿名函数是可以传递函数的，看起来也比较简洁。但是它是有问题的，匿名函数在每次渲染时都有不同的引用，依然会导致 Item 组件重复渲染的问题。

我们也可以使用 React.useCallback 来优化：

const Main = ({ list }) => {
  const handleDelete = useCallback(
    (id) => () => {
      // ...
    },
    [],
  );

  return (
    <List>
      {list.map((i) => (
        <Item key={i.id} id={i.id} onClick={handleDelete(id)} value={i.value} />
      ))}
    </List>
  );
};
复制代码
4、避免 React Context 导致的重复渲染
React 16 中新提供的 Context API 有个特点，一旦 Context 的 Value 变动，所有依赖该 Context 的组件会全部强制重新渲染，它是可以穿透 React.memo 或者 shouldComponentUpdate 的比对拦截的。看个例子：

Context.js：

import { createContext } from "react";

const context = createContext();

export default context;
复制代码
App.js：

import React, { useContext, useState } from "react";
import Context from "./Context";

const redTheme = {
  color: "red",
};

const greenTheme = {
  color: "green",
};

const Content = () => {
  const { theme, switchTheme } = useContext(Context);

  return (
    <>
      <h1 style={theme}>Hello world</h1>
      <button onClick={() => switchTheme(redTheme)}>Red Theme</button>
      <button onClick={() => switchTheme(greenTheme)}>Green Theme</button>
    </>
  );
};

const Header = () => {
  console.log("render Header");
  return <h1>Hello CodeSandbox</h1>;
};

const App = () => {
  const [theme, setTheme] = useState(redTheme);

  console.log("render App");

  return (
    <Context.Provider value={{ theme, switchTheme: setTheme }}>
      <div>
        <Header />
        <Content />
      </div>
    </Context.Provider>
  );
};

export default App;
复制代码
在浏览器中运行的效果如下：

context api 重复渲染
如何避免这个问题呢？思路很简单，需要一个方法去告诉 Context.Provider，告诉它子组件没有变化。

按照这个思路实现就是：建一个独立的组件来管理 state 和 Provider，把子组件写在这个组件之外。

改进后的代码为：

import React, { useContext, useState } from "react";
import Context from "./Context";

const redTheme = {
  color: "red",
};

const greenTheme = {
  color: "green",
};

const Content = () => {
  const { theme, switchTheme } = useContext(Context);

  return (
    <>
      <h1 style={theme}>Hello world</h1>
      <button onClick={() => switchTheme(redTheme)}>Red Theme</button>
      <button onClick={() => switchTheme(greenTheme)}>Green Theme</button>
    </>
  );
};

const Header = () => {
  console.log("render Header");
  return <h1>Hello CodeSandbox</h1>;
};

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(redTheme);

  return (
    <Context.Provider value={{ theme, switchTheme: setTheme }}>
      {props.children}
    </Context.Provider>
  );
};

const App = () => {
  console.log("render App");

  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
};

export default App;
复制代码
这样就避免了重复渲染的问题。

所以，我们在使用 Context API 的时候，需要特别谨慎。

5、避免使用内联对象
拿上面的 React Context 的代码示例来说， ThemeProvider 其实还存在一个问题：

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(redTheme);

  return (
    /*
    value 值使用内联对象时，react 会在每次渲染时重新创建对此对象的引用，
    这会导致接收此对象的组件将其视为不同的对象，
    因此，该组件对于 prop 的浅层比较始终返回 false
    这会导致所有依赖于该 Context 的组件被强制重新渲染。
    */
    <Context.Provider value={{ theme, switchTheme: setTheme }}>
      {props.children}
    </Context.Provider>
  );
};
复制代码
我们可以使用 useMemo 缓存一下：

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(redTheme);

  const value = useMemo(() => ({ theme, setTheme }), [theme]); // 缓存

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
复制代码
二、减少计算量
减少计算量的优化可以分为两类：

一类是减少 React 框架本身的计算，例如构建虚拟 DOM 的计算，diff 的计算；
另一类是减少业务代码的逻辑计算量。
1、减少不必要的节点嵌套
我们知道 React 使用的是虚拟 DOM ，React 使用 JavaScript 对象表示 DOM 节点。DOM 节点包括标签、属性和子节点。

React 在内存中生成维护一个跟真实 DOM 一样的虚拟 DOM 树，在改动完组件后，会再生成一个新得DOM，React 会把新虚拟 DOM 跟原虚拟 DOM 进行比对，找出两个DOM 不同的地方（diff） ，然后把 diff 放到队列里面，最后批量更新 diff 到真实 DOM 上。

所以，减少不必要的节点嵌套，是非常有必要的。不需要的元素都应该删减，例如：

<div className="App">
  <div>
    <h1>count：{num}</h1>
  </div>
  <div>
    <p>This is a line.</p>
  </div>
</div>
复制代码
h1 标签和 p 标签是完全没必要使用 div 标签包裹起来的。

曾经我非常喜欢用 styled-components 这个库，后来发现它完全是没有必要的，带来的好处仅仅是提高代码的可读性（自认为）。大量使用它会让节点嵌套变得非常深，并且它的样式设置方案也会带来性能问题（这点我会待会说）。

并且，很多不必要的节点嵌套都是滥用高阶组件导致的，对于高阶组件，我们应该保有一个原则：只在需要的时候使用它。尽可能地使用 props、Hooks 来代替。

同时，我们也可以使用 Fragment 来避免添加额外的 DOM，如：

const Main = () => (
  <>
    <h1>Hello world!</h1>
    <h1>Hello react!</h1>
  </>
);
复制代码
2、使用 keys
keys 可以帮助 React 跟踪哪些项目已更改、添加或从列表中删除。React 源码中对 key 的比较，如果不同则会直接更新。

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的 id 作为元素的 key。

如果不加 key 值或者 key 值相同的情况可能会造成什么问题？

react 会进行报警告提示
性能下降
key 值相同的情况有可能会造成数据更新时，数据的错乱
3、选择更好的样式处理方案
React 中有三种比较常见的方式来设置 UI 样式：

Inline Style
CSS Classes
CSS Modules
它们的性能对比大致是：CSS Module > CSS Classes > Inline Style。

很多时候，我们为了方便会使用内联样式，这是非常影响性能的。使用内联样式时，因为我们实际写的驼峰式的样式还是属于 JSX，并不是真正的样式，浏览器需要花费更多时间来处理脚本和渲染，增加了一个映射传递样式规则的过程。

所以，在项目中优先选择 CSS Module 这种方式。

具体对比可详见：

medium.com/@swazza85/u…
reactjs.org/docs/faq-st…
4、使用 useMemo 缓存计算结果
和减少 render 次数的思路一样，我们可以把某些计算结果给缓存起来，在参数没有变化的情况下，则直接使用上一次计算结果，React Hook 中提供了 useMemo 的 API 来实现。

// computeExpensiveValue(a, b) 是一个计算量很大的函数
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
复制代码
useMemo 的第一个参数就是一个函数，这个函数返回的值会被缓存起来，同时这个值会作为 useMemo 的返回值；
第二个参数是一个数组依赖，如果数组里面的值有变化，那么就会重新去执行第一个参数里面的函数，并将函数返回的值缓存起来并作为 useMemo 的返回值。
看个例子：

import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [num, setNum] = useState(0);

  // 一个非常耗时的一个计算函数
  // result 最后返回的值是 499999500000
  const expensiveFn = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    console.log(result); // 499999500000
    return result;
  };

  const base = expensiveFn();

  return (
    <div className="App">
      <h1>count：{num}</h1>
      <button onClick={() => setNum(num + base)}>+1</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
复制代码
除了初次渲染，每次点击 button 的时候，都会重新执行 expensiveFn 里的计算，下面使用 useMemo 来优化：

const base = useMemo(expensiveFn, []);
复制代码
只在初次渲染的时候执行 expensiveFn 并缓存结果，重复点击 button，不会再打印 expensiveFn 函数的结果，也就是 expensiveFn 函数没用再执行了，达到了优化的效果。

5、缓存子节点
既然 useMemo 可以缓存函数的执行结果，如果函数返回的是一个子节点，是不是也可以用 useMemo 缓存起来呢？答案是可以的。

const Parent = ({ a, b }) => {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  );
};
复制代码
注意：这种方式在循环中是无效的，因为 Hook 调用 不能 被放在循环中。但是我们可以为列表项抽取一个单独的组件，并在其中调用 useMemo。

注意事项

使用 useMemo 时，有几点需要注意：

如果不传递 useMemo 的第二个参数，依然会在每次渲染时都会计算新的值；
传给 useMemo 的函数应该是在渲染期间运行的，不要 useMemo 中做任何不会在渲染期间做的事，副作用属于 useEffect，而不是 useMemo；
如果是计算量很小的计算函数，也可以选择不使用 useMemo，因为这点优化并不会作为性能瓶颈的要点，反而可能使用错误还会引起一些性能问题。
6、节流和防抖
关于节流和防抖的概念，你可以从这里了解：togoblog.cn/javascript-…

在 React 中有一个非常常见的场景：在输入框中输入内容，向后端（假设为 api/users）请求数据，并在输入框的下方展示用户列表。

这里面会有一个问题：我们在输入框中每输入一个字符时，它都会触发异步网络请求，请求 api/users 获取要显示的用户列表，并且成功后通过更新 state 来更新 DOM，这是非常影响性能的。

可能有的时候，我们会为了减轻后端的服务器压力，在内存中维护一个「用户列表」，用以避免频繁的网络请求，但是仍然需要为输入的字符进行昂贵的 DOM 更新。

这里我们可以使用函数的节流与防抖来优化性能，推荐使用 loadsh 库中的函数。

三、减少渲染的节点、降低渲染量
1、优化条件渲染
我们经常会用到条件渲染，看下面的例子：

const App = () => {
  const [name, setName] = useState("react");

  if (name === "react") {
    return (
      <>
        <HeaderComponent>header</HeaderComponent>
        <ContentComponent>content</ContentComponent>
        <FooterComponent>footer</FooterComponent>
      </>
    );
  }

  return (
    <>
      <ContentComponent>content</ContentComponent>
      <FooterComponent>footer</FooterComponent>
    </>
  );
};
复制代码
当 name 为 'react' 的时候，才会渲染 HeaderComponent 组件。拿 JavaScript 语法的角度来看，没有性能问题。但是我们是在写 React，它是有性能问题的。

在每次状态改变重新渲染的时候，React 会首先检查 name 的值是不是 'react'，然后在 diff 算法中确定哪些 DOM 节点发生了改变。

而上面的写法，在每次执行 diff 时，如果 name 发生了变化，React 会认为 HeaderComponent 组件不可用了，现在需要渲染的第一个组件和第二个组件都发生了变化，所以 React 会将在位置 1 和位置 2 的组件卸载并重新安装，这其实是完全没必要的，因为 ContentComponent 组件和 FooterComponent 组件并没有发生更改。

我们可以这样优化：

<>
  {name === "react" && <HeaderComponent>header</HeaderComponent>}
  <ContentComponent>content</ContentComponent>
  <FooterComponent>footer</FooterComponent>
</>
复制代码
当 name 不是 'react' 时，React 在位置 1 处放置 null，位置 2 和位置 3 的组件保持不变，由于元素没变，因此组件不会卸载，减少了不必要的操作。

2、虚拟列表
虚拟列表是常见的「长列表」和「复杂组件树」优化方式，它优化的本质是减少渲染的节点。虚拟列表只渲染当前可视窗口的可见元素。如下图：

虚拟列表
（图片来自网络）

虚拟列表的使用场景有：

无限滚动列表
无限切换的日历或轮播图
时间轴
...
使用比较多的库有两个：

react-virtualized
react-window （更轻量的 react-virtualized，作者是同一个人）
下面以 react-window 的一个示例：

import { FixedSizeList as List } from "react-window";

const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

const Example = () => (
  <List height={150} itemCount={1000} itemSize={35} width={300}>
    {Row}
  </List>
);
复制代码
效果：

效果
关于更多 react-window 的使用方法，可以去官网查看。

3、懒加载
懒加载（Lazy loading）也称为延迟加载，它的本质和虚拟列表一样 —— 只在必要时才去渲染对应的节点，如果在某一时刻相关资源没有被查看或使用的需要，就不要渲染它们。

例如 Ant Design 的 Drawer 抽屉组件，首次渲染时，抽屉是不显示的，对应的就是 visible 这个 props 默认为 false，那么在 render 里就 return null，抽屉组件就不渲染，DOM 树中也就没有对应的结构；当点击按钮将 visible 属性设置为 true 时，渲染抽屉组件，然后再点击按钮，visible 为 false，此时组件隐藏，但是在 DOM 树中仍然存在。

这样做的好处有很多：

在初始加载时，可以大大减少客户端渲染的负担，提高页面的加载速度；
减少无效资源的加载，这样可以明显减少了服务器的压力和流量，也能够减小浏览器的负担；
防止并发加载的资源过多会阻塞 js 的加载，影响网站的正常使用。
有很多场景会用到懒加载，比如：

下拉列表
模态框
树形选择器
折叠组件
经常使用到的实现懒加载的库有：

react-lazyload，这里有一个 demo：github.com/IDeepspace/…
react-loadable
React 16.6 引入的新特性：React.lazy 和 suspense；需要注意，React.lazy 并不适合 SSR。
关于使用 React.lazy 和 suspense 实现懒加载的示例，可以参考：github.com/IDeepspace/…

4、预加载
前面提到了懒加载，它可以提高页面初次加载时的速度；但是对于大型项目的复杂组件来说，加载一个组件的时间开销很大，这会导致 loading 显示的很长，影响用户体验。

我们可以预先加载（preloading）一个组件，但并不在页面中展示，也就是隐藏渲染；当用户行为触发显示时，直接显示就好了，这样可以使用户的操作得到最快的反映。

比较流行的库有：

react-snap
react-snapshot
这两个库也有经由 React 官方推荐的。

也可以使用 React 16.6 引入的新特性：React.lazy 和 suspense。

关于使用 React.lazy 和 suspense 实现预加载的示例，可以参考：github.com/IDeepspace/…

四、合理设计组件
1、职责单一
是的，合理设计组件也会提高性能。组件的设计应该严格遵循职责单一原则。看个例子：

组件设计
（图片来自网络）

MyComponent 组件依赖于 A、B、C 三个组件，如果按照这样的结构来设计组件，只要 A、B、C 任意一个变动，那么 MyComponent 整个就会重新渲染。

基于职责单一的原则，我们可以这样来设计：

组件设计
（图片来自网络）

将 A、B、C 都抽取各自的组件中，现在 A 变动只会渲染 A 组件本身，而不会影响父组件和 B、C 组件。

一个比较常见的例子就是列表渲染，应当把列表项抽离出来当作单独的组件。这样一来，当列表项有变动，不会影响到整个大的组件。

2、合理的 state
不是所有的数据或状态都需要放在组件的 state 中，原则是：需要组件响应它的变动或者需要渲染到视图中的数据，才应该放到 state 中。这样可以避免不必要的数据变动导致组件重新渲染。

3、合理的 props
如果一个组件的 props 太过于复杂，会变得非常难以维护，影响测试和调试，这也违背了组件的职责单一原则；同时也会影响 shallowCompare 效率，降低组件缓存的命中率。所以，对于 props 复杂的组件，应当更细化的拆解，合理地设计。

五、拓展
还有一些其他的方式来优化 React 应用。

1、服务端渲染
React 提供了两个方法 renderToString 和 renderToStaticMarkup 用来将组件（Virtual DOM）输出成 HTML 字符串，这是 React 服务器端渲染（Server-Side Rendering，简称 SSR）的基础。比较流行的库有：

Loadable Components
Next.js
2、使用生产版本
在开发应用时使用开发模式，在为用户部署应用时使用生产模式。

如果项目是通过 Create React App 构建的，运行：

$ npm run build
复制代码
这段命令将在项目下的 build/ 目录中生成对应的生产版本。只有在生产部署前才需要执行这个命令，正常开发使用 npm start 即可。
