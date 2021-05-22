const app=getApp()
var yunfei=1
var total1
Page({

  data: {
    radioId:"",
    loves:[{id:1,name:'帮送',checked:'true'},{id:2,name:'自提'}],
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
  },
  radioChange:function(e){
    console.log("ggg",e.detail.value)
    if(e.detail.value==2){
      yunfei=0;
        this.setData({
          yunfei:0
     })
     this.onLoad();
    }
   console.log("changed",yunfei)

 },

 back(){
   wx.navigateBack({
     delta: 1,
   })
 },
  onLoad: function (options) {
    var cartItems=wx.getStorageSync('cartItems')
    var total=wx.getStorageSync('total')
    // var payId=options.id
    
    total1=( Number(total) )+yunfei
    this.setData({
      cartItems:cartItems,
      total:Number(total).toFixed(2),
      total1:Number(total1).toFixed(2),
      yunfei:yunfei.toFixed(2)
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