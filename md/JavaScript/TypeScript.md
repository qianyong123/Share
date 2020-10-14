# 基础类型

### 介绍

为了让程序有价值，我们需要能够处理最简单的数据单元：数字，字符串，结构体，布尔值等。 TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

### 布尔值

```
let isDone: boolean = false;
```

### 数字

```
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

### 字符串

```
let name: string = "bob";
name = "smith";
// 你还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（ `），并且以${ expr }这种形式嵌入表达式
let sentence: string = `Hello, my name is ${ name }.
```

### 数组

- TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 [ ]，表示由此类型元素组成的一个数组：

```
let list: number[] = [1, 2, 3];
```

- 第二种方式是使用数组泛型，Array<元素类型>：

```
let list: Array<number> = [1, 2, 3];
```

**元组 Tuple**

```
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error

// 当访问一个已知索引的元素，会得到正确的类型：

console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

//当访问一个越界的元素，会使用联合类型替代：

x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型

```

### 枚举

- enum 类型是对 JavaScript 标准数据类型的一个补充。 像 C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```js
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

// 或者，全部都采用手动赋值：

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```

### Any

- 任意类型

```
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let list: any[] = [1, true, "free"];
```

### Void

- 某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：

```
function warnUser(): void {
    console.log("This is my warning message");
}
```

- 声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null：

```
let unusable: void = undefined;
```

### Never

never 类型表示的是那些永不存在的值的类型。

```
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

### Object

-object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型。

- 使用 object 类型，就可以更好的表示像 Object.create 这样的 API。例如：

```
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error

```

### 类型断言

- 有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

- 类型断言有两种形式。 其一是“尖括号”语法：

```

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

```

- 另一个为 as 语法：

```
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;

react只支持as语法
```

# 接口

**介绍**

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

### 可选属性 

```
interface SquareConfig {
  color?: string;
  width?: number;
}

let p1:SquareConfig = {color:'red'} //ok

```
### 必传属性

```
interface SquareConfig {
  x: string;
  y: number;
}

let p1:SquareConfig = {x:'150'} // err 类型 "{ x: string; }" 中缺少属性 "y"，但类型 "SquareConfig" 中需要该属性。
let p2:SquareConfig = {x:'150'y:150} // ok


```

### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性:

```
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

- TypeScript 具有 ReadonlyArray<T>类型，它与 Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.length = 100; // error!
a = ro; // error!
```

# 函数

### 介绍
函数是JavaScript应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块。 在TypeScript里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义 行为的地方。 TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。

### 为函数定义类型
```js
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```
我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

### 书写完整函数类型
现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。
```js
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
```

函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。 我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。 这个名字只是为了增加可读性。 我们也可以这么写：
```js
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```
只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。如果函数没有返回任何值，你也必须指定返回值类型为 void而不能留空。

### 推断类型
尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：
```js
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

这叫做“按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型。

### 可选参数和默认参数

**必传参数**
```js
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");    // error, too many parame
let result3 = buildName("Bob", "Adams");         // ah, just right
```
**可选参数**

```js
function buildName(firstName: string, lastName?: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // ok
let result2 = buildName("Bob", "Adams", "Sr.");    // error, too many parame
let result3 = buildName("Bob", "Adams");         // ah, just right
```
**默认参数**

```js
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right

```

### 剩余参数

- 必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数。

- 在TypeScript里，你可以把所有参数收集到一个变量里：
```js
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```
- 剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（ ...）后面给定的名字，你可以在函数体内使用这个数组。

- **注意：**剩余参数类型必须是一个数组

# 泛型

### 介绍

软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

### 泛型之 Hello World

- 我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：

- 这里我们明确的指定了 T 是 string 类型，并做为一个参数传给函数，使用了<>括起来而不是()。

- 第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定 T 的类型：

```js
function identity<T>(arg: T): T {
    return arg;
}
// 第一种
let output = identity<string>("myString");  // type of output will be 'string'
// 第二种
let output = identity("myString");  // type of output will be 'string'
```

### 泛型约束

```js
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```js
loggingIdentity(3);  // Error, number doesn't have a .length property

```

我们需要传入符合约束类型的值，必须包含必须的属性：

```
loggingIdentity({length: 10, value: 3});
loggingIdentity('123');  //ok
```

### 枚举

使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举。

### 数字枚举

```js

enum Response {
     Up = 1,
    Down,
    Left,
    Right
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Up)
```
如上，我们定义了一个数字枚举， Up使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。

### 字符串枚举


```js
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

# 高级类型

### 交叉类型（Intersection Types）

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员。

```js
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

### 联合类型（Union Types）
联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入 number或 string类型的参数。 例如下面的函数：
```js

function padLeft(value: string, padding: string | number) {
    // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation
```
联合类型表示一个值可以是几种类型之一。 我们用竖线（ |）分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean。

### 类型别名
类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
```js
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}

type Container<T> = { value: T };

```

### 映射类型

一个常见的任务是将一个已知的类型每个属性都变为可选的：
```js
interface PersonPartial {
    name?: string;
    age?: number;
}
```
或者我们想要一个只读版本：
```js
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}

```
这在JavaScript里经常出现，TypeScript提供了从旧类型中创建新类型的一种方式 — 映射类型。 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 例如，你可以令每个属性成为 readonly类型或可选的。 下面是一些例子：
```js
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}
```
像下面这样使用：
```js
interface Person {
    name: string;
    age: number;
}
type PersonPartial = Partial<Person>;

type ReadonlyPerson = Readonly<Person>;

// 映射后

interface PersonPartial {
    name?: string;
    age?: number;
}

interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}

```

它的语法与索引签名的语法类型，内部使用了 for .. in。

