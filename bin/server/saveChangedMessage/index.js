import path from 'path'
import fs from 'fs'


const trlPath = path.resolve(__dirname, '../../../translations/changed')

const write = (locale, json) => {
  fs.writeFile(path.resolve(`${trlPath}/${locale}.json`), json, (err) => {
    if (err) {
      return console.log(err)
    }

    console.log(`File ${locale}.json created successfully!`)
  })
}

export default (locales) => {
  for (const locale in locales) {
    const json = JSON.stringify(locales[locale], null, 2) + '\n'

    write(locale, json)
  }
}
