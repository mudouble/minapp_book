// 云函数入口文件

const cloud = require('wx-server-sdk')
const TcbRouter=require('tcb-router');
const rq=require('request');
var WXBizDataCrypt=require('./RdWXBizDataCrypt')
const appid = 'wxba9818192f88e529'; //你的小程序appid
//const secret = 'xxxxxxxxxxxxxxxxxxxxx'; //你的小程序secret
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app=new TcbRouter({
    event
  });


  
app.router('getid',async(ctx)=>{
  const wxContext=cloud.getWXContext()
  ctx.body=wxContext.OPENID;
})

  return app.serve();
  
}