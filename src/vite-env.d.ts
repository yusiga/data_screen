/// <reference types="vite/client" />
declare module '*.js' {
    import { Router } from 'vue-router'
    const router: Router
    export default router
  }