import prometheusClient from 'prom-client'
import express from 'express'

const app = express()

export const httpRequestDurationMicroseconds = new prometheusClient.Histogram({
    name: 'backend_http_request_duration_seconds',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})
export const databaseResponseTimeHistogram = new prometheusClient.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
})

export const startMetricsServer = () => {
    prometheusClient.collectDefaultMetrics()
    prometheusClient.register.registerMetric(httpRequestDurationMicroseconds)

    const PORT = process.env.METRICS_SERVER_PORT ?? 9100
    app.get('/metrics', async (req, res) => {
        res.set("Content-Type", prometheusClient.register.contentType)

        return res.send(await prometheusClient.register.metrics())
    })
    app.listen(PORT, () => {
        console.log(`Metrics server started at port ${PORT}`);
    })
}
