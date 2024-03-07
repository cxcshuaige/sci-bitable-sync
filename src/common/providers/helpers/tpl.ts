class Tpl{
    getScript (props:object) {
        // 警告：关于在 HTML 中嵌入 JSON 的安全问题，请查看以下文档
        // http://redux.js.org/recipes/ServerRendering.html#security-considerations
        const str = JSON.stringify(props).replace(
            /</g,
            '\\u003c'
        );
        let script = `
            <script>
                window.isBFF = true;
                window.__PRELOAD_STATE__ = ${str !== "{}" ? str : null};
            </script>
        `
        return script;
    }
}

export default Tpl;