

# Vue 中父组件怎么监听到子组件的生命周期


### 一、使用 on 和 emit
```
// Parent.vue
<Child @mounted="doSomething"/>
// Child.vue
mounted() {
  this.$emit("mounted");
}
```

### 二、使用 hook 钩子函数
```
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 .
```