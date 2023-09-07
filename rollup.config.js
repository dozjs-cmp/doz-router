import terser from '@rollup/plugin-terser';
import versionInjector from 'rollup-plugin-version-injector';

const versionConfig = {
    injectInComments: {
        fileRegexp: /\.(js|html|css)$/,
        tag: 'doz-router, version: {version} - {date}',
        dateFormat: 'mmmm d, yyyy HH:MM:ss'
    }
}

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/bundle.js',
            format: 'es',
            name: 'dozRouter',
            plugins: [
                versionInjector(versionConfig)
            ]
        },
        {
            file: 'dist/bundle.min.js',
            format: 'es',
            name: 'dozRouter',
            plugins: [
                versionInjector(versionConfig),
                terser()
            ]
        },
    ],
    external: ['doz']
};