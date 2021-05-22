const App=getApp()
Page({
    data:{
      cartItems:[],
      toyal:0,
      checkAll:true,
     
    }, 
    // 获取数据
    onLoad:function(){
      console.log("fgfgff")
      var cartItems=wx.getStorageSync('cartItems')
      console.log("cartItems,{}", cartItems); 
      this.setData({
      //  cartList:false,  
        cartItems:cartItems
      })   
      this.getsumTotal()
    }, 
    back:function(e){
       wx.navigateBack({
         delta: 1,
       })
    },
    selectIcon:function(e){
      var cartItems=this.data.cartItems
      var index=e.currentTarget.dataset.index;
      var selected=cartItems[index].selected;
      cartItems [index].selected =!selected;
       this.setData({
        cartItems: cartItems
       })
       this.getsumTotal();
       wx.setStorageSync("cartItems", cartItems)
       this.onLoad()
    },
  //   //增加商品数量
    add:function(e){
      var index=e.currentTarget.dataset.index
      var cartItems=this.data.cartItems
      var value=cartItems[index].value
      value++
      cartItems[index].value=value
      this.setData({
        cartItems:cartItems
      });
      this.getsumTotal()
      wx.setStorageSync('cartItems', cartItems)
      this.onLoad()
    },
    //商品减少
    reduce:function(e){
      var index=e.currentTarget.dataset.index
      var cartItems=this.data.cartItems
      var value=cartItems[index].value
      if(value==1){
        value--
        cartItems[index].value=1
      }else{
        value--
        cartItems[index].value=value;
      }
      this.setData({
        cartItems:cartItems
      });
      this.getsumTotal()
      wx.setStorageSync('cartItems', cartItems)
      this.onLoad()
    },
    //全选
    select:function(e){
      var checkAll=this.data.checkAll
      checkeAll=!checkAll
      var cartItems=this.data.cartItems
      for(var i=0;i<cartItems.length;i++){
        cartItems[i].selected=checkAll
      }
      this.setData({
        cartItems:cartItems,
        checkAll:checkAll
      })
      this.getsumTotal()
    },

   delete:function(e){
     var cartItems=this.data.cartItems;
     var index=e.currentTarget.dataset.index;
     cartItems.splice(index,1)
     this.setData({
       cartItems:cartItems
     });
     if(cartItems.length){
      this.setData({
        cartList:false
     });
    }
     this.getsumTotal()
      wx.setStorageSync('cartItems', cartItems)
      this.onLoad()
   },
   //清空购物车
   clearcart:function(e){
     this.setData({
      cartItems: [],
       total:0
     })
     wx.setStorageSync('cartItems', [])
   },
   //跳转到支付页面
   goPay:function(e){
     wx.setStorageSync('cartItems', this.data.cartItems)
     wx.setStorageSync('total', this.data.total)
     wx.navigateTo({
       url:'/pages/trade/jiesuan/jiesuan'
     })
   },
  //  //合计商品总价
   getsumTotal:function(){
     var cost=0;
     for(var i=0;i<this.data.cartItems.length;i++){
       if(this.data.cartItems[i].selected){
         cost+=this.data.cartItems[i].value*this.data.cartItems[i].price
       }
     //更新数据
     this.setData({
       total:cost.toFixed(2)
    
     })
     console.log("qqqq",cost.toPrecision(4))
     console.log("q",cost.toFixed(2))
    }
  },
 
  })