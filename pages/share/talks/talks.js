const db =wx.cloud.database()
const app=getApp();
var id1;
var username;
var useravatar;
var openid;
var time=app.getNowFormatDate1();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        contenttext:"",
        title:"dgfgfgt ",
       
  

  },
  back(){
     wx.navigateBack({
       delta: 1,
     })
  },
content(e){ 
   this.setData({
     contenttext:e.detail.value,   
   })
},

  onLoad: function (options) {
    this.getOpenId();
   
      console.log("传过来的"+options.id)
      id1 = options.id
      var that=this
      db.collection('article').where({
        _id:id1
      }).get({
        success:function(res){
          console.log(res.data[0].title)
          that.setData({
            title:res.data[0].title
          })
        }
      })
      db.collection('user').where({
        _openid:openid
      }).get({
        success:function(res){
          console.log(res.data[0].info.nickName)
          
            useravatar=res.data[0].info.avatarUrl
            username=res.data[0].info.nickName
          
          console.log("ffffff"+useravatar,username)
        }
      })
   


  },
  getOpenId(){
   let that =this;
   wx.cloud.callFunction({
     name:'getOpenId',
     complete:res=>{
       console.log('yunhnashu '+res.result.openId)
        openid=res.result.openId
     }
   })
  },
send:function(e){
  const _ = db.command
  db.collection('article').where({_id:id1}).update({
    data:{     
       ['answer']:_.push([{like:0,likes:false,collect:0,collects:false,comments:0,content:this.data.contenttext,username:username,useravatar:useravatar,createTime:time}])
    }
})
  wx.showToast({
    title: '发表成功！',
    duration:150000,
    icon:'success',
    // success:function(e){
    //   
    // }
  })
  console.log("id",e.currentTarget.id1)
  wx.navigateBack({
    delta: 1,
  })

 },
 onshow(){
   this.onLoad()
 }

  


  


 
})