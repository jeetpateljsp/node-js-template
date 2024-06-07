import bunyan from 'bunyan'

declare global {
    var log: bunyan
}

export default global.log = bunyan.createLogger({
    name: 'node-server',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            path: 'error.log'
        }
    ]
})