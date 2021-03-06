// ranking_details.js
const util = require('../../utils/util.js')
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeId: '',
    hasTypeId: false,
    typeName: '',
    hasTypeName: false,
    rankingLists: {},
    hasRankingLists: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      typeId: options.typeid || 0,
      hasTypeId: true,
      typeName: options.typename || '鞋业热门排行榜',
      hasTypeName: true
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GVRBZ-OZTWU-V7HV7-4KQJX-2CEIQ-UTFFW'
    });
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        wx.request({
          url: 'https://api.0577xiedu.com/v1/shoes_home/GetRankingList',
          method: 'POST',
          data: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: response => {
            if (response.data.ret === 1001) {
              this.setData({
                rankingLists: (response.data.data || []).map(item => {
                  item.CreateTime = util.formatDate(new Date(Number(item.CreateTime + '000')))
                  return item
                }),
                hasRankingLists: true
              })
            }

          },
          fail(error) {
            console.log(error)
          }
        })
      }
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