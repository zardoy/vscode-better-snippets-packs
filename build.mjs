import { build } from 'esbuild'
import { globby } from 'globby'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { noCase } from 'change-case'
import { titleCase } from 'title-case'
import { basename, join } from 'path'

const dev = process.argv.includes('--watch')

const PUBLISHER = 'zardoy'
const IDS_PREFIX = 'bsp-'

const files = await globby('packs/*/index.ts')
files.forEach(file => {
    writeExtensionManifeset(basename(join(file, '..')))
})
const { metafile } = await build({
    bundle: true,
    logLevel: 'info',
    entryPoints: files,
    mainFields: ['module', 'main'],
    platform: 'browser',
    format: 'cjs',
    external: ['vscode'],
    treeShaking: true,
    outdir: 'out',
    outbase: 'packs',
    sourcemap: dev,
    watch: dev,
    keepNames: dev,
    minify: !dev,
    metafile: true,
})

function writeExtensionManifeset(/** @type {string} */ folderName) {
    const version = dev ? '0.0.0-dev' : readFileSync(`packs/${folderName}`, 'utf8')
    const template = {
        name: IDS_PREFIX + folderName,
        displayName: `Better Snippets ${titleCase(noCase(folderName))}`,
        version,
        publisher: PUBLISHER,
        license: 'MIT',
        engines: {
            vscode: '^1.64.0',
        },
        main: 'index.js',
        browser: 'index.js',
        categories: ['Snippets', 'Other'],
        repository: 'https://github.com/zardoy/vscode-better-snippets-packs',
        extensionDependencies: ['zardoy.better-snippets'],
        //
        activationEvents: ['*'],
    }

    const dir = `out/${folderName}`
    mkdirSync(dir, { recursive: true })
    writeFileSync(`${dir}/package.json`, JSON.stringify(template, undefined, 4), 'utf8')
}

// console.log(await analyzeMetafile(metafile))
