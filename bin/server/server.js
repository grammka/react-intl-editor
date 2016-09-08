import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack'

import saveChangedMessage from './saveChangedMessage'


const isDeveloping = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


if (isDeveloping) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
}
else {
  app.use(express.static(path.resolve(__dirname, '../../build')))
}

app.post('/save', (req, res) => {
  saveChangedMessage(req.body.messages)

  res.json({ ok: true })
})


app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})
