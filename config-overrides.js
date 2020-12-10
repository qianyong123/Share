
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackExternals } = require('customize-cra');
const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const myPlugin = [
  new UglifyJsPlugin(
    {
      uglifyOptions: {
        warnings: false,
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    }
  )
]


module.exports = {
  // webpack.config
  webpack: override(
    fixBabelImports('import', {//配置按需加载
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({//配置antd自定义主题
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#eb5055' },
      }
    }),
    addWebpackAlias({ //路径别名
      '@': path.resolve(__dirname, 'src'),
      'server': path.resolve(__dirname, 'server'),
    }),
    addWebpackExternals({ //不做打包处理配置，如直接以cdn引入的
      echarts: "window.echarts",
       AMapUI:"window.AMapUI"
    }),
    (config) => { //暴露webpack的配置 config ,evn
      // 去掉打包生产map 文件
      config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
      if (process.env.NODE_ENV !== "development") config.plugins = [...config.plugins, ...myPlugin]
      // 修改打包地址
      if (process.env.NODE_ENV === 'development') {
        console.log('evn is development, skip build path change...')
      } else if (process.env.NODE_ENV === 'production') {
        console.log('evn is production, change build path...')
        config.devtool = false;
        // 修改path目录
        const paths = require('react-scripts/config/paths');
        paths.appBuild = path.join(path.dirname(paths.appBuild), '/server/public');
        config.output.path = path.join(path.dirname(config.output.path), '/server/public');
      }

      //1.修改、添加loader 配置 :
      // 所有的loaders规则是在config.module.rules(数组)的第二项
      // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)


      const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
      // console.log(loaders)
      // 添加插件
      loaders.push({
        test: /\.md$/,
        use: "raw-loader"
      })
      // 修改 sass 配置 ，规则 loader 在第五项(具体看配置) sass在6,7,less在8，9项
      //   loaders[5].use.push({
      //     loader: 'sass-resources-loader',
      //     options: {
      //       resources: path.resolve(__dirname, 'src/asset/base.scss')//全局引入公共的scss 文件
      //     }
      // })


      return config
    }
  )
} 