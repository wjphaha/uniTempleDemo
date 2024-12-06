import uviewPlus from 'uview-plus';

import 'virtual:uno.css';


import { createSSRApp } from "vue";
import App from "./App.vue";


export function createApp() {
  const app = createSSRApp(App).use(uviewPlus);
  return {
    app,
  };
}
