import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
// 按需导入 start
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 按需导入 end
// 模块联邦
import federation from "@originjs/vite-plugin-federation";

// 打包大小分析 start
import { visualizer } from 'rollup-plugin-visualizer';
// 打包大小分析 end

import vue from '@vitejs/plugin-vue'

// 预演
// import plu from './vite-plugin-dynamic-config.js'
import RouterModules from './src/router/put'
// 获取pakeage.json name
import { name } from './package.json'
function resolve (dir) {
  return fileURLToPath(new URL(`./${dir}`, import.meta.url))
}
const pathSrc = path.resolve(__dirname, 'typings')
const exposes = {}
const RouterModulesKeys = Object.keys(RouterModules)
RouterModulesKeys.forEach((key) => {
  const src = RouterModules[key].replace(/^@\//, resolve('src') + '/')
  exposes[`./${key}`] = src
})
console.log(exposes, 1234567)
export default defineConfig(({ mode }) => {
  console.log(mode, 1234567)
  return {
    build: {
      target:'es2022',
      rollupOptions: {
        plugins: [visualizer({ open: true, filename: 'bundle-report.html' })]
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          ElementPlusResolver({
            noStylesComponents: ['ElTreeNode']
          }),
        ],
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
      Icons({
        autoInstall: true,
      }),
      federation({
        name,
        filename: "remoteEntry.js",
        exposes: {
          './store': './src/stores/index.ts',
          './asyncComponent': './src/router/asyncComponent.ts',
          ...exposes,
        },
        shared: ["vue", "vue-router", "element-plus", "@element-plus/icons-vue", "pinia"],
      })
    ],
    // 代理  'http://192.168.0.15:9090/’
    server: {
      proxy: {
        '/service': {
          target: 'http://test.erpapi.shichujituan.com',
          changeOrigin: true, // 需要虚拟主机站点
        }
      }
    }
  }
})
