import vue from "@vitejs/plugin-vue";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

const credsDir = process.env.CERTS ?? path.join(import.meta.dirname, "certs");
const keyFilePath = path.join(credsDir, "localhost-key.pem");
const certFilePath = path.join(credsDir, "localhost.pem");
const HTTPS = process.env.HTTPS ?? "true";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/LoupGarouAssistant",
  plugins: [vue()],
  server: {
    https: getDevServerHttps(),
  },
});

function getDevServerHttps(): import("https").ServerOptions | undefined {
  if (HTTPS !== "true" || process.env.NODE_ENV !== "development") {
    return undefined;
  }

  try {
    return {
      cert: fs.readFileSync(process.env.LOCALHOST_CERTFILE || certFilePath),
      key: fs.readFileSync(process.env.LOCALHOST_KEYFILE || keyFilePath),
    };
  } catch (err) {
    console.error("Failed to read SSL certificate files", err);
    return undefined;
  }
}
