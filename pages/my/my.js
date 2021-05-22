

const db=wx.cloud.database()
const _ =db.command;
const app = getApp();
const config = require("../../config.js");
Page({    
      data: {
          
      },
     back:function(){
      wx.switchTab({    
         url: '/pages/trade/trade',
     })
    },
      onShow() {
           this.setData({
             userinfo: app.userinfo
                  })
      },
      go(e) {
            if (e.currentTarget.dataset.status == '1') {
                  if (!app.openid) {
                        wx.showModal({
                              title: '温馨提示',
                              content: '该功能需要注册方可使用，是否马上去注册',
                              success(res) {
                                    if (res.confirm) {
                                          wx.navigateTo({
                                                url: '/pages/my/denglu/denglu',
                                          })
                                    }
                              }
                        })
                        return false
                  }
              }
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })
      },

      onShareAppMessage() {
            return {
                  title: JSON.parse(config.data).share_title,
                  imageUrl: JSON.parse(config.data).share_img,
                  path: '/pages/start/start'
            }

      },  
})

