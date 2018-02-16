import React from 'react'
import PropTypes from 'prop-types'
import vcCake from 'vc-cake'
import BlankControl from './blankControl'

const templateManager = vcCake.getService('myTemplates')
const settingsStorage = vcCake.getStorage('settings')
const elementsStorage = vcCake.getStorage('elements')
const workspaceStorage = vcCake.getStorage('workspace')
const workspaceIFrame = workspaceStorage.state('iframe')

let pageTemplates = window.VCV_PAGE_TEMPLATES && window.VCV_PAGE_TEMPLATES()
let pageLayouts = window.VCV_LAYOUTS_DATA && window.VCV_LAYOUTS_DATA() || []
if (pageTemplates) {
  settingsStorage.state('pageTemplate').set(pageTemplates.current)
}

export default class PagePanelContent extends React.Component {
  rowContainer = null
  elementsContainer = null
  initialSetControlsLayoutTimeout = null

  static propTypes = {
    unmountStartBlank: PropTypes.func.isRequired,
    handleCloseClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      templates: templateManager.predefined()
    }
    this.handleControlClick = this.handleControlClick.bind(this)
    this.setControlsLayout = this.setControlsLayout.bind(this)
  }

  componentDidMount () {
    this.setControlData()
    // set timeout to get new state data from setControlData()
    this.initialSetControlsLayoutTimeout = setTimeout(() => {
      this.setControlsLayout()
    }, 1)
    this.addResizeListener(this.rowContainer, this.setControlsLayout)
  }

  componentWillUnmount () {
    this.removeResizeListener(this.rowContainer, this.setControlsLayout)
    if (this.initialSetControlsLayoutTimeout) {
      window.clearTimeout(this.initialSetControlsLayoutTimeout)
      this.initialSetControlsLayoutTimeout = null
    }
  }

  /**
   * Add element resize listener
   * @param element
   * @param fn
   */
  addResizeListener (element, fn) {
    let isIE = !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/))
    if (window.getComputedStyle(element).position === 'static') {
      element.style.position = 'relative'
    }
    let obj = element.__resizeTrigger__ = document.createElement('iframe')
    obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; opacity: 0; pointer-events: none; z-index: -1;')
    obj.__resizeElement__ = element
    obj.onload = function (e) {
      this.contentDocument.defaultView.addEventListener('resize', fn)
    }
    obj.type = 'text/html'
    if (isIE) {
      element.appendChild(obj)
    }
    obj.data = 'about:blank'
    if (!isIE) {
      element.appendChild(obj)
    }
  }

  /**
   * Remove element resize listener
   * @param element
   * @param fn
   */
  removeResizeListener (element, fn) {
    element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', fn)
    element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
  }

  /**
   * Set state for the single control width, sum width of all controls
   */
  setControlData () {
    const controls = Array.prototype.slice.call(this.elementsContainer.children)
    const controlStyle = window.getComputedStyle(controls[ 0 ])
    const controlWidth = parseInt(controlStyle.width)
    const controlMargin = parseInt(controlStyle.marginLeft) + parseInt(controlStyle.marginRight)
    const controlFullWidth = controlWidth + controlMargin
    this.setState({
      controlWidth: controlFullWidth,
      controlsWidth: controlFullWidth * this.state.templates.length + 1
    })
  }

  handleControlClick (props) {
    const { blank, data } = props
    if (!blank) {
      elementsStorage.trigger('merge', data)
    }
    this.props.handleCloseClick(blank)
  }

  getTemplateControlProps (template) {
    const localizations = window.VCV_I18N && window.VCV_I18N()
    const blankText = localizations ? localizations.blankPage : 'Blank Page'

    if (template !== 'blank') {
      return {
        key: 'vcv-element-control-' + template.id,
        addClick: this.handleControlClick,
        ...template
      }
    } else {
      return {
        key: 'vcv-element-control-blank',
        addClick: this.handleControlClick,
        name: blankText,
        blank: true
      }
    }
  }

  getBlankControls () {
    let controls = []
    if (vcCake.env('THEME_LAYOUTS') && typeof window.vcvIsPremium !== 'undefined' && window.vcvIsPremium) {
      controls = this.getLayoutControls()
    } else {
      controls.push(<BlankControl {...this.getTemplateControlProps('blank')} />)
      this.state.templates.forEach((template) => {
        controls.push(<BlankControl {...this.getTemplateControlProps(template)} />)
      })
    }
    return controls
  }

  getLayoutControls () {
    let activeLayout = settingsStorage.state('pageTemplate').get() || 'default'
    let layouts = []
    let defaultClasses = 'vcv-ui-item-list-item vcv-ui-start-layout-list-item'
    if (activeLayout === 'default') {
      defaultClasses += ' vcv-ui-start-layout-list-item-active'
    }
    Object.keys(pageLayouts).forEach((key, index) => {
      let classes = 'vcv-ui-item-list-item vcv-ui-start-layout-list-item'
      if (activeLayout === key) {
        classes += ' vcv-ui-start-layout-list-item-active'
      }

      layouts.push(
        <li className={classes} key={`layout-${index}`}
          onClick={this.handleLayoutClick.bind(this, key)}>
          <span className='vcv-ui-item-element' title={`${pageLayouts[ key ].title}`}>
            <span className='vcv-ui-item-element-content-layout'>
              <span
                className={`vcv-ui-start-layout-list-item-icon vcv-ui-start-layout-list-item-icon-${pageLayouts[ key ].title.toLowerCase().split(' ').join('-')}`}>
                <span className='vcv-ui-start-layout-list-item-icon-helper' />
              </span>
            </span>
            <span className='vcv-ui-item-element-name'>
              {pageLayouts[ key ].title.replace(/vcv /gi, '')}
            </span>
          </span>
        </li>
      )
    })

    layouts.push(
      <li className={defaultClasses} key={`layout-theme-defined`}
        onClick={this.handleLayoutClick.bind(this, 'default')}>
        <span className='vcv-ui-item-element' title='Theme defined'>
          <span className='vcv-ui-item-element-content-layout'>
            <span
              className={`vcv-ui-start-layout-list-item-icon vcv-ui-start-layout-list-item-icon-default`}>
              <span className='vcv-ui-start-layout-list-item-icon-helper' />
            </span>
            <span className='vcv-ui-start-layout-list-item-icon-name'>T</span>
          </span>
          <span className='vcv-ui-item-element-name'>
            Theme Defined
          </span>
        </span>
      </li>
    )
    return layouts
  }

  handleLayoutClick (layoutType) {
    settingsStorage.state('skipBlank').set(true)
    let activeLayout = settingsStorage.state('pageTemplate').get()
    if (layoutType && layoutType !== activeLayout) {
      settingsStorage.state('pageTemplate').set(layoutType)
      workspaceIFrame.set({ type: 'reload', template: layoutType })
    }
    this.props.unmountStartBlank()
  }

  /**
   * Set state for the width of element controls container
   */
  setControlsLayout () {
    const { controlWidth, controlsWidth } = this.state
    const containerWidth = this.rowContainer.getBoundingClientRect().width
    const elementsCount = Math.floor(containerWidth / controlWidth)
    let elementsWidth = elementsCount * controlWidth
    elementsWidth = elementsWidth < controlsWidth ? elementsWidth : null
    if (this.state.containerWidth !== elementsWidth) {
      this.setState({ containerWidth: elementsWidth })
    }
  }

  render () {
    let containerWidth = {}
    if (this.state && this.state.containerWidth) {
      containerWidth.width = `${this.state.containerWidth}px`
    }
    let startBlankControlsClasses = 'vcv-start-blank-controls'
    if (vcCake.env('THEME_LAYOUTS') && typeof window.vcvIsPremium !== 'undefined' && window.vcvIsPremium) {
      startBlankControlsClasses += ' vcv-start-blank-controls-layout'
    }

    return <div className={startBlankControlsClasses}>
      <div
        className='vcv-start-blank-item-list-container'
        ref={(container) => { this.rowContainer = container }}
      >
        <ul
          className='vcv-ui-item-list vcv-start-blank-item-list'
          style={containerWidth}
          ref={(container) => { this.elementsContainer = container }}
        >
          {this.getBlankControls()}
        </ul>
      </div>
    </div>
  }
}