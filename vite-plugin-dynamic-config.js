// vite-plugin-dynamic-config.js
// import * as RouterModules from './src/router/export'
export default function DynamicConfigPlugin() {
  return {
    name: 'dynamic-config',
    config(config, { command }) {
      console.log(2222, command)
      // 导入'./src/router/export'
      if (command === 'build') {
        // 修改 config 对象
      }
    }
  };
}
