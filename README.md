# 知乎日报-WebApp

## 前端

技术栈：create-react-app、React18、redux/react-redux「你可以使用mobx或者reduxjs/toolkit」、react-router-dom V6、Fetch、less、AntdMobile...

从零开始构建React项目「本项目不采用任何系解决方案（例如：淘系），就是基于最纯正的React实现开发」
  1. 基于create-react-app创建工程化项目

    $ npm i create-react-app -g
    $ create-react-app 项目名
    ---
    $ yarn eject 暴露webpack配置项
    修改脚手架默认的配置
      + 配置less：less/less-loader@8
      + 配置别名 @ 代表 src 目录「选配」
      + 配置浏览器兼容
      + 配置客户端启动服务的信息
      + 配置跨域代理：http-proxy-middleware
      + 配置REM响应式布局的处理：lib-flexible、postcss-pxtorem
      + 配置打包优化
      + ...
  2. 准备一些项目开发必备的材料

    src/api/http.js：fetch请求的二次封装
    src/assets：
      + reset.min.css 清除浏览器默认样式
      + images 静态资源图片
      + utils.js 自己封装的常用方法库
      + ...
  3. 配置好REM响应式布局 && 样式处理

    lib-flexible 设置REM和PX换算比例的
      + 根据设备宽度的变化自动计算
      + html.style.fontSize=设备的宽度/10+'px';
      + 750设计稿中  1REM=75PX : 初始换算比例
      + 375设备上 1REM=37.5PX
    postcss-pxtorem 可以把我们写的PX单位，按照当时的换算比例，自动转换为REM，不需要我们自己算了
    ----
    @1 假设设计稿还是750的，我们测出来多少尺寸，我们写样式的时候，就写多少尺寸，并且不需要手动转换为REM「我们在webpack中，针对postcss-pxtorem做配置，让插件帮我们自动转换」
       const px2rem = require('postcss-pxtorem');
       px2rem({
         rootValue: 75, // 基于lib-flexible,750设计稿,就会设置为1REM=75PX；此时在webpack编译的时候，我们也需要让px2rem插件，按照1REM=75PX，把我们测出来的并且编写的PX样式，自动转换为REM；
         propList: ['*'] // 对所有文件中的样式都生效{AntdMobile组件库中的样式}
       })
    @2 在入口中，我们导入lib-flexible，确保在不同的设备上，可以等比例的对REM的换算比例进行缩放！！
    @3 手动设置：设备宽度超过750PX后，不再继续放大！！

  4. 配置路由管理
  5. 配置redux架子
  6. 其它的基础框架配置
  7. 逐一开发项目，注意组件的抽离封装
  8. 开发完毕后
     + 项目优化
     + 封装提取
     + 内部测试
     + 部署上线 

## 后端

知乎日报-后端 zhihu_admin
  后端的数据接口分为两部分
    + 从知乎日报官方实时拉取数据「新闻、新闻详情、新闻的评论数...」
        + 自己研发的个人中心系统「登录/注册、发送验证码、个人信息获取和修改、收藏体系...」
    后端技术栈：
        + Node、Express
        + 数据存储：我采用json文件的方式代替了专业的数据库存储「mongodb、MySQL」
    如何启动和配置更改
          @1 跑环境
          @2 在package.json中，修改后端服务的配置项
       "config": {
               "server": 7100, //后端启动服务器的端口号
               "secret": "ZFPX", //和JWT算法相关的
               "maxAge": "7d"
        }
          @3 API.txt 接口文档
       code.txt 存储发送的手机验证码
          @4 启动后端
       $ node server.js   终端窗口关闭，启动的服务器就会停止
       ---
       $ pm2 start server.js --name ZHIHU  基于pm2持久管理服务
        @5 验证后端是否启动成功
       http://127.0.0.1:7100/news_latest 可以获取数据，则说明启动成功

=====================
React DOM-DIFF 算法
  在ReactV16及以前：新老虚拟DOM对比
  在ReactV17及以后：老的DOM会构建出Fiber链表，拿最新创建的虚拟DOM和Fiber链表做对比

  1. 优化原则 

    + 同级对比
    + 不同类型的元素,会产出不同的结构:销毁老结构,创建新结构
    + 可以通过key标识移动的元素

  2. 原来和现在都只有一个节点
    如果不设置key，则默认元素的“索引”就是key
    key和“类型”都相同：

    + 更新且复用老的节点 Update(4)
  key和“类型”只要有一个不同：
    + 删除老的 Deletion(8)
    + 插入新的 Placement(2)
    插入并更新，也就是挪动位置：PlacementAndUpdate(6) 

  3. 原来多个节点，现在一个节点

    key不同，继续向下比，当前标记为删除！！
    key相同，遵循2
    其余旧的节点全部标记为删除！！

  4. 原来一个节点，现在多个节点

    key不同，继续向下比，当前标记为新增！！
    key相同，遵循2
    其余新的节点全部标记为新增！！

  5. 原来和现在都是多节点

    会经历二轮遍历
      + 第一轮：主要是处理节点的更新
      + 第二轮：主要处理节点的新增、删除和移动
      + 移动时的原则是尽量少量的移动，如果必须有一个要动，新地位高的不动，新地位低的动  lastPlacedIndex=0
      + key不同退出第一轮循环
    例如：之前是A/B/C/D/E/F  现在是A/C/E/B/G
      第二轮遍历之前，会拿老的节点创建map对象，拿新的节点去老的节点中找相同key值进行比较！！
      最后渲染的时候，先执行标记为8的（也就是删除）、然后执行标记为4的（也就是更新）、然后是标记为6的（也就是移动）、最后是标记为2的（也就是新增）

  6. 循环创建元素需要设置唯一的key，不建议使用索引作为key值！！！