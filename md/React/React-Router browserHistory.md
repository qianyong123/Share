

在React项目中我们经常需要采用React-Router来配置我们的页面路由，React-Router 是建立在 history 之上的，常见的history路由方案有三种形式，分别是：

- hashHistory
- browserHistory
- createMemoryHistory
- hashHistory 使用 URL 中的 hash（#）部分去创建形如 example.com/#/some/path 的路由。

- browserHistory 是使用 React-Router 的应用推荐的 history方案。它使用浏览器中的 History API 用于处理 URL，创建一个像example.com/list/123这样真实的 URL 。

- 一个采用browserHistory的React-router配置可能如下：

```
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory} from 'react-router';
 
import Index from "../routes/HelloWorld";
import List from "../routes/BlogList";
import About from "../routes/About";
 
class App extends React.Component {
    render() {
        return (
            <div>
                <ul>
                  <li><IndexLink to="/">首页</IndexLink></li>
                  <li><Link to="/list">List</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}
 
ReactDOM.render(
    <Router history = {browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}/>
          <Route path="list" component={List}/>
          <Route path="about" component={About}/>
        </Route>
    </Router>,
    document.getElementById("APP")
);

```

但是我们当我们采用browserHistory方案时，通常会遇到浏览器刷新404 的问题。

# 问题描述

- 在React + React-router实现的SPA(单页面应用)项目中，当我们路由模式采用browserHistory时，点击每个导航都可以显示正确的页面，一旦浏览器刷新，页面就显示Cannot GET（404）。

- 如当我们点击List链接，进入List页面之后，正常显示List页面内容，这时如果我们刷新页面，页面将会出错，返回Cannot GET /list。

# 问题分析

- 当刷新页面时，浏览器会向服务器请求example.com/list，服务器实际会去找根目录下list.html这个文件，发现找不到，因为实际上我们的服务器并没有这样的 物理路径/文件 或没有配置处理这个路由，所有内容都是通过React-Router去渲染React组件，自然会报404错误。这种情况我们可以通过配置Nginx或通过自建Node服务器来解决。

# Nginx方式

采用Nginx方案需要先将所有资源打包生成到对应的目录，比如dist，然后做如下配置：

```
server {
	server_name react.thinktxt.com;
	listen 80;
 
	root /Users/txBoy/WEB-Project/React-Demo/dist;
	index index.html;
	location / {
    	try_files $uri /index.html;
  	}
}
```

- 通过配置Nginx，访问任何URI都指向index.html，浏览器上的path，会自动被React-router处理，进行无刷新跳转。

# 通过修改webpack-dev-server运行方式

这个解决方法很简单，直接在运行时加入参数“–history-api-fallback”就可以了。我们修改package.json相关的代码:

```
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server  --inline --devtool eval --progress --colors --hot --content-base ./build --history-api-fallback"
},

```

# Node服务端配置

一个express应用的配置示例：
```
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
 
//加载指定目录静态资源
app.use(express.static(__dirname + '/dist'))
 
//配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})
 
app.listen(port, function () {
  console.log("server started on port " + port)
})
```
一个Koa应用的配置示例：
```
import Koa from 'koa';
import xtpl from 'koa-xtpl';
import path from 'path';
 
const app = new Koa();
const port = process.env.PORT || 8081;
 
app.use(xtpl({
	root: path.resolve(__dirname, '../dist'),
	extname: 'html',
	commands: {}
}));
 
app.use(async(ctx, next) => {
	await ctx.render('index', {});
});
 
app.listen(port, () => {
	console.log('Server started on port' + port);
});
```
注意: 由于koa的这种方式端口与webpack-dev-server（8080）必须不同，所以还需要配合Nginx代理。例如：

```
server {
	server_name react.thinktxt.com;
	listen 80;
 
	location / {
		proxy_pass http://localhost:8081;
	}
}
 
server {
	server_name static.react.thinktxt.com;
	listen 80;
 
	location / {
		proxy_pass http://localhost:8080;
	}
}
```

既然我们的Nginx代理用了真实域名，自然别忘了修改一下host，如下：

```
127.0.0.1 react.thinktxt.com
127.0.0.1 static.react.thinktxt.com
```

这样我们就大功告成了，可以happy的在地址栏直接访问任何采用browserHistory方式配置的路由页面了。

