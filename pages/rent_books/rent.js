var d
Page({
  data: {
    imgUrls: [
      'cloud://books-lgy-o3riw.626f-books-lgy-o3riw-1302735412/one.jpg',
      'cloud://books-lgy-o3riw.626f-books-lgy-o3riw-1302735412/two.jpg',
      'cloud://books-lgy-o3riw.626f-books-lgy-o3riw-1302735412/three.jpg'
    ],
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",
    modalHidden:true,
    index:0,
    flag:'false',
    shows:false,
    favor_img1:'cloud://books-lgy-o3riw.626f-books-lgy-o3riw-1302735412/喜欢 (1).png',
    favor_img2:'cloud://books-lgy-o3riw.626f-books-lgy-o3riw-1302735412/喜欢 (2).png'
  },
  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value      
    })
 },

 back(){
  wx.navigateBack({
    delta: 1,
  })
},
  
  onPullDownRefresh(){
    var self = this;
    wx.showToast({
        title:'加载中....',
        icon:'loading'
    });
    setTimeout(() => {
      // 模拟请求数据，并渲染
     this.onLoad();
     // self.setData({ dataList: shu });
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000);
  },
  back:function(){
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    const db=wx.cloud.database()
    db.collection('goods').where({buy_rent:'0'}).orderBy('count','desc').get({
      success:function(res){
        console.log("rent111111",res.data)
        that.setData({
          shu:res.data
        })
      }
    })
  },
  jumpdetail(e){
    d=e.currentTarget.id 
      console.log("ddd",d)
      console.log("1111",d)
      var that=this
      const db=wx.cloud.database()
      db.collection('goods').where({
        buy_rent:'0',
        _id:d,
    }).orderBy('count','desc').get({
        success:function(res){
          console.log("rent",res.data)
          that.setData({
            ss:res.data
          })
        }
      })
      that.setData({
        modalHidden:false
      })
      // console.log("kkkk",flags)
  },
  deletes(){
    this.setData({
      modalHidden:true
    })
  },
  rentbooks(events){
    var that=this
    const db=wx.cloud.database()
    db.collection('goods').where({
      '_id': d,
      }).update({
      data:{
      'rents_status': 1
      }
      })
      console.log("idid",d)
   wx.navigateTo({
     url: '/pages/rent_books/jiesuan1/jiesuan?id='+d,
     events: events,
     success: (result) => {},
     fail: (res) => {},
     complete: (res) => {},
   })
  },
  praiseThis(){
    this.setData({
      shows:true
    })
  //  console.log("likessss",shows)
    wx.showToast({
      title: '收到喜欢啦！',
     })
  }
 /**
   * 显示弹窗
   */
  // jumpdetail: function(e) {
  //   d=e.currentTarget.id 
  //   console.log("ddd",d)
  //   console.log("1111",d)
  //   var that=this
  //   const db=wx.cloud.database()
  //   db.collection('goods').where({
  //     buy_rent:'0',
  //     _id:d,
  // }).orderBy('count','desc').get({
  //     success:function(res){
  //       console.log("rent",res.data)
  //       that.setData({
  //         ss:res.data
  //       })
  //     }
  //   })
    
  // },
 
  /**
   * 点击取消
   */
  // modalCandel: function(e) {
  //   // do something
  //   this.setData({ modalHidden: true })
  //   wx.showToast({
  //     title: '取消成功！',
  //    })
  // },

  /**
   *  点击确认
   */
  // modalConfirm:function(e){
  //   this.setData({ modalHidden: true })
  //   wx.showToast({
  //    title: '我觉得OK',
  //   })
  //  },
  
})