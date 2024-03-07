import { dynamicModule } from "@ecoding/helper.dynamic";
const modules = {
    // "monaco-editor": () => import(/* webpackChunkName: "monaco-editor" */ "@monaco-editor/react") // components
};

dynamicModule.setModules(modules);

// export type TypeMonacoEditorAsync = typeof import(/* webpackChunkName: "monaco-editor" */ "@monaco-editor/react")
export { dynamicModule } from "@ecoding/helper.dynamic";
