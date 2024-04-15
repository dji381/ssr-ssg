import { ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { ref, useSSRContext } from "vue";
import { _ as _export_sfc } from "../entry-server.js";
import "node:path";
import "vue-router";
const _sfc_main$1 = {
  __name: "HelloWorld",
  __ssrInlineRender: true,
  props: {
    msg: String
  },
  setup(__props) {
    const count = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1 data-v-1e8a609f>${ssrInterpolate(__props.msg)}</h1><div class="card" data-v-1e8a609f><button type="button" data-v-1e8a609f>count is ${ssrInterpolate(count.value)}</button><p data-v-1e8a609f> Edit <code data-v-1e8a609f>components/HelloWorld.vue</code> to test HMR </p></div><p data-v-1e8a609f> Check out <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" data-v-1e8a609f>create-vue</a>, the official Vue + Vite starter </p><p data-v-1e8a609f> Install <a href="https://github.com/vuejs/language-tools" target="_blank" data-v-1e8a609f>Volar</a> in your IDE for a better DX </p><p class="read-the-docs" data-v-1e8a609f>Click on the Vite and Vue logos to learn more</p><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/components/HelloWorld.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HelloWorld = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1e8a609f"]]);
const _sfc_main = {
  __name: "Test",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(HelloWorld, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/pages/Test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
