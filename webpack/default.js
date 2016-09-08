import path from 'path'
import webpack from 'webpack'
import requireDir from 'require-dir'
import HtmlWebpackPlugin from 'html-webpack-plugin'


var paths = {
  base: path.join(__dirname, '../'),
  client: path.join(__dirname, '../client/index.js'),
  build: path.join(__dirname, '../build')
}

const globals = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
}

const lFolder = requireDir('./loaders')
const loaders = [].concat.apply([], Object.keys(lFolder).map((k) => lFolder[k]))


module.exports = {
  //devtool: 'eval',
  devtool: 'cheap-module-source-map',

  entry: [
    paths.client
  ],

  output: {
    path: paths.build,
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders
  },

  resolve: {
    modulesDirectories: [ 'local_modules', 'client', 'shared', 'node_modules' ],
    extensions: [ '', '.js', '.css', '.styl' ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Intl editor',
      template: `!!handlebars!${ path.join(paths.base, 'client/assets/index.html') }`,
      filename: 'index.html',
      hash: false,
      cache: true,
      inject: 'body'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(globals)
  ],

  htmlWebpackPlugin: {
    files: {
      bigLogo: 'assets/images/big_logo.png',
      icon: 'assets/images/icon.png',
      chunks: {
        app: {
          entry: paths.client,
          logo: [ 'assets/images/icon.png' ]
        }
      }
    }
  },

  stylus: {
    use: [
      require('nib')()
    ],
    import: [
      '~nib/lib/nib/index.styl',
      '~assets/styl/_modules/index.styl'
    ]
  }
}
