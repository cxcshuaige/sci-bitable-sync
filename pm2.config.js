module.exports = {
    apps: [
        {
            name: 'bitable_linker',
            script: './dist/main.js',
            env: {
                NODE_ENV: 'prod'
            },
            env_test: {
                NODE_ENV: 'test'
            }
        }
    ]
};
