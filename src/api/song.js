import {commonParams} from './config'
import {ERR_OK} from 'api/config'
import jsonp from 'common/js/jsonp'
import axios from 'axios'

export function getSongUrl(id, mid) {
  /* eslint-disable new-parens */
  var t = (new Date).getUTCMilliseconds()
  const guid = Math.round(2147483647 * Math.random()) * t % 1e10
  return getKey(id, mid, guid).then((res) => {
    if (res.code === ERR_OK) {
      let filename = 'C400' + mid + '.m4a'

      return 'http://dl.stream.qqmusic.qq.com/' + filename + '?guid=' + guid + '&vkey=' + res.data.items[0].vkey + '&fromtag=38'
    }
  })
}

function getKey(id, mid, guid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    guid: guid,
    filename: id + '.m4a'
  })

  return jsonp(url, data)
}

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 67232076,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}