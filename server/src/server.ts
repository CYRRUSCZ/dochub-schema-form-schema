import { createApp, eventHandler, createRouter, getQuery, H3Error, App } from 'h3'

export async function createServerApp(config?: Record<string, any>): Promise<App> {
    const app = createApp()

    const router = createRouter()
        .get('/', eventHandler(async (event) => {
            return {}
        }))

    app.use(router)

    return app
}
