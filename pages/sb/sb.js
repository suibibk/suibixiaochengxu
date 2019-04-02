// pages/sb/sb.js
var url = "https://www.suibibk.com";
var topics = [];
var type=0;
var page=1;
var one=true;
Page({
  data: {
    motto: 'Hello World',
    topics: [],
    new: 1,
    msg:"正在加载...",
    displayType:"none"
  },
  //跳转到我的博客
  topic: function (event) {
    console.log(event);
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../topic/topic?id=' + id,
    })
  },
  getTopics: function (type) {
    if(!one){
      return;
    }
    one=false;
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
        one=true;
        console.log(res.data)
        var new_topics= res.data.obj;
        var len = new_topics.length;
        if(len==0){
          this.setData({
            msg:"未查询到记录",
            displayType: "none"
          });
        }else{
          for (var index in new_topics) {
            new_topics[index].description = new_topics[index].description.replace(/\/fileupload\/images/g, url + "/fileupload/images/");
            //new_topics[index].description = new_topics[index].description.replace(/\/xheditor\/xheditor_emot/g, url + "/xheditor/xheditor_emot/");
            new_topics[index].description = new_topics[index].description.replace(/\/editormd\/plugins/g, url + "/editormd/plugins/");
          }
          topics = topics.concat(new_topics)
          this.setData({
            msg:"",
            displayType: "block",
            topics: topics
          });
        }
        
      },
      fail: function (err) {
        one = true;
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    type=0;
    topics = [];
    page=1;
    this.getTopics(0);
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
    topics = [];
    type = 0;
    page=1;
    this.getTopics(0);
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
    topics = [];
    type = 2;
    page=1;
    this.getTopics(2);
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
    topics = [];
    type =3;
    page=1;
    this.getTopics(3);
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
  },
  more:function(){
    page=page+1;
    this.getTopics(type);
    this.setData({
      msg: "正在加载..."
    });
  },
  onReachBottom: function () {
    console.log("底部");
    this.more();
  }
})