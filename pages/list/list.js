import news from '../../utils/news.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    start:10,
    list: [
      // {id:'', image: '', title: '', average: 4.3, original_title: '', year: '', directors:''}
    ]
  },

  update(key){
    news({
      url: '/109-35',
      data: {
       "channelId": key,
        "page": this.data.start--,
        "showapi_appid": 104235,
        "showapi_sign": '0d15b1282d164193960ef72f0dbc8c55'
      },
      loadingTop: true
    }).then(
      res => {
        console.log(res)
        if (!res.data.showapi_res_body) return;
        let result = [];
        res.data.showapi_res_body.pagebean.contentlist.map((item) => {
          result.push({
            image: item.imageurls,
            id: item.id,
            title: item.title,
            allList: item.allList,
            time: item.pubDate
          })
        });
        console.log(result)
        
        this.setData({
          list: result
        });

        wx.stopPullDownRefresh();//接受下拉刷新

      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ key: options.key});
    this.update(options.key)
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
    // this.setData({list:[]})
    this.update(this.data.key)
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