import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin'
import { Resource } from '@opentelemetry/resources'
import {SemanticResourceAttributes} from '@opentelemetry/semantic-conventions'
// import InstrumentationHttp from '@opentelemetry/instrumentation-http'
// import {ExpressInstrumentation} from '@opentelemetry/instrumentation-express'
import dotenv from 'dotenv'
dotenv.config({path: `.env.${process.env.NODE_ENV}`})
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME] : 'my-service'
    }),
    traceExporter: new ZipkinExporter({
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? undefined,
        serviceName: process.env.OTEL_RESOURCE_ATTRIBUTES ?? undefined
    }),
    instrumentations: [
        getNodeAutoInstrumentations()
    ]
})

sdk.start()