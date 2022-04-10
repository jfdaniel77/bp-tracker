import '../style/index.css'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

//Add these lines
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DNS, //paste copied DSN value here
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0, //lower the value in production
});

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
