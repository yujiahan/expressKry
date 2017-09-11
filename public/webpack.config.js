module.exports = {
    entry: {
        "schedule": './javascripts/schedule/index.js',
        "forDisplay": "./javascripts/forDisplay/index.js"
    },
    output: {
        filename: '[name].js',
        path: './dist'
    }
}