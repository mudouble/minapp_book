const app=getApp()
var total
Page({

  data: {
    radioId:"",
    yunfei:1,
    loves:[{id:1,name:'帮送',checked:'true'},{id:2,name:'自提'}],
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    total1:1
  },
  radioChange:function(e){
    console.log("ggg",e.detail.value)
    if(e.detail.value==2){
      this.data.yunfei=0;  
      this.data.total1=1;
    //  this.onLoad();
    }
    if(e.detail.value==1){
      this.data.yunfei=1;  
      this.data.total1=2;
    //  this.onLoad();
    }
   console.log("changed",this.data.yunfei)
    this.setData({
          yunfei:this.data.yunfei,
          total1:this.data.total1
     })
 },

 back(){
   wx.navigateBack({
     delta: 1,
   })
 },
  onLoad: function (options) {
    var that =this
    console.log("subway the data:",options.id)
    const db=wx.cloud.database()
    db.collection('goods').where({
      rents_status:1,
      _id:options.id,
  }).get({
      success:function(res){
        console.log("rent",res.data)
        // console.log("why",r)
        console.log("text",res.data[0].price)
        total=res.data[0].price
        that.setData({
          r:res.data,
          total:total
        })
       
      }
    })

  },
dates:function(e){
  this.setData({
    date: e.detail.value
  })

},
times:function(e){
  this.setData({
    time: e.detail.value
  })
},
function () {
  this.showInputLayer();
},
/**
   * 显示支付密码输入层
   */
  showInputLayer: function(){
    this.setData({ showPayPwdInput: true, payFocus: true });
  },

 /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function(){
    
    var val = this.data.pwdVal;
 
    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function(){
      wx.showToast({
        title: val,
      })
    });
 
  },
  /**
   * 获取焦点
   */
  getFocus: function(){
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e){
      this.setData({ pwdVal: e.detail.value });
 
      if (e.detail.value.length >= 6){
        this.hidePayLayer();
      }
  }

 
})