
# 数据类型

- js里面的数据类型有基本数据类型和引用数据类型。
- 基本数据类型：Undefined、Null、Boolean、Number和String
- 引用类型：Object、Array

# 基本类型的存储

基本数据类型的值存在栈里面，并且值与值之间独立存在，修改一个值，不会影响其他的值

# 引用数据类型存储

- 对象保存在堆内存中。
- 每创建一个新的对象就会在堆内存开辟一个新的空间。
- 变量保存的是内存地址(对象引用)。
- 两个变量保存同一个引用,一个变量修改属性时,另一个变量属性值也会变化。
- 引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。
- 浅拷贝和深拷贝主要是对引用数据类型的。

# 浅拷贝实现的方法

* Object.assign()
```
 var obj = { a: 1, arr: [2, 3] };
 var obj2 = Object.assign({}, obj)
 console.log(obj2) //{ a:1, arr: [2,3] }
 obj.a = 66
 obj.arr[0] = 66
 console.log(obj2) //{ a:1, arr: [66,3] }
```
* Object.assign()方法可以将任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是该方法拷贝的时候是浅拷贝，拷贝的是对象的属性的引用，并不是对象本身。（注意：当object只有一层的时候，就是浅拷贝）

* Array.prototype.concat()
* Array.prototype.slice()
* es6扩展运算符 ...

# 深拷贝的实现方法

- JSON.parse(JSON.stringify()), 这个有缺点，不能复制funtion.
- 递归的形式遍历每一项值，一直遍历到每项值都是基本数据类型为止。

# 定义检测数据类型的功能函数

```
function isObject(obj) {
 return typeof obj === 'object' && obj != null;
  }
 function cloneDeep(source) {

 if (!isObject(source)) return source; // 非对象返回自身

 var target = Array.isArray(source) ? [] : {};
 for (var key in source) {
 if (Object.prototype.hasOwnProperty.call(source, key)) {
 if (isObject(source[key])) {
 target[key] = cloneDeep(source[key]); // 注意这里
        } else {
 target[key] = source[key];
        }
      }
    }
 return target;
}
```