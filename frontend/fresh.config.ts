import { defineConfig } from "$fresh/server.ts";

export default defineConfig({
  server: {
    port: Deno.env.get('HTTP_PORT') ?? '8002',
  },
  plugins: [],
});
