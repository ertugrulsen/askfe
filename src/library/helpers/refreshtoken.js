import configStore from './configStore'
import Axios from 'axios'

export async function refreshToken () {
  return new Promise((resolve, reject) => {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }

    Axios({
      method: 'post',
      url: (process.env.NODE_ENV === 'production' ? configStore.settings.publishUrl : configStore.settings.localUrl) + 'Authentication/RefreshAccessToken/',
      data: { refreshToken: localStorage.getItem('refreshtoken'), accessToken: localStorage.getItem('accesstoken') },
      headers: headers
    }).then(function (response) {
      localStorage.setItem('accesstoken', response.data.Response.AccessToken)
      localStorage.setItem('refreshtoken', response.data.Response.RefreshToken)

      resolve(response)
    })
      .catch(error => {
        // burda ki error ikinci promise nin reject'inde yakalanıyor
        console.log(error)
        reject(error)
      })
  })
}
