import { basename } from "node:path";
import { ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode, renderToString } from "vue/server-renderer";
import { useSSRContext, resolveComponent, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, Suspense, createSSRApp } from "vue";
import { createRouter as createRouter$1, createMemoryHistory } from "vue-router";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      _push(ssrRenderComponent(_component_router_view, _attrs, {
        default: withCtx(({ Component }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(`<div data-v-d7cff81e${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Component), null, null), _parent2, _scopeId);
                _push2(`</div>`);
              },
              _: 2
            });
          } else {
            return [
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    (openBlock(), createBlock(resolveDynamicComponent(Component)))
                  ])
                ]),
                _: 2
              }, 1024))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7cff81e"]]);
const pages = /* @__PURE__ */ Object.assign({ "../pages/About.vue": () => import("./assets/About-yDVk77o9.js"), "../pages/Home.vue": () => import("./assets/Home-Bf6TTiRS.js"), "../pages/Test.vue": () => import("./assets/Test-C9Ma5awz.js") });
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
  return {
    path: name === "/home" ? "/" : name,
    component: pages[path]
    // () => import('./pages/*.vue')
  };
});
function createRouter() {
  return createRouter$1({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: createMemoryHistory(),
    routes
  });
}
function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  return { app, router };
}
async function render(url, manifest) {
  const { app, router } = createApp();
  await router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return { html, preloadLinks };
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
export {
  _export_sfc as _,
  render
};
