module.exports = {
    extends: [require.resolve("@ecoding/base.spec/libs/eslint.js")],
    rules: {
        // todo 覆盖增加
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    },
};
