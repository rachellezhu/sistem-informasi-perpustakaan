import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
// import fs from "fs";

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true,
    }),
    react(),
  ],
  // server: {
  //   // proxy: {
  //   //   "perpustakaan-sdn-pabelan-2-kartasura-fe.royansaifurrobbi.my.id": {
  //   //     target: "localhost:5173",
  //   //     changeOrigin: true,
  //   //     secure: false,
  //   //   },
  //   // },
  //   hmr: {
  //     host: "localhost",
  //   },
  //   host: true,
  //   // watch: {
  //   //   usePolling: true,
  //   // },
  //   https: true,
  //   // https: {
  //   //   key: fs.readFileSync(".certificate/roysr.key"),
  //   //   cert: fs.readFileSync(".certificate/roysr.crt"),
  //   // },
  // },
});
