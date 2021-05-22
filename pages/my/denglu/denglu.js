const db=wx.cloud.database();
const app = getApp();

//var phone
Page({

  data: { 
      id:-1, 
      ids: -1,
      phone:"",
      campus: [{
            name: '雁山校区',
            id: 0
      },
      {
            name: '育才区',
            id: 1
      },
      {
            name: '王城区',
            id: 2
      }
],

room: [{
            name: '一期',
            id: -1
      },
      {
            name: '二期',
            id: 0
      },
      {
            name: '三期',
            id: 1
      },
      {
            name: '四期',
            id: 2
      },
      {
            name: '五期',
            id: 3
      },
    
],   
  },
  choose(e) {
      let that = this;
      that.setData({
            ids: e.detail.value
      })
},
choose1(e) {
     let that = this;
      that.setData({
            id: e.detail.value
      })
},
back(){
  wx.reLaunch({
    url: '/pages/my/my',
  })
},
inputphone:function(e){
  this.setData({
        phone:e.detail.value
  })
},

getUserInfo(e) {
      let that = this;
      console.log(e);     
            that.setData({
                  userInfo: e.detail.userInfo
            })
            that.check();     
},
check() {
     let that = this;
      //校检手机
      let phone = that.data.phone;
      console.log("ffffff"+phone)
      if (phone == '') {
            wx.showToast({
                  title: '请先获取您的电话',
                  icon: 'none',
                  duration: 2000
            });
            return false
      }
      //校检校区
      let ids = that.data.ids;
      let campus = that.data.campus;
      if (ids == -1) {
            wx.showToast({
                  title: '请先获取您的校区',
                  icon: 'none',
                  duration: 2000
            });
      }
       //校检room
       let id = that.data.id;
       let room = that.data.room;
       if (id == -1) {
             wx.showToast({
                   title: '请先获取您的宿舍',
                   icon: 'none',
                   duration: 2000
             });
       }
     
      wx.showLoading({
            title: '正在提交',
      })
      db.collection('user').add({
            data: {
                  phone: that.data.phone,
                  campus: that.data.campus[this.data.ids],
                  room: that.data.room[this.data.id],
                  stamp: new Date().getTime(),
                  info: that.data.userInfo,
                  useful: true,
                  parse: 0,
            },
            success: function(res) {
                  console.log(res)
                  db.collection('user').doc(res._id).get({
                        success: function(res) {
                              app.userinfo = res.data;
                              app.openid = res.data._openid;
                              wx.navigateBack({})
                        },
                  })
                  wx.showToast({
                    title: '登录成功！',
                  })
            },
            fail() {
                  wx.hideLoading();
                  wx.showToast({
                        title: '注册失败，请重新提交',
                        icon: 'none',
                  })
            }
      })
},




 
})