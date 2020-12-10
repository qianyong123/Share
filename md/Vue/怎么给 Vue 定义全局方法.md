
# 怎么给 Vue 定义全局方法

### 一、将方法挂载到 Vue.prototype 上面

缺点：调用这个方法的时候没有提示
```js
// global.js
const RandomString = (encode = 36, number = -8) => {
  return Math.random() // 生成随机数字, eg: 0.123456
    .toString(encode) // 转化成36进制 : "0.4fzyo82mvyr"
    .slice(number);
},
export default {
	RandomString,
  ...
}
```
```js
// 在项目入口的main.js里配置
import Vue from "vue";
import global from "@/global";
Object.keys(global).forEach((key) => {
  Vue.prototype["$global" + key] = global[key];
});
```
```js
// 挂载之后，在需要引用全局变量的模块处(App.vue)，不需再导入全局变量模块，而是直接用this就可以引用了，如下:
export default {
  mounted() {
    this.$globalRandomString();
  },
};
```

### 二、利用全局混入mixin

优点：因为mixin里面的methods会和创建的每个单文件组件合并。这样做的优点是调用这个方法的时候有提示
```js
// mixin.js
import moment from 'moment'
const mixin = {
  methods: {
    minRandomString(encode = 36, number = -8) {
      return Math.random() // 生成随机数字, eg: 0.123456
        .toString(encode) // 转化成36进制 : "0.4fzyo82mvyr"
        .slice(number);
    },
    ...
  }
}
export default mixin
```

```js
// 在项目入口的main.js里配置
import Vue from 'vue'
import mixin from '@/mixin'
Vue.mixin(mixin)
```

```js
export default {
 mounted() {
   this.minRandomString()
 }
}
```

### 三、使用Plugin方式

Vue.use的实现没有挂载的功能，只是触发了插件的install方法，本质还是使用了Vue.prototype。
```js
// plugin.js
function randomString(encode = 36, number = -8) {
  return Math.random() // 生成随机数字, eg: 0.123456
    .toString(encode) // 转化成36进制 : "0.4fzyo82mvyr"
    .slice(number);
}
const plugin = {
  // install 是默认的方法。
  // 当外界在 use 这个组件或函数的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
  install: function(Vue){
    Vue.prototype.$pluginRandomString = randomString
    ...
  },
}
export default plugin
```

```js
// 在项目入口的main.js里配置
import Vue from 'vue'
import plugin from '@/plugin'
Vue.use(plugin)
```
```js
export default {
 mounted() {
   this.$pluginRandomString()
 }
}
```

### 四、任意 vue 文件中写全局函数
```js
// 创建全局方法
this.$root.$on("test", function () {
  console.log("test");
});
// 销毁全局方法
this.$root.$off("test");
// 调用全局方法
this.$root.$emit("test");
```
