

# 知道居中元素的宽高

## absolute + 负margin

代码实现

```
.wrapBox5{
    width: 300px;
    height: 300px;
    border:1px solid red;
    position: relative;
}
.wrapItem5{
    width: 100px;
    height: 50px;
    position: absolute;
    background:yellow;
    top: 50%;
    left:50%;
    margin-top: -25px;
    margin-left: -50px;
}

```


## absolute + margin auto

* 代码实现

```
.wrapBox{
    width: 300px;
    height: 300px;
    background: yellow;
    position: relative;
}
.wrapItem{
    width: 100px;
    height: 50px;
    background:green;
    display: inline-block;
    position: absolute;
    top: 0px;
    bottom:0px;
    left: 0px;
    right: 0px;
    margin:auto;
}
```
在这里插入图片描述

## absolute + calc

* 代码实现

```
.wrapBox6{
    width: 300px;
    height: 300px;
    border:1px solid green;
    position: relative;
}
.wrapItem6{
    width: 100px;
    height: 50px;
    position: absolute;
    background:yellow;
    top: calc(50% - 25px);
    left:calc(50% - 50px);
}
```

## 三种对比总结

当居中元素知道宽高的时候，设置居中的方式比较简单单一。三种方法的本质是一样的，都是对居中元素进行绝对定位，在定位到上50%，左50%后再拉回居中元素的一半宽高实现真正的居中。三种方式的区别就在于拉回元素本身宽高的方式不同。

# 居中元素的宽高未知

## absolute + transform

* 代码实现

```
.wrapBox{
    width: 300px;
    height: 300px;
    background:#ddd;
    position: relative;
}
.wrapItem{
    width: 100px;
    height: 50px;
    background:green;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50% , -50%);
}
```

### 原理

* 原理类似于已知宽高的实现方式，只不过当前居中元素宽高未知，所以需要自动获取当前居中元素的宽高。translate属性正好实现了该功能。

- 优缺点
- 优点：自动计算本身的宽高
- 缺点：如果同时使用transform的其他属性会产生相互影响。
- 所以：在不使用transform的其他属性时推荐使用该方式

## flex布局

```
.wrapBox2{
    width: 300px;
    height: 300px;
    background: blue;
    display: flex;
    justify-content: center;
    align-items: center;
}
/*注意：即使不设置子元素为行块元素也不会独占一层*/
.wrapItem2{
    width: 100px;
    height: 50px;
    background:green;
}
```

### 原理

- 将父级元素设置为流式布局，根据flex布局的属性特性，设置子元素居中。

- 优缺点
- 优点：flex布局灵活，不需要对子元素进行任何的设置
- 缺点：具有兼容性。子元素的float、clear、position等无法使用，如果同时具有其他布局，容易产生影响。

## table-cell布局

### 代码实现

```
.wrapBox3{
    width: 300px;
    height: 300px;
    background: yellow;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.wrapItem3{
    width: 100px;
    height: 50px;
    background:green;
    display: inline-block;
}
```


### 原理

- 根据table的vertical-align属性，可以在表格元素内设置元素居中，再根据text-align设置水平居中

## table元素

### 代码实现

```
.tableBox{
    border:2px solid yellow;
    width: 300px;
    height: 300px;
}
.tableBox table{
    width:100%;
    height:100%;
}
.centerWrap{
    text-align: center;
    vertical-align: middle;
}
.centerItem{
    display: inline-block;
    background:pink;
}
```

### 总结

使用table标签进行布局，主要还是使用了vertical-align属性和text-align属性。但是相对于上一种方式，使用table标签会产生大量的冗余代码。不推荐使用