import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { readdirSync, statSync } from 'fs'

// Dynamically get all icon category directories
function getIconCategories() {
  const iconsDir = resolve(__dirname, 'src/icons')
  const categories: Record<string, string> = {}
  
  try {
    const entries = readdirSync(iconsDir)
    entries.forEach(entry => {
      const entryPath = resolve(iconsDir, entry)
      if (statSync(entryPath).isDirectory() && entry !== 'index.ts') {
        const indexPath = resolve(entryPath, 'index.ts')
        // Check if index.ts exists
        try {
          statSync(indexPath)
          categories[`icons/${entry}/index`] = indexPath
        } catch {
          // Index file doesn't exist, skip
        }
      }
    })
  } catch (error) {
    console.warn('Could not read icon categories:', error)
  }
  
  return categories
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.test.tsx', 'src/App.tsx', 'src/main.tsx']
    })
  ],
  
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/index': resolve(__dirname, 'src/components/index.ts'),
        'icons/index': resolve(__dirname, 'src/icons/index.ts'),
        ...getIconCategories(),
      },
      formats: ['es', 'cjs'],
    },
    
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/[name][extname]'
          }
          return 'assets/[name][extname]'
        }
      }
    },
    
    sourcemap: true,
    emptyOutDir: true,
    
    cssCodeSplit: false,
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
