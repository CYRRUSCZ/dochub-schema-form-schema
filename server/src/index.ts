import { createServer } from 'http'
import { toNodeListener } from 'h3'
import { createServerApp } from './server'


function shutdown () {
  console.log('Shutting down...')
  process.exit(0)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

const app = await createServerApp()

createServer(toNodeListener(app))
    .listen(
        3000,
        '0.0.0.0',
        undefined,
        () => {
            console.log(`Server running at http://0.0.0.0:3000`)
        }
    )
