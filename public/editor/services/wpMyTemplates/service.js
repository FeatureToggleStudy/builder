import vcCake, { addService, getService, getStorage } from 'vc-cake'

// import { predefinedTemplates } from './lib/predefinedTemplates'

const utils = getService('utils')
const documentManager = getService('document')
let getType = {}.toString

let handleSaveRequest = (action, key, data, successCallback, errorCallback) => {
  let ajax = getService('utils').ajax

  return ajax({
    'vcv-action': `editorTemplates:${action}:adminNonce`,
    'vcv-nonce': window.vcvNonce,
    'vcv-template-type': window.VCV_EDITOR_TYPE && window.VCV_EDITOR_TYPE() || 'default',
    [key]: data
  }, (result) => {
    let response = JSON.parse(result.response)
    if (response && response.status) {
      successCallback && typeof successCallback === 'function' && successCallback(response)
    } else {
      errorCallback && typeof errorCallback === 'function' && errorCallback(response)
    }
  }, errorCallback)
}

addService('myTemplates', {
  add (name, data, html, successCallback, errorCallback) {
    if (this.findBy('name', name)) {
      return false
    }
    handleSaveRequest('create', 'vcv-template-data', encodeURIComponent(JSON.stringify({
      post_title: name,
      post_content: html,
      meta_input: {
        vcvEditorTemplateElements: data
      }
    })), (response) => {
      let id = response.status
      let templateData = { id: id.toString(), name: name, data: data, html: html }
      getStorage('templates').trigger('add', 'custom', templateData)
      successCallback && typeof successCallback === 'function' && successCallback()
    }, errorCallback)

    return true
  },
  addCurrentLayout (name, successCallback, errorCallback) {
    let currentLayout = documentManager.all()
    const iframe = document.getElementById('vcv-editor-iframe')
    const contentLayout = iframe ? iframe.contentWindow.document.querySelector('[data-vcv-module="content-layout"]') : false
    let currentLayoutHtml = contentLayout ? utils.normalizeHtml(contentLayout.innerHTML) : ''
    if (getType.call(name) === '[object String]' && name.length) {
      return this.add(name, currentLayout, currentLayoutHtml, successCallback, errorCallback)
    }
    return false
  },
  remove (id, successCallback, errorCallback) {
    handleSaveRequest('delete', 'vcv-template-id', id, (response) => {
      getStorage('templates').trigger('remove', 'custom', id)
      successCallback && typeof successCallback === 'function' && successCallback()
    }, errorCallback)
  },
  get (id) {
    let myTemplates = this.all()
    return myTemplates.find((template) => {
      return template.id === id
    })
  },
  findBy (key, value) {
    return this.getAllTemplates().find((template) => {
      return template[ key ] && template[ key ] === value
    })
  },
  all (filter = null, sort = null) {
    let custom = getStorage('templates').state('templates').get().custom
    let myTemplates
    if (vcCake.env('THEME_EDITOR')) {
      let customTemplates = custom && custom.templates ? custom.templates : []
      let customHeaderTemplates = this.customHeader() && this.customHeader().templates ? this.customHeader().templates : []
      let customFooterTemplates = this.customFooter() && this.customFooter().templates ? this.customFooter().templates : []
      let customSidebarTemplates = this.customSidebar() && this.customSidebar().templates ? this.customSidebar().templates : []

      myTemplates = customTemplates.concat(customHeaderTemplates, customFooterTemplates, customSidebarTemplates)
    } else {
      myTemplates = custom && custom.templates ? custom.templates : []
    }
    if (filter && getType.call(filter) === '[object Function]') {
      myTemplates = myTemplates.filter(filter)
    }
    if (sort && getType.call(sort) === '[object Function]') {
      myTemplates.sort(sort)
    } else if (sort === 'name') {
      myTemplates.sort((a, b) => {
        return a.name ? a.name.localeCompare(b.name, { kn: true }, { sensitivity: 'base' }) : -1
      })
    }
    return myTemplates
  },
  predefined () {
    let predefinedTemplates = getStorage('templates').state('templates').get().predefined
    return predefinedTemplates && predefinedTemplates.templates ? predefinedTemplates.templates : []
  },
  hub () {
    let hubTemplates = getStorage('templates').state('templates').get().hub
    return hubTemplates && hubTemplates.templates ? hubTemplates.templates : []
  },
  findTemplateByBundle (bundle) {
    const allTemplates = getStorage('templates').state('templates').get() || []
    const result = Object.keys(allTemplates).find((type) => {
      const hubTemplates = allTemplates[ type ] || []
      if (!hubTemplates.templates) {
        return false
      }
      const template = hubTemplates.templates.find((hubTemplate) => {
        return hubTemplate.bundle === bundle ? hubTemplate : false
      })
      return template
    })
    return result
  },
  hubAndPredefined () {
    let hubAndPredefined = this.hub().concat(this.predefined())
    return hubAndPredefined || []
  },
  hubHeader () {
    let hubHeaderTemplates = getStorage('templates').state('templates').get().hubHeader
    return hubHeaderTemplates && hubHeaderTemplates.templates ? hubHeaderTemplates.templates : []
  },
  hubFooter () {
    let hubFooterTemplates = getStorage('templates').state('templates').get().hubFooter
    return hubFooterTemplates && hubFooterTemplates.templates ? hubFooterTemplates.templates : []
  },
  hubSidebar () {
    let hubSidebarTemplates = getStorage('templates').state('templates').get().hubSidebar
    return hubSidebarTemplates && hubSidebarTemplates.templates ? hubSidebarTemplates.templates : []
  },
  customHeader () {
    let customHeaderTemplates = getStorage('templates').state('templates').get().customHeaders
    return customHeaderTemplates && customHeaderTemplates.templates ? customHeaderTemplates.templates : []
  },
  customFooter () {
    let customFooterTemplates = getStorage('templates').state('templates').get().customFooter
    return customFooterTemplates && customFooterTemplates.templates ? customFooterTemplates.templates : []
  },
  customSidebar () {
    let customSidebaremplates = getStorage('templates').state('templates').get().customSidebar
    return customSidebaremplates && customSidebaremplates.templates ? customSidebaremplates.templates : []
  },
  getAllTemplates (filter = null, sort = null) {
    let allTemplatesGroups = getStorage('templates').state('templates').get() || []
    let allTemplates = []
    for (let key in allTemplatesGroups) {
      allTemplates = allTemplates.concat(allTemplatesGroups[ key ].templates)
    }
    if (filter && getType.call(filter) === '[object Function]') {
      allTemplates = allTemplates.filter(filter)
    }
    if (sort && getType.call(sort) === '[object Function]') {
      allTemplates.sort(sort)
    } else if (sort === 'name') {
      allTemplates.sort((a, b) => {
        return a.name ? a.name.localeCompare(b.name, { kn: true }, { sensitivity: 'base' }) : -1
      })
    }
    return allTemplates
  },
  getLiteVersionTemplates () {
    // TODO get lite version templates from hub
    return this.getAllTemplates()
  }
})
