import news from '../../utils/news.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      // {image:'',id:xx}
    ]
  },

  clickHandler(){
    wx.switchTab({
      url: '/pages/board/board',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let res = wx.getStorageSync('news_user');
    if(res){
      wx.switchTab({
        url: '/pages/board/board',
      })
      return;
    }

    news({
      url:'/109-35',
      data: {
        "maxResult": "3",
        "title": "中国男篮", 
        "page": "1", 
        "showapi_appid": 104235,
        "showapi_sign": '0d15b1282d164193960ef72f0dbc8c55'
        }
    }).then((res)=>{
      if (!res.data.showapi_res_body) return;
      let result = [];
      res.data.showapi_res_body.pagebean.contentlist.map((item) => {
        item.imageurls.map(item=>{
          result.push(item.url)
        })
      });

      this.setData({ movies: result})

      //写入storage
      wx.setStorageSync('news_user', true)

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