var openid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num1:12,
    num2:13

  },
back:function(){
  wx.navigateBack({
    delta: 1,
  })
},

go(e){
  console.log("ddd",e.currentTarget.id)
  wx.navigateTo({
    url: '/pages/share/share1/share1?id='+e.currentTarget.id,
  })
},



  onLoad: function (options) {
    var that=this
    const db=wx.cloud.database()
    wx.cloud.callFunction({
     name:'getOpenId',
     complete:res=>{
       console.log('make '+res.result.openId)
        openid=res.result.openId
     }
   })
   db.collection('article').where({
    _openid:openid
  }).get({
    success:function(res){
      console.log(res.data)
      that.setData({
        make:res.data,
      })
    }
  })
  },

 

 





 



})