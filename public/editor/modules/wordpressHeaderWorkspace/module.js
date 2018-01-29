import { add, getStorage, getService, env } from 'vc-cake'
import React from 'react'
import ReactDOM from 'react-dom'
import WorkspaceCont from './containers/workspaceCont'
import StartBlankPanel from '../../../resources/components/startBlank/StartBlankPanel'

const workspaceStorage = getStorage('workspace')
const wordpressDataStorage = getStorage('wordpressData')
const elementsStorage = getStorage('elements')
const assetsStorage = getStorage('assets')
const utils = getService('utils')

add('wordpressWorkspace', (api) => {
  console.log('=====================')
  console.log('!!!!!IM ALIVE!!!!!!!')
  console.log('=====================')
  console.log('=====================')
  // Set Templates
  api.reply('start', () => {
    wordpressDataStorage.trigger('start')
  })
  workspaceStorage.state('settings').onChange((settings) => {
    if (env('NAVBAR_SINGLE_CONTENT')) {
      if (!settings || !settings.action) {
        workspaceStorage.state('content').set(false)
        return
      }
      if (settings.action === 'add') {
        workspaceStorage.state('content').set('addElement')
      } else if (settings.action === 'addHub') {
        workspaceStorage.state('content').set('addHubElement')
      } else if (settings.action === 'edit') {
        workspaceStorage.state('content').set('editElement')
      } else if (settings.action === 'addTemplate') {
        workspaceStorage.state('content').set('addTemplate')
      }
      return
    }

    if (!settings || !settings.action) {
      workspaceStorage.state('contentEnd').set(false)
      return
    }
    if (settings.action === 'add') {
      workspaceStorage.state('contentEnd').set('addElement')
    } else if (settings.action === 'addHub') {
      workspaceStorage.state('contentEnd').set('addHubElement')
    } else if (settings.action === 'edit') {
      workspaceStorage.state('contentEnd').set('editElement')
    } else if (settings.action === 'addTemplate') {
      workspaceStorage.state('contentEnd').set('addTemplate')
    }
  })
  let layoutHeader = document.getElementById('vcv-layout-header')
  if (layoutHeader) {
    ReactDOM.render(
      <WorkspaceCont />,
      layoutHeader
    )
  }

  // Start blank overlay
  let iframeContent = document.getElementById('vcv-layout-iframe-content')

  if (iframeContent) {
    const removeStartBlank = () => {
      ReactDOM.unmountComponentAtNode(iframeContent)
    }
    const addStartBlank = () => {
      ReactDOM.render(
        <StartBlankPanel unmountStartBlank={removeStartBlank} />,
        iframeContent
      )
    }
    let documentElements
    let isBlank = true

    elementsStorage.state('document').onChange((data, elements) => {
      documentElements = elements
      if (data.length === 0) {
        addStartBlank()
        isBlank = true
      } else if (data.length && isBlank) {
        let visibleElements = utils.getVisibleElements(documentElements)
        if (!Object.keys(visibleElements).length) {
          iframeContent.querySelector('.vcv-loading-overlay') && iframeContent.querySelector('.vcv-loading-overlay').remove()
        }
        if (!env('CSS_LOADING')) {
          iframeContent.querySelector('.vcv-loading-overlay') && iframeContent.querySelector('.vcv-loading-overlay').remove()
        }
        removeStartBlank()
        isBlank = false
      }
    })

    if (env('CSS_LOADING')) {
      assetsStorage.state('jobs').onChange((data) => {
        if (documentElements) {
          let visibleJobs = data.elements.filter(element => !element.hidden)
          let visibleElements = utils.getVisibleElements(documentElements)
          let documentIds = Object.keys(visibleElements)
          if (documentIds.length === visibleJobs.length) {
            let jobsInprogress = data.elements.find(element => element.jobs)
            if (jobsInprogress) {
              return
            }
            iframeContent.querySelector('.vcv-loading-overlay') && iframeContent.querySelector('.vcv-loading-overlay').remove()
          }
        }
      })
    }
  }
})