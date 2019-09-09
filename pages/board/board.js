import news from '../../utils/news.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: {
      key: '/109-35',
      title: '正在热映',
      content: [
        // {image:'',id:xx}
      ]
    },
    list: [
      // { key: 'coming_soon', title: '即将上映' },
      // { key: 'top250', title: 'Top250' },
      // { key: 'in_theaters', title: '正在热映' },
      // { key: 'us_box', title: '北美票房榜' }  数据格式有误
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    news({
      url:this.data.banner.key ,
      data: {
        "maxResult": "5",
        "title": "足球",
        "page": "1",
        "showapi_appid": 104235,
        "showapi_sign": '0d15b1282d164193960ef72f0dbc8c55'
      }
    }).then(
      res=>{
        if (!res.data.showapi_res_body) return;
        let result = [];
        res.data.showapi_res_body.pagebean.contentlist.map((item) => {
          if(item.havePic){
            result.push({
              id:item.id,
              image:item.imageurls[0].url
            })
          }
        });

        this.setData({
          banner:{
            content: result
          }
        })

        // this.setData({
        //   'banner.content': result
        // })

      }
    )

    news({
      url: '/109-34',
      data: {
        "showapi_appid": 104235,
        "showapi_sign": '0d15b1282d164193960ef72f0dbc8c55'
      }
    }).then(res=>{
      if (!res.data.showapi_res_body) return;
      this.setData({
        list:res.data.showapi_res_body.channelList
      })
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