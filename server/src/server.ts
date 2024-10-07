import { readFileSync, statSync } from 'node:fs'
import { createApp, eventHandler, createRouter, type App, serveStatic, defineEventHandler } from 'h3'
import { join } from 'node:path'

const publicPath = join(process.cwd(), 'public')

export async function createServerApp (config?: Record<string, any>): Promise<App> {
    const app = createApp()

    const router = createRouter()
        .get('/', eventHandler(async (event) => {
            return readFileSync(join(publicPath, 'form.schema.html'), 'utf8')
        }))

    app.use(router)

    app.use(
        defineEventHandler(async (event) => {
            return await serveStatic(event, {
                getContents: (id) => readFileSync(join(publicPath, id)),
                getMeta: (id) => {
                    try {
                        const stats = statSync(join(publicPath, id))

                        if (!stats?.isFile()) {
                            return
                        }

                        return {
                            size: stats.size,
                            mtime: stats.mtimeMs
                        }
                    } catch (error) {
                        if (error instanceof Error && !error.message.includes('ENOENT')) {
                            console.error(error)
                        }
                    }
                    return
                }
            })
        })
      )

    return app
}
