import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const devtoolsColumns = (numCols = 14) => {
  const hotVirtualModuleId = 'virtual:devtools-columns'
  const hotResolvedVirtualModuleId = '\0' + hotVirtualModuleId
  let isDev = false

  return {
    name: "vite-plugin-devtools-columns",
    configureServer() {
      isDev = true
    },
    resolveId(id) {
      if (id === hotVirtualModuleId) {
        return hotResolvedVirtualModuleId
      }
    },
    async load(id, context) {
      if (id === hotResolvedVirtualModuleId) {
        if (!isDev || context?.ssr) { return '' }
        const source = await readFile(resolve(fileURLToPath(new URL('.', import.meta.url)), 'client.js'), 'utf-8')
        return source.replace('/* numCols */', numCols.toString())
      }
    },
  };
};
