module.exports = {
    extends: [require.resolve("@ecoding/base.spec/libs/eslint.js")],
    ignorePatterns: ["node_modules", "dist", "test", "jest.config.js", "typings"],
    env: {
        jest: true,
        node: true
    },
    rules: {
        // todo 覆盖增加
        "@typescript-eslint/indent": "off",
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    }
};
