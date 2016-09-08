import glob from 'glob'
import path from 'path'
import fs from 'fs'


const trlPath   = path.resolve(__dirname, '../../translations')
const pattern   = `${trlPath}/changed/*.json`
const filePaths = glob.sync(pattern)


const result = filePaths.map((filePath) => {
  const locale = filePath.match(/([^\/]+)\.json$/)[1]
  
  const currContent = JSON.parse(fs.readFileSync(`${trlPath}/${locale}.json`, 'utf8', (err) => {
    if (err) throw err
  }))
  
  const newContent = JSON.parse(fs.readFileSync(filePath, 'utf8', (err) => {
    if (err) throw err
  }))

  currContent.forEach((currMessageData) => {
    if (currMessageData.id in newContent) {
      const currMessage     = currMessageData.message || currMessageData.defaultMessage
      const newMessageData  = newContent[currMessageData.id]
      
      // message didn't changed on dev side
      if (currMessage == newMessageData.message) {
        currMessageData.message = newMessageData.newMessage
      }
    }
  })

  const json = JSON.stringify(currContent, null, 2) + '\n'

  fs.writeFile(`${trlPath}/merged/${locale}.json`, json, (err) => {
    if (err) {
      return console.log(err)
    }

    console.log(`File ${locale}.json created successfully!`)
  })

  return currContent
})

//console.log(222, result)
