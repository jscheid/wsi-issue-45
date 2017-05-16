import webpack from 'webpack';
import SriPlugin from 'webpack-subresource-integrity';
import OnBuildPlugin from 'on-build-webpack';
import mapValues from 'lodash/mapValues';
import fs from 'fs';
import path from 'path';

export default {
    entry: './test.js',
    output: {
        crossOriginLoading: 'anonymous',
        filename: 'out.js',
    },
    plugins: [
        new SriPlugin({
            hashFuncNames: ['sha256', 'sha384'],
            enabled: true,
        }),
        new OnBuildPlugin(stats => {
            fs.writeFileSync(
                path.join(__dirname, 'sri-mapping.json'),
                JSON.stringify({
                    crossOriginLoading: stats.compilation.outputOptions.crossOriginLoading,
                    integrityValues: mapValues(stats.compilation.assets, 'integrity'),
                }));
        }),
    ],
};
