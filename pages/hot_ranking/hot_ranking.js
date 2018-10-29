// pages/hot_ranking/hot_ranking.js
const util = require('../../utils/util.js')
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: null,
    hasCity: false,
    rankingLists: {},
    hasRankingLists: false
  },
  //事件处理函数
  bindViewTap: function (event) {
    let { path, item } = event.currentTarget.dataset,
      url = `../${path}/${path}`
    // url = id && `${url}?id=${id}` || url

    wx.setStorage({
      key: "rankingItem",
      data: item
    })
    wx.navigateTo({ url })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GVRBZ-OZTWU-V7HV7-4KQJX-2CEIQ-UTFFW'
    });
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        // 调用接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          coord_type: 1,
          get_poi: 1,
          // poi_options: address_format = short,
          success: response => {
            this.setData({
              city: response.result.ad_info.city,
              hasCity: true
            })
          },
          fail: error => {
            console.log(error);
          },
          // complete: function (response) {
          //   console.log(response);
          // }
        });

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
                rankingLists: (response.data.data || []).map((item, index) => {
                  item.CreateTime = util.formatDate(new Date(Number(item.CreateTime + '000')))
                  item.Top = util.formatNumber(index + 1)
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