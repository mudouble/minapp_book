// pages/talk/talk.js

const db=wx.cloud.database()
/*const shareListCollection=db.collection('shareList')*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: [{name:"推荐",isActive:true},{name:"热门",isActive:false},{name:"收藏",isActive:false}],
    currentNavtab:0,
    feed: [],
    feed_length: 0
  },
  switchTab: function(e){
  const{index}=e.currentTarget.dataset;
  let{navTab}=this.data
  navTab.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
  this.setData({
   navTab
  })
  },
search:function(e){
   wx.navigateTo({
     url: '/pages/share/talk/search/search',
   })
},
 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    db.collection('article').get({
      success: function(res) {
        console.log(res.data)
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
       that.setData({
         article:res.data
       })
      }
    })
    db.collection('article').orderBy('answer.likes','asc').get({
      success: function(res) {
        console.log(res.data)
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
       that.setData({
         article_remen:res.data
       })
      }
    })
    db.collection('article').where({
      'answer.collects':true
    }).get({
      success:function(res){
        console.log("collect",res.data)
        that.setData({
          artcollect:res.data
        })
      }
    })
  },
  yuanzhuojump(){
   wx.navigateTo({
     url: '/pages/share/share2/share2',
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
todetail:function(e){ 
  console.log("hhjkhhh"+e.currentTarget.id)
  wx.navigateTo({
    url: '/pages/share/share1/share1?id=' +e.currentTarget.id,
  })
},

 
})