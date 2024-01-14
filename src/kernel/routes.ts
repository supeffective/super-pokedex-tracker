import AppLayout from '@/components/layout/AppLayout'
import { initializeAppRouter } from '@/lib/router/hooks'
import { RouterPageModule, RouterPageModuleRouteMap } from '@/lib/router/types'
import * as ErrorPage from '@/pages/error'
import * as HomePage from '@/pages/page'

// ATTENTION: import.meta.glob is Vite specific
const allPages: Record<string, RouterPageModule> = import.meta.glob('@/pages/**/page.tsx', {
  eager: true,
})

export const appRoutes: RouterPageModuleRouteMap = {
  '/': HomePage,
}

const appRouteEntries: Array<[string, RouterPageModule]> = []

for (const [path, modules] of Object.entries(allPages)) {
  const route = path
    .replace(/^\/src\/pages\//, '/')
    .replace(/\/page\.tsx$/, '')
    .replace(/^\/+/, '')

  const absRoute = `/${route}`
  const defaultModule = modules.default

  if (!defaultModule) {
    throw new Error(`appRoutes: ${path} does not have a default export`)
  }

  if (typeof defaultModule !== 'function') {
    throw new Error(`appRoutes: ${path} default export is not a function`)
  }

  appRouteEntries.push([absRoute, modules])
}

// sort routes by length and then alphabetically, longest first
appRouteEntries.sort((a, b) => {
  const aLength = a[0].length
  const bLength = b[0].length
  if (aLength === bLength) {
    return a[0].localeCompare(b[0])
  }
  return bLength - aLength
})

for (const [route, modules] of appRouteEntries) {
  if (route === '/') {
    console.log('skipping /')
    continue
  }
  appRoutes[route] = modules
}

console.log(appRouteEntries)

const appRouter = initializeAppRouter(appRoutes, ErrorPage, AppLayout)

export default appRouter
