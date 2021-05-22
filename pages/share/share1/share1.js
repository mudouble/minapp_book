
var s
var d
var id;
const db=wx.cloud.database()
const _ =db.command
var likes;
var collects;
var comments;
const app=getApp();
var ida;
var ava;
let ID=''
var shoucang 
var dianzan
var articleid
var shou=false
var dian=false
var views=0
var artid
var _option
Page({ 
  data: {  
   showView:true,  
  },
    //点赞切换
    clickDianzan(e) {
      var that=this
      ida=e.currentTarget.dataset.index
      console.log("ida",ida)
      //var s=ida
      db.collection('article').where ({_id:id}).get({
        success:function(res){
           s=res.data.answer[ida].likes
          console.log("likes",s)
        }
      })
      db.collection('article').where({
        _id:id,          
      }).update({
        data:{
          ['answer.'+ ida +'.like']:_.inc(1),
          ['answer.'+ida+'.likes']:!s,
         // ['answer.ids.dianzan']:_.inc(1)
        }
      })
      //刷新
   
      wx.showToast({
        title: '点赞成功！',
      })     
      this.onShow()
  },
 
clickShoucang(e){
  var that =this;
  ida=e.currentTarget.dataset.index
  console.log("ida",ida)
  db.collection('article').where({_id:id}).get({
    success:function(res){
      d=res.data.answer[ida].collects
      console.log("collects",d)
    }
  })
  db.collection('article').where({
    _id:id,
  }).update({
   data:{
     ['answer.'+ida+'.collect']:_.inc(1),
    ['answer.'+ida+'.collects']:!d
   }
  })
  //刷新
  wx.showToast({
    title: '收藏成功！',
  })
  this.onShow()
  db.collection('article').doc(id).get({
    success:function(res){
      console.log("res",res)
      ava=res.data.answer[ida].createTime
      console.log("times",ava)
      shou=res.data.answer[ida].collect    
    }
   })
  
},

  
back(){
  wx.reLaunch({
    url: '/pages/share/talk/talk',
  })
},

add_sharefunction(){
  wx.navigateTo({
    url: '/pages/share/share2/share2',
  })
},
talkjump(e){
  console.log(" dfffgf"+e.currentTarget.id)
  wx.navigateTo({
    url: '/pages/share/talks/talks?id='+e.currentTarget.id,
  })

},
show:function(e) {
  this.setData({
    showView:false
  })
  //console.log("id",e.target.id)
},
  
  
close: function () {
  
  this.setData({
    showView:true
  })
  this.onShow();
},

  onLoad: function (options) {
    views++;
    this.setData({
      view:views
    })
    console.log("传过来的数据是")
    console.log(options.id)
     id=options.id
    var that=this
    db.collection('article').where({
      _id:id
    }).get({
      success:function(res){
        that.setData({
          art:res.data
        })      
      }
    })
    db.collection('comments').where({
      article_id:artid
    }).get({
      success:function(res){
        console.log("comments",res.data)
        that.setData({
          comments:res.data
        })
      }
    })
  },
    
  commentinput:function(e){
    comments=e.detail.value
   // console.log("comment",comments)
  }   ,
 /**
   * 发布评论
   */
submit(e) {
 
  if (comments == '') {
    wx.showToast({
      title: '请填写评论',
      icon: 'none'
    })
  } else {
    console.log("我的评论：" + comments) 
    this.addComment();    
  }
},
 /**
 * 新增评论
 */
addComment(e) {
  var _this = this;
  var openid = wx.getStorageSync("openid")
  console.log(openid)
  // wx.showLoading({
  //   title: '正在加载...',
  // })
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  db.collection('comments').add({
    data:{
      create_date:app.getNowFormatDate1(),
      content:comments,
      //openid:_this.data.openid,
      article_id:ava,
      timestamp:_this.data.timestamp,
    }
  })
  db.collection('article').where({
    _id:id
  }).update({
    data:{
       ['answer.'+ida+'.comments']:_.inc(1)
    }
   
  })
  wx.showToast({
    title: '评论成功！',
  })
  this.onShow()
},
onShow(){
  var that=this
  db.collection('article').where({
    _id:id
  }).get({
    success:function(res){
      that.setData({
        art:res.data
      })      
    }
  })
  db.collection('comments').where({
    article_id:artid
  }).get({
    success:function(res){
      console.log("comments",res.data)
      that.setData({
        comments:res.data
      })
    }
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
}

})