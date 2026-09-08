// open-next.config.ts created for the Cloudflare Pages/Workers deploy target.
// See automation/README.md and README.md's "Deploy to Cloudflare" section.
import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache"

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
})
