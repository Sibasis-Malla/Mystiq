const ipfsClient = require('ipfs-http-client')
const projectId = '202XGjxJMpv4iwaHhbphTa9dqWZ'
const projectSecret = '421e5721b471bf5e3235104b7ff8e82c'
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
console.log(auth)
const client = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  },
  apiPath: '/api/v0'
})
export default client; 

// client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
//   console.log(res)
// })



