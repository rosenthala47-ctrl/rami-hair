import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Stripe is only registered once real keys exist (Phase 0 human step - see
// docs/roadmap.md). Without this guard the backend fails to boot, since the
// provider throws on construction when `apiKey` is missing.
const stripeApiKey = process.env.STRIPE_API_KEY

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: stripeApiKey
    ? [
        {
          resolve: '@medusajs/payment',
          options: {
            providers: [
              {
                resolve: '@medusajs/payment-stripe',
                id: 'stripe',
                options: {
                  apiKey: stripeApiKey,
                  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
                  capture: true,
                },
              },
            ],
          },
        },
      ]
    : [],
})
