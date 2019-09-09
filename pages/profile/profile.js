// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      latitude: '',
      longitude: '',
      markers: [{
        iconPath: "../../images/map.png",
        id: 0,
        latitude:'',
        longitude:'',
        width: 50,
        height: 50
      }]
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
    var that=this;
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userLocation'])
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title:'提示',
            content: '需要授权才能继续操作，请授权',
            confirmText:"授权",
            cancelText:"取消",
            showCancel:true,
            success:(res)=>{
              if(res.confirm){
                wx.openSetting({
                  success:(res)=>{
                    res.authSetting = {
                      "scope.userLocation": true
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          markers: {
            iconPath: "../../images/map.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 50,
            height: 50
          },
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
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