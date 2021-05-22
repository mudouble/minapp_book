
var openid
Page({

  data: {
  },

  back:function(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  onLoad: function (options) {
    var that=this
     const db=wx.cloud.database()
     wx.cloud.callFunction({
      name:'getOpenId',
      complete:res=>{
        console.log('mycollect '+res.result.openId)
         openid=res.result.openId
      }
    })
    db.collection('collect').where({
      _openid:openid
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          list:res.data,
          len:10   
        })
      }
    })
  },
})