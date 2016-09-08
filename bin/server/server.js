import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack'


const isDeveloping = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = express()


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

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})
