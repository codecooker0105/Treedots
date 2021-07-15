/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

import 'src/css/app.scss'

// import Quasar stylesheet file
import 'quasar/dist/quasar.sass'

//import quasar google map stylesheet file
import 'quasar-ui-q-google-map/src/index.sass'

//import quasar google map register file
import qboot_Quasarappextensionqgooglemapsrcbootregisterjs from 'quasar-app-extension-q-google-map/src/boot/register.js'

import Vue from 'vue'
import createApp from './app.js'

Vue.config.devtools = true
Vue.config.productionTip = false

const publicPath = ``

async function start () {
  const { app, router } = await createApp()

  let hasRedirected = false
  const redirect = url => {
    hasRedirected = true
    const normalized = Object(url) === url
      ? router.resolve(url).route.fullPath
      : url

    window.location.href = normalized
  }

  const urlPath = window.location.href.replace(window.location.origin, '')
  const bootFiles = [qboot_Quasarappextensionqgooglemapsrcbootregisterjs]

  for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue
    }

    try {
      await bootFiles[i]({
        app,
        router,
        
        Vue,
        ssrContext: null,
        redirect,
        urlPath,
        publicPath
      })
    }
    catch (err) {
      if (err && err.url) {
        window.location.href = err.url
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (hasRedirected === true) {
    return
  }
  

  

    

    

    
      new Vue(app)
    

    

    

  

}

start()
