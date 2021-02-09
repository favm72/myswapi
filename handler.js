import awsSlsExpress from 'aws-serverless-express'
import app from './server'

const server = awsSlsExpress.createServer(app)
module.handler = (event, context) => {
  return awsSlsExpress.proxy(server,event,context)
}