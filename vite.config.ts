import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { VantResolver } from "@vant/auto-import-resolver";


// https://vitejs.dev/config/
export default async ()=> {
  const UnoCss = (await import("unocss/vite")).default

  return defineConfig({
    plugins: [
      uni(),
      UnoCss(),
      // AutoImport({
      //   resolvers: [VantResolver()],
      // }),
      // Components({
      //   resolvers: [VantResolver()],
      // }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: "http://localhost:88",
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, ""),
    //     },
    //   },
    // }
  });
};
// export default defineConfig({
//   plugins: [
//     uni(),
//     UnoCss(),
//   ],
// });
