---
sidebar: auto
sidebarDepth: 3
collapsable: true
---
# Flow 使用入门
## 认识

[Flow](https://flow.org/en/docs/getting-started/) 是 facebook 出品的 JavaScript **静态类型检查工具**.

:::tip
Vue.js 的源码利用 Flow 做了静态类型检查,所以了解 Flow 有助于我们阅读源码.
:::

## 为什么用

JavaScript 是动态类型语言,它的灵活性有目共睹,但是过于灵活的副作用是很容易就写出非常隐蔽的隐患代码,在编译期甚至看上去都不会报错,但在运行阶段就可能出现各种奇怪的 bug.

类型检查是当前动态类型语言的发展趋势,所谓类型检查,就是在编译期尽早发现(由类型错误引起的)bug,又不影响代码运行(不需要运行时动态检查类型),使编写 JavaScript 具有和编写 Java 等强类型语言相近的体验. 

项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性. Vue.js 在做 2.0 重构的时候,在 ES2015 的基础上,除了 ESLint 保证代码风格之外,也引入了 Flow 做静态类型检查.之所以选择 Flow,主要是因为 Babel 和 ESLint 都有对应的 Flow 插件以支持语法,可以完全沿用现有的构建配置,非常小成本的改动就可以拥有静态类型检查的能力.             

## 安装使用

``` js{2}
1. yarn add -g flow-bin // 全局下载
2. flow init // 生成.flowconfig文件,不初始化,flow指令会报错
3. 使用flow启动流后台进程.
4. 确定用 //@flow 监视哪个文件流.
5. 为项目编写流程代码.
6. 检查代码的类型错误.
```

:::tip
` // @flow `

Flow会收集检测带有此注释的文件,忽略无此标志的文件.

也可以使用 ` /* @flow */ ` 标记.

`/* @flow weak */` 只对有加类型注解的变量进行类型检测
:::


## Flow 的工作方式

通常类型检查分成 2 种方式：

- **类型推断**：通过变量的使用上下文来推断出变量类型,然后根据这些推断来检查类型.

- **类型注释**：事先注释好我们期待的类型,Flow 会基于这些注释来判断.

### 类型推断

它不需要任何代码修改即可进行类型检查,最小化开发者的工作量.它不会强制你改变开发习惯,因为它会自动推断出变量的类型.这就是所谓的类型推断,Flow 最重要的特性之一.

通过一个简单例子说明一下：

``` js
// @flow

function split(str) {
  return str.split(' ')
}

split(11); // Error!
```

Flow 检查上述代码后会报错,因为函数 `split` 期待的参数是`字符串`,而我们输入了`数字`.

### 类型注释

如上所述,类型推断是 Flow 最有用的特性之一,不需要编写类型注释就能获取有用的反馈.但在某些特定的场景下,添加类型注释可以提供更好更明确的检查依据.

考虑如下代码：

```js
/*@flow*/

function add(x, y){
  return x + y;
}

add('Hello', 11); // Works!
```

Flow 检查上述代码时检查不出任何错误,因为从语法层面考虑, `+` 既可以用在字符串上,也可以用在数字上,我们并没有明确指出 `add()` 的参数必须为数字.

在这种情况下,我们可以借助类型注释来指明期望的类型.类型注释是以冒号 `:` 开头,可以在函数参数,返回值,变量声明中使用.

如果我们在上段代码中添加类型注释,就会变成如下：

```js
/*@flow*/

function add(x: number, y: number): number {
  return x + y;
}

add('Hello', 11); // Error!
```

现在 Flow 就能检查出错误,因为函数参数的期待类型为数字,而我们提供了字符串.

上面的例子是针对函数的`类型注释`.接下来我们来看看 Flow 能支持的一些常见的类型注释.

## 基本类型注释(Type Annotations)

JavaScript 中的基本类型,类型标注语法是在变量后加上一个`冒号`和`空格`,然后是`相应的类型名称`,如：

``` js
// @flow
const a: string = 'string'; 

const b: number = 5; 

const c: boolean = false; 

const d: void = undefined; // Flow类型中用 `void` 替代 JavaScript 中的 `undefined`

const e: null = null;
```

::: tip
在 Flow 中,`大写开头`的类型名和`小写开头`的类型名是有区别的.
:::

**1.字面量值对应的类型名称是小写**
``` js
// @flow
function method(x: number, y: string, z: boolean) {
  // ...
}

method(3.14, "hello", true);

// 又比如下面这种
// String 函数是将参数转化成一个字符串,仍然是小写的 string 类型 
const b: string = String('b');
```

**2.大写开头的类型名称,其对应的值是 new 创建出来的类型实例**
``` js
// @flow
function method(x: Number, y: String, z: Boolean) {
  // ...
}

method(new Number(42), new String("world"), new Boolean(false));
```

我们再进一步深入每个基本类型了解.

### Boolean

```js
// @flow
function acceptsBoolean(value: boolean) {
  // ...
}

acceptsBoolean(true);  // Works!
acceptsBoolean(false); // Works!
acceptsBoolean("foo"); // Error!
```

Javascript还可以隐式地将其他类型的值转换为布尔值,如：
``` js
if (42) {} // 42 => true
if ("") {} // "" => false
```

在Flow中,我们可以使用`Boolean(x)`或`!!x`显式完成这一个转换.

```js
// @flow
function acceptsBoolean(value: boolean) {
  // ...
}

acceptsBoolean(0);          // Error!
acceptsBoolean(Boolean(0)); // Works!
acceptsBoolean(!!0);        // Works!
```

::: warning 注意

boolean 和 Boolean是不同的类型.

boolean是基本数据类型,true 和 false是它的两种基本值.

Boolean是个对象object,表示两个值：true或false.
```js
> c = false    //原始值
false
> typeof c
'boolean'
> d = true    //原始值
true
> typeof d
'boolean'

> a = new Boolean(12)    //对象
[Boolean: true]
> typeof a
'object'
> b = new Boolean(false)    //对象
[Boolean: false]
> typeof b
'object'
```
:::

### Number

```js
// @flow
function acceptsNumber(value: number) {
  // ...
}

acceptsNumber(42);       // Works!
acceptsNumber(3.14);     // Works!
acceptsNumber(NaN);      // Works!
acceptsNumber(Infinity); // Works!
acceptsNumber("foo");    // Error!
```

### String

```js
// @flow
function acceptsString(value: string) {
  // ...
}

acceptsString("foo"); // Works!
acceptsString(false); // Error!
```

Javascript可以隐式地将其他类型的值转换为字符串类型,如：

```js
"foo" + 42; // "foo42"

"foo" + {}; // "foo[object Object]"
```

Flow中会报错.

```js
// @flow
"foo" + "foo"; // Works!
"foo" + 42;    // Works!
"foo" + {};    // Error!
"foo" + [];    // Error!
```

Flow中,我们必须显示转换类型：

```js
// @flow
"foo" + String({});     // Works!
"foo" + [].toString();  // Works!
"" + JSON.stringify({}) // Works!
```

### Null和Undefined

Flow类型中用 `void` 替代 JavaScript 中的 `undefined`.

```js
// @flow
function acceptsNull(value: null) {
  /* ... */
}

function acceptsUndefined(value: void) {
  /* ... */
}

acceptsNull(null);      // Works!
acceptsNull(undefined); // Error!
acceptsUndefined(null);      // Error!
acceptsUndefined(undefined); // Works!
```

### Maybe Type
Flow中`Maybe Type`包含两个很容易混淆的概念：变量的可选类型(`: ?`)和对象的可选属性(`? :`).

```js
// @flow
function acceptsMaybeString(value: ?string) {
  // ...
}

acceptsMaybeString("bar");     // Works!
acceptsMaybeString(undefined); // Works!
acceptsMaybeString(null);      // Works!
acceptsMaybeString();          // Works!
```

:::tip : ?类型

格式：`:` +  `空格` + `?` + `类型`

表示 acceptsMaybeString 类型中,可以没有 value 属性,但如果出现了 `value` 属性,其属性值不一定是 `string`,还可以是 `null` 或 `undefined`；

从另一个角度讲,只要 `value` 值不是 `null` 和 `undefined` 或 `空`,就必须是指定的 `string` 类型.
:::

``` js
// @flow
function acceptsObject(value: { foo?: string }) {
  // ...
}

acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
acceptsObject({ foo: null });      // Error!
acceptsObject({});                 // Works!
```
:::tip ? :类型

格式：`?` +  `空格` + `:` + `类型`

表示 `acceptsObject` 类型中,可以没有 `foo` 属性,但如果出现了 `foo` 属性,属性值必须是一个 `string` 或 `undefined`.

在 JavaScript 中,访问对象的某个不存在的属性,会返回 undefined；所以对象的可选属性,其属性值要么是指定的类型(如上例中的 string),要么就是 undefined,**不能是 null**.

从另一个角度讲,只要 foo 值不是  `undefined` 或 `空`,就必须是 指定的 `string` 类型.
:::

## 联合类型注释(Union Type)

### 语法
联合类型是通过`|`连接的任意数量的类型.
```js
Type1 | Type2 | ... | TypeN
```
### 示例
```js
// @flow
function toStringPrimitives(value: number | boolean | string) {
  return String(value);
}

toStringPrimitives(1);       // Works!
toStringPrimitives(true);    // Works!
toStringPrimitives('three'); // Works!

// $ExpectError
toStringPrimitives({ prop: 'val' }); // Error!
// $ExpectError
toStringPrimitives([1, 2, 3, 4, 5]); // Error!
```

#### 联合类型的每个成员可以是任何类型,甚至可以是另一个联合类型.

#### 示例
```js
type Numbers = 1 | 2;
type Colors = 'red' | 'blue'

type Fish = Numbers | Colors;
```

### 联结细化
如果是定义函数的参数是一个联结类型,需要在函数的内部针对每种类型都作出判断并进行相应处理.
这个过程称为类型的细化(Type Refinement).

### 示例
```js
// @flow
function toStringPrimitives(value: number | boolean | string) { // Error!
  if (typeof value === 'number') {
    return String(value);
  } else if (typeof value === 'boolean') {
    return String(value);
  } else {
    // 在这个代码块里,可以放心将参数 value 当成string类型
    // Flow 也会作出这样的推理
    return String(value);
  }
}
```

:::danger 注意
在函数内部,我们需要处理所有可能的类型.

如果我们不处理每种可能的值类型,Flow将给我们一个错误.

如上例中,我们需要处理value值为 number 或 boolean 或 string 的情况,如果少判断,就会报错.
:::

## 字面量类型注释(Literal Types)

在 Flow 中,字面量值也可以作为一种类型,符合这种类型的变量`只有这个字面量本身`.

给这个变量赋其他值, Flow 在进行类型检测时都会报错,比如下例所示.
```js
// @flow
function acceptsTwo(value: 2) {
  // ...
}

acceptsTwo(2);   // Works!
// $ExpectError
acceptsTwo(3);   // Error!
// $ExpectError
acceptsTwo("2"); // Error!
```

可以将其和联结注释一起使用：
```js
// @flow
function getColor(name: "success" | "warning" | "danger") {
  switch (name) {
    case "success" : return "green";
    case "warning" : return "yellow";
    case "danger"  : return "red";
  }
}

getColor("success"); // Works!
getColor("danger");  // Works!
// $ExpectError
getColor("error");   // Error!
```

## 混合类型(Mixed Types)

传入的值可以是任何类型，并且该函数仍然可以使用。

```js
function getTypeOf(value: mixed): string {
  return typeof value;
}

stringify("foo"); // Works!
stringify(3.14); // Works!
stringify(null); // Works!
stringify({}); // Works!
```

::: danger 注意
当使用mixed类型的值时，必须首先弄清楚实际的类型是什么，否则Flow报错。
:::

```js
// @flow
function stringify(value: mixed) {
  // $ExpectError
  return "" + value; // Error!
}

stringify("foo");
```
必须通过判断优化来确保该值是某种类型。
```js
// @flow
function stringify(value: mixed) {
  if (typeof value === 'string') {
    return "" + value; // Works!
  } else {
    return "";
  }
}

stringify("foo");
```

## 任意类型注释(Any Type)
给变量标注为 any 类型后,这个变量可以是任意值.

基本上相当于告诉 Flow：这个变量的类型我有把握，你不用管。
```js
// @flow
function add(one: any, two: any): number {
  return one + two;
}

add(1, 2);     // Works.
add("1", "2"); // Works.
add({}, []);   // Works.
```
> 在将 Flow 渐进的应用到你的项目中时，可能 Flow 针对某些变量的报错是不需要处理的，你可以标注为这种类型消除错误。

## 变量类型注释(Variable Types)
+ let和var- 可以重新分配的变量。
+ const- 无法重新分配的变量。

```js
var varVariable = 1;
let letVariable = 1;
const constVariable = 1;

varVariable = 2;   // Works!
letVariable = 2;   // Works!
// $ExpectError
constVariable = 2; // Error!

// @flow
const foo /* : number */ = 1;
const bar: number = 2;

// @flow
let foo: number = 1;
foo = 2;   // Works!
// $ExpectError
foo = "3"; // Error!
```

## 函数类型注释(Function Type)

```js
// @flow
function concat(a: string, b: string): string {
  return a + b;
}

concat("foo", "bar"); // Works!
// $ExpectError
// contact(): string 代表返回值，需要时string类型
concat(true, false);  // Error!
```

## 对象类型注释(Object Type)

#### 语法
```js
// @flow
// 函数声明 
var obj1: { foo: boolean } = { foo: true };
var obj2: {
  foo: number,
  bar: boolean,
  baz: string,
} = {
  foo: 1,
  bar: true,
  baz: 'three',
};
// 函数表达式
const greeting = function(welcome: string): void {
 console.log(welcome);
};
// 箭头函数
const addNumber = (a: number, b: number): number => (a + b);
```

::: warning 注意
来拆分名称/值对时,应该使用逗号,。
:::

上面这种写法非常不直观，类型定义内容跟对象本身混在一起；优化的方式是像下面这样`将类型定义和类型标注分开`。

```js {2}
// @flow
// type 是 Flow 中的关键字，用来定义自定义的类型，并且可以在后面的类型标注中使用
type BorderConfigType = {
    width: number,
    color: string,
    hasShadow: boolean
}

const borderConfig : BorderConfigType = {
    width: 10,
    color: 'red',
    hasShadow: true
}
```


## 数组类型注释(Array Type)

要创建数组类型，可以使用`Array<Type>`type,其中where Type是数组中元素的类型。
即Array 后接一对尖括号，且尖括号里边就是数组项的类型名称.
例如，要使用数字数组创建类型，请使用`Array<number>`.

```js
let arr:Array<number> = [1, 2, 3];
```
也可以放入其它类型：

```js
let arr1: Array<boolean> = [true, false, true];
let arr2: Array<string> = ["A", "B", "C"];
let arr3: Array<mixed> = [1, true, "three"]
```

#### 简写语法 `Type[T]`
即类型名称后加一对中括号,T 表示数组中每项的数据类型.
```js
let arr: number[] = [0, 1, 2, 3];
```

## 元组类型注释(Tuple Type)

另外一种常见的数组是元组（Tuple）。

在其他语言里，元组可能是一个特定的类型结构；但是在 JS 里，元组就是数组来表示的，并且是一个有限数组，数组每一项的类型分别标注出来.
我们可以用 `[type, type, type]` 创建元组.
```js
let tuple1: [number] = [1];
let tuple2: [number, boolean] = [1, true];
let tuple3: [number, boolean, string] = [1, true, "three"];
```
当我们从特定索引的元组中获取值时，它将返回该索引处的类型。

```js
// @flow
let tuple: [number, boolean, string] = [1, true, "three"];

let num  : number  = tuple[0]; // Works!
let bool : boolean = tuple[1]; // Works!
let str  : string  = tuple[2]; // Works!
```
通常的使用场景:比如一个用来表示数据库纪录的数组，比如函数返回多个返回值。

::: warning 注意
一个数组被标注为元组类型后，每一项的类型都不可再次改变，且数组的长度也不能改变.

因此对元组类型的数组进行 push、pop 操作，都是 Flow 不允许的。

访问不存在的索引也会导致出现索引越界错误。
```js
let none = tuple[3]; // Error!
```
:::

## 类 类型注释(Class Type)

每当我们要在Flow中使用类字段时，都必须首先为其添加注释，否则报错。
```js
// @flow
class MyClass {
  method() {
    // $ExpectError
    this.prop = 42; // Error!因为没有对 props 进行类型标注
  }
}

class WrongClass2 {
  method(){
    this.props: number = 1; // Error! Flow 还是会报错，对属性的类型标注必须与方法同一个层级
  }
}

class MyClass {
  prop: number;
  method() {
    this.prop = 42; // Work!
  }
}
const mc: MyClass = new MyClass();
```

## 类型别名(Type)

从上面我们知道，当我们需要要在多个位置用复杂类型时，可以为它们加上别名,这个别名也可以在其他地方使用.

>   类型别名是使用关键字`type`创建的。
```js
// @flow
type MyObject = {
  foo: number,
  bar: boolean,
  baz: string,
};

var val: MyObject = { /* ... */ };
function method(val: MyObject) { /* ... */ }
class Foo { constructor(val: MyObject) { /* ... */ } }
```

## 交叉类型注释(Union Type)

### 语法
```js
// 交叉点类型是由＆符连接的任何类型的类型
Type1 & Type2 & ... & TypeN
```

### 示例
```js
// @flow
type A = { a: number };
type B = { b: boolean };
type C = { c: string };

function method(value: A & B & C) {
  // ...
}

// $ExpectError
method({ a: 1 }); // Error!
// $ExpectError
method({ a: 1, b: true }); // Error!
method({ a: 1, b: true, c: 'three' }); // Works!
```

::: warning 注意
我们需要传入所有的类型,否则Flow将给我们一个错误,如上例.
:::

进一步理解：
定义为类型 C 的变量，其取值必须满足 A 类型约束，又满足 B 类型约束；

```js
// @flow
type X1 = 1 | 2 | 3 | 4 | 5
type X2 =         3 | 4 | 5 | 6 | 7
type X3 = X1 & X2;
```

在以上代码中，X3 就是一个交叉类型。类型为 X3 的变量，其取值必须受 X1 类型约束，又受 X2 的类型约束，所以取值只可能是 3 或者 4 或者 5；

```js
// @flow
type Y1 = {
  name: string,
  male: boolean
}
type Y2 = {
  name: string,
  age: number
}
type Y3 = Y1 & Y2;
```
而在这里例子中，类型那个 Y3 允许的取值是什么呢？

按照 X3 的经验，很可能认为其取值必须是一个对象，且对象有一个 name 属性，因为毕竟 Y1 和 Y2 只有 name 这么一个共有属性。

其实这么理解是不对的.
我们需要重新解读 Y1 和 Y2:
> 符合 Y1 类型的值，必须是一个对象，且必须有一个 name 属性，属性值是字符串类型；且有一个 male 属性，属性值是布尔值类型；
> 
> Y2同理。

而 Y3 必须受到 Y1 和 Y2 的约束。因此 Y3 类型的值必须：
1. 是一个对象；
2. 有 name 属性，属性值是字符串；
3. 有 male 属性，属性值是布尔值；
4. 有 age 属性，属性值是数字类型。

```js
// @flow
const wrong: Y3 = {  // Flow 会报错，因为缺少 male 和 age 属性
    name: 'y3' // Error!  
};

const right: Y3 = {  // Works！可以通过 Flow 的类型检测
   name: 'y3',
   male: true,
   age: 5
};
```

当我们开始使用 Flow 的时候，面临的需要进行类型标注的场景大部分都在上面了。
另外一些用法，请参照[官网Flow](https://flow.org/en/docs/types/)

## Flow 在 Vue.js 源码中的应用
有时候我们想引用第三方库，或者自定义一些类型，但 Flow 并不认识，因此检查的时候会报错。为了解决这类问题，Flow 提出了一个 `libdef` 的概念，可以用来识别这些第三方库或者是自定义类型，而 Vue.js 也利用了这一特性。

在 Vue.js 的主目录下有 `.flowconfig` 文件， 它是 Flow 的配置文件，感兴趣的同学可以看[官方文档](https://flow.org/en/docs/config/)。这其中的 `[libs]` 部分用来描述包含指定库定义的目录，默认是名为 `flow-typed` 的目录。

这里 `[libs]` 配置的是 `flow`，表示指定的库定义都在 `flow` 文件夹内。我们打开这个目录，会发现文件如下：

```
flow
├── compiler.js        # 编译相关
├── component.js       # 组件数据结构
├── global-api.js      # Global API 结构
├── modules.js         # 第三方库定义
├── options.js         # 选项相关
├── ssr.js             # 服务端渲染相关
├── vnode.js           # 虚拟 node 相关
```

可以看到，Vue.js 有很多自定义类型的定义，在阅读源码的时候，如果遇到某个类型并想了解它完整的数据结构的时候，可以回来翻阅这些数据结构的定义。

## 总结

通过对 Flow 的认识，有助于我们阅读 Vue 的源码，并且这种静态类型检查的方式非常有利于大型项目源码的开发和维护。类似 Flow 的工具还有如 TypeScript，感兴趣的同学也可以自行去了解一下。