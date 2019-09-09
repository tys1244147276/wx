import news from '../../utils/news.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    subtitle: '请输入关键词搜索',
    list: [],
    search: '',
    loading: false,
    hasMore: false
  },

  loadList(){

    this.setData({ subtitle: '加载中...', hasMore: true, loading: true })
    let start = (this.data.page - 1) * this.data.size;//计算开始条数
    this.setData({
      page: this.data.page + 1
    });

    news({
      url: '/109-35',
      data: {
        "page":this.data.page,
        "title": this.data.search,
        "showapi_appid": 104235,
        "showapi_sign": '0d15b1282d164193960ef72f0dbc8c55'
      },
      loadingTop: true
    }).then(
      res => {
        console.log(res.data)
        this.setData({ loading: false, hasMore: false});
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
        this.setData({
          list: this.data.list.concat(result),
        });
        // console.log('请求成功', this.data.list)
        wx.stopPullDownRefresh(); //停止下拉刷新UI
      }
    )
  },

  handleSearch(e) {
    if (!e.detail.value) return
    this.setData({ list: [], page: 1 })//每次搜索前清空数据
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value });
    this.loadList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.data.list = [];
    this.data.page = 1;
    this.loadList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.data.page++;
    this.loadList(); //加载更多
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})