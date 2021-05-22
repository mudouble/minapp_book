// pages/trade/trade.js

 
Page({
  data:{
    shu:[],
   // detail_id:"8e5be7055f7be3f301567fae7a069997"
   flag:0
  },
  goSearch:function(e){
    wx.navigateTo({
      url: '/pages/trade/search/search',
    })
  },
  onLoad:function(e){
    var that=this
    const db=wx.cloud.database()
    db.collection('goods').where({buy_rent:'1'}).orderBy('count','desc').get({
      success:function(res){
        console.log("ddddd",res.data)
        that.setData({
          shu:res.data
        })
      }
    })
  },
  select:function(e){
    console.log(e)
    var that=this
   var id=e.target.id 
   var idx=e.target.id 
   console.log("one",id,idx )
    that.setData({
     flag:idx
    })
  console.log("one",e.target.id )
    const db=wx.cloud.database()
    db.collection('goods').where({sort:id}).get({
      success:function(res){
        console.log("xxxxx",res.data)
        that.setData({
          shu:res.data
        })
      }
    })
    this.onLoad();
  },
  
  fabu:function(){
    wx.navigateTo({
      url: '/pages/trade/fabu/fabu',
    })
  },
  booksDetail(e){
     console.log("ddd",e.currentTarget.id)
     wx.navigateTo({
       url: '/pages/trade/details/details?id='+e.currentTarget.id,
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
      var that=this
      const db=wx.cloud.database()
      db.collection('goods').where({buy_rent:'1'}).orderBy('count','desc').get({
        success:function(res){
          console.log("ddddd",res.data)
          that.setData({
            shu:res.data
          })
        }
      })
     // self.setData({ dataList: shu });
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000);
  },
  })