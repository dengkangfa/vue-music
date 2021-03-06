var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router();

// 歌曲列表
apiRoutes.get('/getDiscList', function (req, res) {
      var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

      axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      }).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    })
})

// 歌词请求
apiRoutes.get('/lyric', function (req, res) {
      var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

      axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      }).then((response) => {
        var ret = response.data
        if (typeof ret === 'string') {
        // 如果返回值不是json数据，而是jsonp函数则将字符串转换成为json数据
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    }).catch((error) => {
        console.log(error)
    })
})

apiRoutes.get('/getCdSongList', function (req, res) {
      var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

      axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      }).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})