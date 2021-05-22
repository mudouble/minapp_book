const db=wx.cloud.database()
const _=db.command
 var d;
let shoucang=false;
const app=getApp()
var openid
var array
var spec
var ava 
var nick
var sort
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    midlist:[
      {
        id:0,
        title:"发布信息",
        isActive:true
      },
      {
        id:1,
        title:"卖家想说",
        isActive:false
      },
      // {
      //   id:0,
      //   title:"书声",
      //   isActive:false
      // },
    ],
    shoucangUrl:"cloud://books-lgy-o3riw.626f-books-lgy-o3riw-1302735412/img/收 藏 (2).png",
  },
  back:function(){
   wx.switchTab({
     url: '/pages/trade/trade',
   })

  },
  title(e){
    const{index}=e.currentTarget.dataset;
    let{midlist}=this.data
    midlist.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
     midlist
    })
  },
  onLoad:function(options){
    console.log("传过来的数据是")
   // console.log(options.id)
     var idx=options.id
   // d=options.id;
   //  console.log("eeee",idx,d)
    var that=this
    const db=wx.cloud.database()
    wx.cloud.callFunction({
      name:'getOpenId',
      complete:res=>{
        console.log('shoucang '+res.result.openId)
         openid=res.result.openId
      }
    })
   // console.log("eeee",idx)
    db.collection('goods').doc(idx).get({
      success:function(res){
        console.log("uuuuuuu",res.data)
        array=res.data.fileIDs[0]
        spec=res.data.title
        ava=res.data.userInfo.avatarUrl 
        nick=res.data.userInfo.nickName  
        console.log("d",res.data)
        console.log("images",array)
        // console.log("im",res.data.images[0])
        that.setData({
          items :res.data
        })  
        if(res.data.sort==4)  {
            sort="课外读物"
        }
        else if(res.data.sort==1){
            sort="通用书籍"
        }
        else if(res.data.sort==2){
          sort="考研用书"
        }
        else if(res.data.sort==3){
            sort="考证用书"
        }
        that.setData({
          sort :sort
        })  
      }
    })   
  },
  
  clickShoucang(){  
    console.log("xzzxzxzxz") 
      this.setData({
        shoucangUrl:shoucang ? "cloud://books-lgy-o3riw.626f-books-lgy-o3riw-1302735412/img/收 藏 (2).png" : "cloud://books-lgy-o3riw.626f-books-lgy-o3riw-1302735412/img/collect.png"
      })
      console.log("bookid",d)
      shoucang = !shoucang 
      console.log("ssdsds",openid)
          db.collection('collect').add({
            data:{
               collect_time:app.getNowFormatDate(),
                book_id:d,
                img:array,
                info:spec,
                username:nick,
                userava:ava
            }            
          })   
          wx.showToast({
            title: '收藏成功！',
          })  
     
  },
  shop(){
    wx.switchTab({
      url: '/pages/trade/shoppingcar/shoppingcar',
    })
    this.onLoad();
  },
  shouye(){
    wx.switchTab({
      url: '/pages/trade/trade',
    })
  },
  addcar: function (e) {    
    let num=this.data.num;
    num++;
    this.setData({
      num:num,
      hasCarts:true
    })
    var items = this.data.items;
    console.log("aaaa",items._id)   
    console.log("d",this.data.items)    
    console.log("iiiiiii",items.fileIDs[0])   
    var cartItems = wx.getStorageSync('cartItems') || []
    console.log("cartItems,{}", cartItems);
    var exist=  cartItems.find(function(el){
      return el.id==items._id
    })
    if(exist){
      exist.value=parseInt(exist.value)+1
    }else{
      cartItems.push({
        id:items._id,
        title:items.title,
        author:items.author,
        images:items.fileIDs[0],
        price:items.price,
        value:1,
        selected:true,
        status:0
      })
    }
    wx.showToast({        
      title: '加入购物车成功！',        
      icon: 'success',        
      duration: 2000  
    })
    wx.setStorageSync('cartItems', cartItems)
  },
  tocart:function(){
    wx.reLaunch({
      url: '../../trade/shoppingcar/shoppingcar',
    })
  },
  onShow(){
    this.onLoad();
  }

})