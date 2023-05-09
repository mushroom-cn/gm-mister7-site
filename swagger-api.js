const { generateApi } = require('swagger-typescript-api');
const {resolve} = require('path');

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
[{ url: "http://localhost:3000/api-json", outputDir: resolve(__dirname, './src/plugins/VideoList/api/__generated__') }].map(({ url, path, outputDir }) => {
    generateApi({
        // input: path.resolve(__dirname, "./schemas.json"),
        url,
        path,
        output: outputDir,
        axios: true,
        cleanOutput: true,
        // singleHttpClient: true,
        httpClientType: "axios",
        name: "api",
        modular:false
    });
})
