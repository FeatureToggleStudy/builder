import vcCake from 'vc-cake'
import MobileDetect from 'mobile-detect'
// import React from 'react'
import '../polyfills'
import '../sources/less/bootstrap/init.less'
import '../sources/css/wordpress.less'
import '../config/variables'
import '../config/themeEditorHeader-services'
import '../config/themeEditorHeader-attributes'

const $ = require('expose?$!jquery')
$(() => {
  let $iframeContainer = $('.vcv-layout-iframe-container')
  let $iframe = $iframeContainer.find('#vcv-editor-iframe')
  // Get a handle to the iframe element
  let iframe = $iframe.get(0)
  let iframeDoc = iframe.contentDocument || iframe.contentWindow.document
  let isIframeLoaded = false

  let addStores = (iframeDocument, editorType) => {
    vcCake.env('editor', editorType)

    require('../editor/stores/elements/elementsStorage')
    require('../editor/stores/assets/assetsStorage')
    require('../editor/stores/shortcodesAssets/storage')
    require('../editor/stores/templatesStorage')
    const templatesStorage = vcCake.getStorage('templates')
    templatesStorage.trigger('start')

    require('../editor/stores/workspaceStorage')
    if (vcCake.env('HUB_TEASER_ELEMENT_DOWNLOAD')) {
      require('../editor/stores/hub/hubElementsStorage')
      require('../editor/stores/hub/hubTemplatesStorage')
      const hubElementsStorage = vcCake.getStorage('hubElements')
      hubElementsStorage.trigger('start')
      const hubTemplatesStorage = vcCake.getStorage('hubTemplates')
      hubTemplatesStorage.trigger('start')
    }
    require('../editor/stores/history/historyStorage')
    require('../editor/stores/settingsStorage')
    require('../editor/stores/wordpressData/wordpressDataStorage')

    require('../config/themeEditorHeader-modules')
  }

  let addIframeStyles = (iframeDocument) => {
    let iframeStyles = iframeDocument.createElement('style')
    iframeStyles.setAttribute('type', 'text/css')
    iframeStyles.innerText = `html {
      margin-top: 0px !important;
    }`
    iframeDocument.head.appendChild(iframeStyles)
  }

  let addMobileSettings = (iframeDocument) => {
    const mobileDetect = new MobileDetect(window.navigator.userAgent)
    if (mobileDetect.mobile() && (mobileDetect.tablet() || mobileDetect.phone())) {
      $(iframeDocument.body).on('contextmenu', 'a[href]', (e) => {
        e && e.preventDefault()
        e && e.stopPropagation()
      })
    }
  }

  let addDefaultSettings = (iframeDocument) => {
    $(iframeDocument.body).on('click', 'a[href]', (e) => {
      e && e.preventDefault()
    })

    $(iframeDocument.body).on('click', '[type="submit"]', (e) => {
      e && e.preventDefault() && e.stopPropagation()
    })
  }

  let addIOSStyles = (iframeDocument) => {
    let style = iframeDocument.createElement('style')
    style.setAttribute('type', 'text/css')
    style.innerText = 'html, body {'
    style.innerText += 'height: 100%;'
    style.innerText += 'width: 100vw;'
    style.innerText += 'overflow: auto;'
    style.innerText += '-webkit-overflow-scrolling: touch;'
    style.innerText += '-webkit-user-select: none;'
    style.innerText += 'user-select: none;'
    style.innerText += '}'
    style.innerText += 'a[href] {'
    style.innerText += '-webkit-touch-callout: none !important;'
    style.innerText += '}'
    iframeDocument.head.appendChild(style)
  }

  let iframeLoadEvent = () => {
    if (!vcCake.env('IFRAME_RELOAD')) {
      if (!isIframeLoaded) {
        isIframeLoaded = true
      } else {
        return
      }
    }
    let iframe = $iframe.get(0).contentWindow
    let iframeDocument = iframe.document
    // Disable iframe clicks
    addDefaultSettings(iframeDocument)

    if (vcCake.env('MOBILE_DETECT')) {
      addMobileSettings(iframeDocument)
    }

    addIframeStyles(iframeDocument)

    if (vcCake.env('MOBILE_DETECT')) {
      const mobileDetect = new MobileDetect(window.navigator.userAgent)
      if (mobileDetect.mobile() && mobileDetect.os() === 'iOS') {
        addIOSStyles()
      }
    }

    $('[data-vcv="edit-fe-editor"]', iframeDocument).remove()

    vcCake.env('platform', 'wordpress').start(() => {
      addStores(iframeDocument, 'header')
    })

    vcCake.env('iframe', iframe)

    if (vcCake.env('IFRAME_RELOAD')) {
      $iframe.get(0).contentWindow.onunload = function (e) {
        let lastLoadedPageTemplate = window.vcvLastLoadedPageTemplate || window.VCV_PAGE_TEMPLATES && window.VCV_PAGE_TEMPLATES() && window.VCV_PAGE_TEMPLATES().current
        let lastSavedPageTemplate = vcCake.getStorage('settings').state('pageTemplate').get() || lastLoadedPageTemplate
        window.vcvLastLoadedPageTemplate = lastSavedPageTemplate
        vcCake.getStorage('workspace').state('iframe').set({ type: 'reload', template: lastSavedPageTemplate })
      }
    }
  }

  $iframe.on('load', iframeLoadEvent)
  // Check if loading is complete
  const isContentLoaded = $iframe.get(0).contentWindow.document.body &&
    $iframe.get(0).contentWindow.document.body.getAttribute('class') &&
    $iframe.get(0).contentWindow.document.body.childNodes.length

  if (iframeDoc && iframeDoc.readyState === 'complete' && isContentLoaded) {
    iframeLoadEvent()
  }

  if (vcCake.env('MOBILE_DETECT')) {
    const mobileDetect = new MobileDetect(window.navigator.userAgent)
    if (mobileDetect.mobile() && (mobileDetect.tablet() || mobileDetect.phone())) {
      $iframeContainer.find('.vcv-layout-iframe-wrapper').addClass('vcv-layout-iframe-container--mobile')

      const $layoutContainer = $('.vcv-layout-container')
      if ($layoutContainer) {
        $layoutContainer.height(window.innerHeight)
        window.addEventListener('resize', () => {
          let height = window.innerHeight
          $layoutContainer.height(height)
        })
      }
    }
  }
  if (vcCake.env('TF_HEARTBEAT_HAS_CLASS_ERROR') && window.wp.heartbeat) {
    window.wp.heartbeat.interval(120)
  }
})

if (vcCake.env('debug') === true) {
  window.app = vcCake
}
// window.vcvAddElement = vcCake.getService('cook').add
// window.React = React
// window.vcvAPI = vcCake.getService('api')
// if (!vcCake.env('FEATURE_WEBPACK')) {
//   require('./config/elements')
// }

// import './sources/newElements/row'
// import './sources/newElements/column'
// import './sources/newElements/textBlock'