## 相关网站
### 1. Vite中文官网：[Vite中文官网](https://cn.vitejs.dev/)
### 2. Vue3中文官网：[Vue3中文官网](https://v3.cn.vuejs.org/)
### 3. Element Plus官网：[Element Plus官网](https://element-plus.gitee.io/#/zh-CN/component/installation)
## 一、创建项目
### 安装Vite
```javascript
# npm
npm init @vitejs/app

# yarn
yarn create @vitejs/app
```
### 新建Vue3项目
```javascript
# npm 6.x
npm init @vitejs/app my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init @vitejs/app my-vue-app -- --template vue

# yarn
yarn create @vitejs/app my-vue-app --template vue
```

```javascript
// 支持的模板预设包括：
vanilla
vue
vue-ts // 推荐vue-ts模版
react
react-ts
preact
preact-ts
lit-element
lit-element-ts
```
## 二、修改依赖文件
打开项目，替换package.json文件
```javascript
{
  "name": "vite-vue3-templete",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "sass": "^1.32.8",
    "vue": "^3.0.5",
    "vue-router": "^4.0.3",
    "vuex": "^4.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.1.5",
    "@typescript-eslint/eslint-plugin": "^4.15.1",
    "@typescript-eslint/parser": "^4.15.1",
    "@vue/compiler-sfc": "^3.0.4",
    "eslint": "^7.20.0",
    "eslint-config-prettier": "^7.2.0",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-vue": "^7.6.0",
    "prettier": "^2.2.1",
    "typescript": "^4.1.3",
    "vite": "^2.0.5"
  }
}
```

## 三、配置ESLint
新建.eslintrc.js，添加以下代码
```javascript
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    es6: true,
    browser: true
  },
  globals: {
    Markdown: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'space-before-function-paren': 'off',
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'vue/require-default-prop': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    'vue/comment-directive': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off'
  }
}

```
## 三、配置prettierrc
新建.prettierrc，添加以下代码
```javascript
{
  "eslintIntegration": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "vueIndentScriptAndStyle": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "bracketSpacing": true,
  "trailingComma": "none",
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "arrowParens": "always",
  "insertPragma": false,
  "requirePragma": false,
  "proseWrap": "never",
  "htmlWhitespaceSensitivity": "strict",
  "endOfLine": "lf"
}
```
## 四、配置全局Scss
1、在/src/assets/下新建commom.scss文件
2、修改vite.config.ts代码
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 公共样式
  css: {
    // 🔥此处添加全局scss🔥
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/common.scss";'
      }
    }
  },
  // 服务
  server: {
    open: false,
    port: 8080,
    // 代理配置
    proxy: {
      '/api': 'http://192.168.20.88:8888',
    }
  },
  build: {
    // 打包后目录,默认dist
    outDir: 'dist',
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: []
  },
  // 生产环境路径，类似webpack的assetsPath
  base: './',
})
```
## 五、安装依赖、启动项目
```javascript
 // 安装依赖
 cnpm i

 // 启动项目
 npm run dev
```

## 六、总结和注意事项
![!\[在这里插入图片描述\](https://img-blog.csdnimg.cn/20210309230056845.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzkzMTg3Ng==,size_16,color_FFFFFF,t_70](https://img-blog.csdnimg.cn/20210309230843606.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzkzMTg3Ng==,size_16,color_FFFFFF,t_70)

 一个由Vite构建的Vue3项目就搭建好了，支持TypeScript语法，CSS预处理器为Sass，使用ESLint和prettierrc风格格式化代码
 Tips：安装新依赖请添加【--save】：
```javascript
  npm i xxx --save
  // 或
  cnpm i xxx --save
  // 或
  yarn add xxx --save
  // --save不写的话，新的依赖文件不会写进package.json文件中
```
## 七、最后附上我自己的VScode settings.json配置

```javascript
{
  "editor.fontSize": 16, // 控制字体大小(像素)。
  "files.autoSave": "onWindowChange", // 当窗口失去焦点时，将自动保存未保存的编辑器。
  "editor.formatOnSave": false, // 在保存时格式化文件。格式化程序必须可用，延迟后文件不能保存，并且编辑器不能关闭。
  "editor.formatOnType": true, // 控制编辑器在键入一行后是否自动格式化该行。
  "git.ignoreMissingGitWarning": true, // 忽略“缺失 Git”的警告。
  "workbench.activityBar.visible": true, // 控制工作台中活动栏的可见性。
  "workbench.statusBar.visible": true, // 控制工作台底部状态栏的可见性。
  "workbench.startupEditor": "newUntitledFile", // 打开新的无标题文件 (仅在打开空工作区时适用)。
  "terminal.integrated.fontSize": 16, // 控制终端的字号(以像素为单位)。
  "open-in-browser.default": "chrome", // 打开默认浏览器
  "explorer.confirmDelete": false, // 控制资源管理器是否在把文件删除到废纸篓时进行确认。
  "explorer.confirmDragAndDrop": false, // 控制在资源管理器内拖放移动文件或文件夹时是否进行确认。
  "eslint.options": {
    "extensions": [
      ".js",
      ".vue"
    ]
  },
  "eslint.validate": [ "javascript", "javascriptreact", "vue-html",
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    }
  ],
  "eslint.autoFixOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "terminal.integrated.rendererType": "dom", // dom: 使用基于回退 DOM 的呈现器。
  "git.path": "F:\\Git\\bin\\git.exe", // Git 可执行文件的路径和文件名
  "workbench.sideBar.location": "left", // 控制侧边栏和活动栏的位置。它们可以显示在工作台的左侧或右侧。
  "editor.fontFamily": "JetBrains Mono,Consolas, 'Courier New', monospace", // 字体
  "editor.tabSize": 2, // 一个制表符等于的空格数。
  "editor.detectIndentation": false, // 控制是否在打开文件时，基于文件内容自动检测
  "git.confirmSync": false, // 同步 Git 存储库前请先进行确认。
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript",
    "*.nvue": "vue"
  },
  "workbench.colorTheme": "One Monokai", // 主题
  "workbench.iconTheme": "material-icon-theme", // 主题
  "material-icon-theme.showWelcomeMessage": false, // 首次安装后显示欢迎信息。
  "search.followSymlinks": false, // 控制是否在搜索中跟踪符号链接。
  "emmet.includeLanguages": { // 在默认不受支持的语言中启用 Emmet 缩写。
    "wxml": "html"
  },
  "minapp-vscode.disableAutoConfig": true, // 默认在启动时会自动相关文件关联的配置项，配置成功后会将此配置自动设置成 true，避免下次启动再重新配置
  "[json]": {
    "editor.quickSuggestions": { // 控制是否在键入时自动显示建议。
      "strings": true
    },
    "editor.suggest.insertMode": "replace", // 控制接受补全时是否覆盖单词。请注意，这取决于扩展选择使用此功能。
    "editor.defaultFormatter": "HookyQR.beautify" // 定义一个默认格式化程序, 该格式化程序优先于所有其他格式化程序设置。必须是提供格式化程序的扩展的标识符。
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features" // 定义一个默认格式化程序, 该格式化程序优先于所有其他格式化程序设置。必须是提供格式化程序的扩展的标识符。
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features" // 定义一个默认格式化程序, 该格式化程序优先于所有其他格式化程序设置。必须是提供格式化程序的扩展的标识符。
  },
  // 对EasyLess的配置，此段配置去掉则默认生成一个css文件
  "less.compile": {
    "compress": false, //是否压缩
    "sourceMap": false, //是否生成map文件
    "out": true, // 是否输出文件，false为不输出
    // "outExt": ".wxss", // 输出文件的后缀,小程序可以写'wxss'
    "outExt": ".css", // 输出文件的后缀,小程序可以写'wxss'
  },
  "editor.fontLigatures": "null", // 启用/禁用字体连字("calt" 和 "liga" 字体特性)。将此更改为字符串，可对 "font-feature-settings" CSS 属性进行精细控制。
  "javascript.updateImportsOnFileMove.enabled": "always",
  "workbench.editor.enablePreview": false,
  "[wxml]": {
    "editor.defaultFormatter": "qiu8310.minapp-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "prettier.semi": false,
  "window.zoomLevel": -1,
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  },
  "git.ignoreRebaseWarning": true,
  "diffEditor.ignoreTrimWhitespace": false,
  "editor.renderIndentGuides": false,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```