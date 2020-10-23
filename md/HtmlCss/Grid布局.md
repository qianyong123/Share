
# 最强大的 CSS 布局 —— Grid 布局

## Grid 布局是什么？

Grid 布局即网格布局，是一种新的 CSS 布局模型，比较擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系。号称是最强大的的 CSS 布局方案，是目前唯一一种 CSS 二维布局。

## Grid 布局和 flex 布局

讲到布局，我们就会想到 flex 布局，甚至有人认为竟然有 flex 布局了，似乎没有必要去了解 Grid 布局。但 flex 布局和 Grid 布局有实质的区别，那就是 flex 布局是一维布局，Grid 布局是二维布局。flex 布局一次只能处理一个维度上的元素布局，一行或者一列。Grid 布局是将容器划分成了“行”和“列”，产生了一个个的网格，我们可以将网格元素放在与这些行和列相关的位置上，从而达到我们布局的目的。
Grid 布局远比 flex 布局强大！

## Grid 布局属性可以分为两大类，一类是容器属性，一类是项目属性。我们先来看容器属性

## 容器属性

- **display：grid**： 则该容器是一个块级元素
- **display: inline-grid**： 则容器元素为行内元素
- **grid-template-columns**：属性设置列宽
- **grid-template-rows**：属性设置行高
- **repeat()** 函数：可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值

```css
.wrapper-1 {
  display: grid;
  /*固定列宽为 200px 100px 200px*/
  grid-template-columns: 200px 100px 200px;
    /*  行和列的间距 */
  grid-gap: 5px;
  /*  2行，而且行高都为 50px  */
  grid-template-rows: repeat(2, 50px); /* 等同于 grid-template-rows: 50px 50px; */
}

```

- **auto-fill** 关键字：表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格。**grid-template-columns: repeat(auto-fill, 200px)** 表示列宽是 200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素，

 - **fr** 关键字：Grid 布局还引入了一个另外的长度单位来帮助我们创建灵活的网格轨道。fr 单位代表网格容器中可用空间的一等份。**grid-template-columns: 200px 1fr 2fr** 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。

 - **auto** 关键字：由浏览器决定长度。通过 auto 关键字，我们可以轻易实现三列或者两列布局。**grid-template-columns: 100px auto 100px** 表示第一第三列为 100px，中间由浏览器决定长度

 - **grid-row-gap** 属性、**grid-column-gap**属性分别设置行间距和列间距。**grid-gap** 属性是两者的简写形式。

 






