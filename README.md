# Vue 3 + TypeScript + Webpack 多页面应用 (MPA)

这个项目是一个基于 Vue 3、TypeScript 和 Webpack 的多页面应用（MPA）。它展示了如何将最新的前端技术栈应用于传统的多页面应用架构中，以便于构建大型、可扩展的前端项目。

## 特性

- **Vue 3**: 利用 Vue 3 的组合式 API，提供更灵活的组件逻辑复用方式。
- **TypeScript**: 应用 TypeScript 提高代码的可维护性和开发效率。
- **Webpack**: 自定义 Webpack 配置，优化资源打包和管理。
- **多页面应用**: 每个页面作为独立入口，适合传统的多页面应用需求。

## 项目结构

```shell
.
├── package-lock.json
├── package.json
├── public
│   ├── home
│   │   └── index.html
│   └── xxx
├── shims-vue.d.ts
├── shims.d.ts
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   │   ├── home
│   │   │   ├── index-entry.ts
│   │   │   └── index.vue
│   │   └── xxx
│   ├── router
│   └── store
├── tsconfig.json
└── webpack.config.js
```
