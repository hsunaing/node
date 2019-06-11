// export const serverURLL = {
//     serverURLdata: "http://10.2.12.31:3000"
//   };
// const FRUIT = "kiwi";
// const VEGETABLE = "carrot";
const serverURLdata = 'http://localhost:3000'
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "", hellostring = process.env.SOMEFAX;

console.log('testing js: '+ip)