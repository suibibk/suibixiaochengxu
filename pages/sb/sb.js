// pages/sb/sb.js
var url = "https://www.suibibk.com";
Page({
  data: {
    motto: 'Hello World',
    topics: [],
    new: 1
  },
  getTopics: function (page,type) {
    wx.request({
      url: url + "/getTopics",
      data: {
        menuid: '0',
        userid: '0',
        page: page,
        hot: '',
        type: type
      },
      method: "POST",
      header: {
        //"Content-Type":"application/json"
        "Content-Type": " application/x-www-form-urlencoded"

      },
      //success: function(res) {
      success: res => {
        console.log(res.data)
        var topics = res.data.obj;
        for (var index in topics) {
          topics[index].description= topics[index].description.replace(/\/fileupload\/images/g, url + "/fileupload/images/");
        }
        this.setData({
          topics: topics
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopics(1,0);
  },
  //事件处理函数
  getNewTopics: function () {
    this.setData({
      new: 1,
      month: 0,
      year: 0,
      user: 0,
      menu: 0
    });
    this.getTopics(1, 0);
  },
  //事件处理函数
  getMonthTopics: function () {
    this.setData({
      new: 0,
      month: 1,
      year: 0,
      user: 0,
      menu: 0
    });
    this.getTopics(1, 2);
  },
  //事件处理函数
  getYearTopics: function () {
    this.setData({
      new: 0,
      month: 0,
      year: 1,
      user: 0,
      menu: 0
    });
    this.getTopics(1, 3);
  },
  //事件处理函数
  getHotUsers: function () {
    this.setData({
      new: 0,
      month: 0,
      year: 0,
      user: 1,
      menu: 0
    });
  },
  //事件处理函数
  getHotMenus: function () {
    this.setData({
      new: 0,
      month: 0,
      year: 0,
      user: 0,
      menu: 1
    });
  }
})