// vite-plugin-dynamic-config.js
export default function DynamicConfigPlugin() {
  return {
    name: 'dynamic-config',
    config(config, { command }) {
      // console.log(2222, command, config)s
      if (command === 'build') {
        // 修改 config 对象
      }
    }
  };
}
