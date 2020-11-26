# NideShop 商城（后台管理端）

- 基于 Node.js、Vue.js、Element UI、Electron）

**注意：由于原作者不再维护，我们 fork 了次仓库继续添砖加瓦，当前版本功能还未完善，商用需谨慎。**

本项目需要配合 NideShop 商城服务端使用，GitHub: [https://github.com/Run2948/nideshop](https://github.com/Run2948/nideshop)

#### 功能列表

- 管理员登录
- 商品管理
- 商品分类
- 品牌管理
- 会员管理
- 订单管理

....

#### 项目结构

```
├─src
│  │  index.ejs
│  │
│  ├─main
│  │      index.dev.js
│  │      index.js
│  │
│  └─renderer
│      │  App.vue
│      │  main.js
│      │
│      ├─assets
│      │      .gitkeep
│      │      logo.png
│      │
│      ├─components
│      │  │  DashboardPage.vue
│      │  │  LoginPage.vue
│      │  │  WelcomePage.vue
│      │  │
│      │  ├─Brand
│      │  │      BrandAddPage.vue
│      │  │      BrandPage.vue
│      │  │
│      │  ├─Category
│      │  │      CategoryAddPage.vue
│      │  │      CategoryPage.vue
│      │  │
│      │  ├─Common
│      │  │      Navbar.vue
│      │  │      Sidebar.vue
│      │  │
│      │  ├─Goods
│      │  │      GoodsAddPage.vue
│      │  │      GoodsPage.vue
│      │  │
│      │  ├─Order
│      │  │      OrderDetailPage.vue
│      │  │      OrderPage.vue
│      │  │
│      │  ├─Topic
│      │  │      TopicAddPage.vue
│      │  │      TopicPage.vue
│      │  │
│      │  └─User
│      │          UserAddPage.vue
│      │          UserPage.vue
│      │
│      └─router
│              index.js
│
└─static
        .gitkeep
│  .babelrc
│  .gitignore
│  .prettierrc
│  .travis.yml
│  appveyor.yml
│  LICENSE
│  package-lock.json
│  package.json
│  README.md

```

#### 测试账号

admin admin888

#### 交流

喜欢别忘了 Star，有问题可通过 QQ 群：1040822138 联系我们，谢谢您的关注。

[点击链接加入群聊【NideShop 舔砖加瓦】](https://jq.qq.com/?_wv=1027&k=biLhogLL)

#### Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
