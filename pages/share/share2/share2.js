// pages/index/share2/share2.js
const app=getApp();
const db=wx.cloud.database()
const _ =db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  title:" ",
  content:"",
  createTime:""


  },
back:function(){
wx.reLaunch({
  url: '/pages/share/talk/talk',
})
},


send(e)
{
  var that=this
  var createTime
   that.setData({
      createTime:app.getNowFormatDate()
    })
    db.collection('article').add({
        data: {
          title:that.data.title,
          createTime:that.data.createTime,
          question:that.data.content,
        },
        success:res => {
          wx.showToast({
            title: '发布成功',
          })
         wx.reLaunch({
           url: '../talk/talk',
         })
        },
        fail: e=>{
          wx.showToast({
            title: '发布错误',
          })
          console.log(e)
        }
      })

  },

title(event) {
  console.log("输入的内容", event.detail.value)
  this.setData({
    title: event.detail.value
  })
},
content(event) {
  console.log("输入的内容", event.detail.value)
  this.setData({
    content: event.detail.value
  })
},


})