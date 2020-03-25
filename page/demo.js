import CardScanner from '../cardscanner/cardscanner.js'
Page({
  onLoad(options) {
    let that = this
    this.imgPath = options.imgPath
    this.cardScanner = new CardScanner(this)
      .on('ImageChanged', (imgPath) => {
        // 选择上传图片
        that.imgPath = imgPath // 图片路径
      })
      .on('DecodeStart', (imgPath) => {
        // 提交图片
        wx.showLoading({
          title: '解析中',
          mask: true
        })
      })
      .on('DecodeComplete', (res) => {
        wx.hideLoading()
        if (res.code == 0) {
          wx.showModal({
            title: '',
            content: JSON.stringify(res.data),
          })
        } else {
          console.log('解析失败：' + res.reason)
        }
      })
  },
  onReady() {
    this.cardScanner.setImage(this.imgPath)
  }
})