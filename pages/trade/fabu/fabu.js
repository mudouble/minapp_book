
var app = getApp();

Page({
  data: {
    count: "1",
    len: "",
    userInfo: '',
    imgList: [],//图片
    fileIDs: [],
    chooseViewShowDetail: true, 
    sort:[{
      name: '全部',
      id:0
    },{
      name: '通用',
      id:1
    },{
      name: '考研',
      id:2
    },{
      name: '考证',
      id:3
    },{
      name: '课外',
      id:4
    }],
    items:[{name:'1',value:'售卖',checked:false},
            {name:'0',value:'出租',checked:false},
    ],
    index:0, 
  
    ind:0,
  },
  back:function(){
    wx.switchTab({
      url: '/pages/trade/trade',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.cloud.database().collection('goods').count()
      .then(res => {
        console.log("数据总条数", res.total)
        this.setData({
          len: res.total
        })
      })
  },
    //获取  
    title(event) {
    console.log("title", event.detail.value)
    this.setData({
      title : event.detail.value
    })
  },
  sort1:function(e) {
      console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  radioChange(event) {
    console.log("buy_rent", event.detail.value)
    this.setData({
      buy_rent : event.detail.value
    })
  
  },
  price(event) {
    console.log("price", event.detail.value)
    this.setData({
      price : event.detail.value
    })
  },
  info(event) {
    console.log("info", event.detail.value)
    this.setData({
      info : event.detail.value
    })
  },
  author(event) {
    console.log("author", event.detail.value)
    this.setData({
      author : event.detail.value
    })
  },
  address(event) {
    console.log("address", event.detail.value)
    this.setData({
      address : event.detail.value
    })
  },
  chooseImage() {
    wx.chooseImage({
      count: 8 - this.data.imgList.length, //默认9,我们这里最多选择8张
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log("选择图片成功", res)
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log("路径", this.data.imgList)
      }
    });
  },
  //删除图片
  DeleteImg(e) {
    wx.showModal({
      title: '要删除这张照片吗？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
//上传数据
publish() {
  let pricetags = this.data.title
  let count = this.data.count
  let price = this.data.price
  let buy_rent = this.data.buy_rent
  let info = this.data.info
  let author = this.data.author
  let address=this.data.address
  let sort = this.data.sort
  let userInfo = this.data.userInfo
  let state = this.data.state
  let imgList = this.data.imgList
  //console.log("buy_ren",price,this.data.buy_rent)
  if (!imgList || imgList.length < 1) {
    wx.showToast({
      icon: "none",
      title: '请选择4张图片以上'
    })
    return
  }

  wx.showLoading({
    title: '发布中...',
  })
  wx.showLoading({
    title: '发布成功！',
  })
  const promiseArr = []
  //只能一张张上传 遍历临时的图片数组
  for (let i = 0; i < this.data.imgList.length; i++) {
    let filePath = this.data.imgList[i]
    let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
    //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
    promiseArr.push(new Promise((reslove, reject) => {
      wx.cloud.uploadFile({
        cloudPath: new Date().getTime() + suffix,
        filePath: filePath, // 文件路径
      }).then(res => {
        // get resource ID
        console.log("上传结果", res.fileID)
        this.setData({
          fileIDs: this.data.fileIDs.concat(res.fileID)
        })
        reslove()
      }).catch(error => {
        console.log("上传失败", error)
      })
    }))
  }
  //保证所有图片都上传成功
  let db = wx.cloud.database()
  Promise.all(promiseArr).then(res => {
    db.collection('goods').add({
      data: {
        status:0,
        title: this.data.title,
        info: this.data.info,
        author: this.data.author,
        address:this.data.address,
        fileIDs: this.data.fileIDs,
        date: app.getNowFormatDate1(),
        createTime: db.serverDate(),
        price: this.data.price,
        images: this.data.imgList,
        sort: this.data.index,
        count: parseInt(this.data.count),
        userInfo: this.data.userInfo,
        key: this.data.title,
        buy_rent: this.data.buy_rent,
        rents_status:0
      },
      success: res => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        }) 
        wx.switchTab({
         url: '/pages/trade/trade',
       })
        console.log('发布成功', res)
    
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '网络不给力....'
        })
        console.error('发布失败', err)
      }
    })
  })
  this.onLoad();
},
getUserInfo: function (e) {
  console.log(e)
  app.globalData.userInfo = e.detail.userInfo
  this.setData({
    userInfo: e.detail.userInfo,
    hasUserInfo: true
  })
},
onShow(){
  this.onLoad();
}
})