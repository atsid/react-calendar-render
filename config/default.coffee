module.exports =
  app:
    name: 'react-calendar-render-examples'

  session:
    name: 'react-calendar-render-examples'
    secret: 'abc123-random'
    proxy: true

  clustering:
    workerLimit: 1
    entryPoint: __dirname + '/example/main'
