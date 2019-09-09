import news from '../../utils/news.js'
Page({

  /**
   * 页面的初始数据
   */
  properties: {
    channelId: {
      type: String
    }
  },
  data: {
    title: '加载中',
    detail: {},
    photos:[]
  },

  clickImage(){

    wx.previewImage({
      current: this.data.photos[0], // 当前显示图片的http链接
      urls: this.data.photos
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    news({
      url: '/109-35',
      data:{
        "id":options.id,
        "showapi_appid": 104235,
        "showapi_sign": '0d15b1282d164193960ef72f0dbc8c55'
      },
      loadingTop:true
    }).then(
      res=>{
      let arr = []
      if (!res.data.showapi_res_body) return;

      res.data.showapi_res_body.pagebean.contentlist[0].allList.map(item => {
          if (typeof item != 'object') {
            arr.push(item)
          }
        })

      this.setData({
        detail: {
          images: res.data.showapi_res_body.pagebean.contentlist[0].imageurls,
          title: res.data.showapi_res_body.pagebean.contentlist[0].title,
          time: res.data.showapi_res_body.pagebean.contentlist[0].pubDate,
          source: res.data.showapi_res_body.pagebean.contentlist[0].source,
          desc: res.data.showapi_res_body.pagebean.contentlist[0].desc,
          id: res.data.showapi_res_body.pagebean.contentlist[0].id,
          summary:arr
        }
      })
        wx.setNavigationBarTitle({ title: res.data.showapi_res_body.pagebean.contentlist[0].channelName })
    }
   
    )
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