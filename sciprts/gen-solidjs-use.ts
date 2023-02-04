import fs from 'fs-extra'
import fg from 'fast-glob'
import path from 'path'

function capitalized(word: string) {
  return word.charAt(0).toUpperCase()
    + word.slice(1)
}

let count = 1

const files = fg
  .sync('**/*.d.ts', { cwd: path.join(__dirname, '../node_modules/solidjs-use/dist'), onlyFiles: true })
  .map(filePath => {
    return ({
      name: count++,
      filePath
    })
  })


const importTypes = files.map((item) => `import solidjs${item.name}Types from '/node_modules/solidjs-use/dist/${item.filePath}?raw';`).join('\n')
const cmTypes = files.map((item) => `cmSolidjsUse(solidjs${item.name}Types, 'dist/${item.filePath}');`).join('\n')

const tmp = `
import { languages } from 'monaco-editor';
import solidjsUsePackageJson from '/node_modules/solidjs-use/package.json?raw';

${importTypes}

function cmSolidjsUse(source: string, path: string) {
  languages.typescript.typescriptDefaults.addExtraLib(source, \`file:///node_modules/solidjs-use/\${path}\`);
  languages.typescript.javascriptDefaults.addExtraLib(source, \`file:///node_modules/solidjs-use/\${path}\`);
}

cmSolidjsUse(solidjsUsePackageJson, 'package.json');

${cmTypes}
`

fs.writeFileSync(path.join(__dirname, '../src/components/editor/setupSolidjsUse.ts'), tmp, 'utf-8')
