/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 18:52:12
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-07-19 14:26:42
 * @FilePath: \webUI\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'; // 开启gzip
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr:true,
    port: 9008,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:8000/'
      }
    }
  },
  resolve: {
    alias:{
      "@": path.resolve(__dirname, "src"),
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ]
    }),
    viteCompression()
  ],
  build: {
    //指定输出路径
    // 指定输出文件路径
    outDir: "dist",
    assetsDir: 'static',
    // 代码压缩配置
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  }
})
