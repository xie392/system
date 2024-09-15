import { UserConfigExport, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-pages'
import { viteMockServe } from 'vite-plugin-mock'
import { fileURLToPath, URL } from 'node:url'
import MillionLint from '@million/lint'

// { command }: ConfigEnv
export default (): UserConfigExport => {
    return defineConfig({
        plugins: [
            react(),
            pages({
                importMode() {
                    // if (filepath.includes('index')) {
                    //     return 'sync'
                    // }
                    return 'async'
                }
            }),
            viteMockServe({
                // enable: command === 'serve',
                ignore: (fileName: string) => {
                    if (fileName.includes('_')) {
                        return true
                    }
                    return false
                }
            }),
            MillionLint.vite()
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    })
}
