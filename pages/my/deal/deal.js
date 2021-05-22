const db =wx.cloud.database()
const app=getApp();
var openid
var hidden=1
var hidden1=1
var ids
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:1,
    hidden1:1,
   navTab:[
     {
       name:"已卖出",
       isActive:true
     },
     {
      name:"已买入",
      isActive:false
    }
   ]
  },
  back:function(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  switchTab: function(e){
    const{index}=e.currentTarget.dataset;
    let{navTab}=this.data
    navTab.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
     navTab
    })
    },

 del:function(e){
   console.log("id",e.currentTarget.id)
   ids=e.currentTarget.id
 // console.log("ffff",hidden)
   this.setData({
     ids:ids
   })
 },

  onLoad: function (options) {    
   let that =this;
   wx.cloud.callFunction({
     name:'getOpenId',
     complete:res=>{
       console.log('yunhnashu '+res.result.openId)
        openid=res.result.openId
     }
   })
   console.log("ccc",openid)
   db.collection('goods').where({
    _openid:openid,
    status:0
  }).get({
    success:function(res){
      console.log(res.data)
      that.setData({
        goods:res.data,
        bookid:res.data._id
      })
    }
  })
  db.collection('goods').where({
    _openid:openid,
    status:1
  }).get({
    success:function(res){
      console.log(res.data)
      that.setData({
        goods1:res.data,
        bookid:res.data._id
      })
    }
  })
 
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})