import React from 'react'
import Attribute from '../attribute'
import classNames from 'classnames'
import { getStorage } from 'vc-cake'

const attributesStorage = getStorage('attributes')

class Iconpicker extends Attribute {
  static defaultProps = {
    fieldType: 'iconpicker'
  }

  constructor (props) {
    super(props)
    const setList = attributesStorage.state('iconpicker:iconSet').get()
    let iconSetList = setList[ props.options.iconType ] || setList.icons
    let iconSet = props.value.iconSet
    if (!iconSetList[ iconSet ]) {
      let keys = Object.keys(iconSetList)
      // In case if not set available
      iconSet = keys[ 0 ]
    }
    this.state = {
      search: '',
      category: '',
      popupOpen: false,
      value: {
        icon: props.value.icon,
        iconSet: iconSet
      },
      showSearch: 'search' in props.options ? props.options.search : true,
      iconSetList: iconSetList
    }
  }

  componentWillUnmount () {
    document.body.removeEventListener('click', this.closeIfNotInside)
  }

  filteredIcons () {
    let { category, search, value, iconSetList } = this.state
    let { iconSet } = value
    let icons = []
    let iconsIds = []

    if (!iconSetList[ iconSet ]) {
      let keys = Object.keys(iconSetList)
      // In case if not set available
      iconSet = keys[ 0 ]
    }
    let addIcons = (categoryIcons, isDisabled) => {
      categoryIcons.forEach((icon) => {
        if (iconsIds.indexOf(icon.id) > -1) {
          return
        }
        if (isDisabled) {
          icon.disabled = true
        }
        iconsIds.push(icon.id)
        icons.push(icon)
      })
    }
    if (category) {
      addIcons(iconSetList[ iconSet ][ category ].iconData, iconSetList[ iconSet ][ category ].disabled)
    } else {
      if (Array.isArray(iconSetList[ iconSet ].iconData)) {
        addIcons(iconSetList[ iconSet ].iconData, iconSetList[ iconSet ].disabled)
      } else {
        Object.keys(iconSetList[ iconSet ].iconData).forEach((cat) => {
          addIcons(iconSetList[ iconSet ].iconData[ cat ], iconSetList[ iconSet ].disabled)
        })
      }
    }

    if (search) {
      icons = icons.filter(icon => {
        return icon.title.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
    }
    return icons
  }

  iconsContent () {
    let value = this.state.value.icon
    let iconsContent = []
    this.filteredIcons().forEach((icon) => {
      let iconClasses = classNames({
        'vcv-ui-form-iconpicker-option': true,
        'vcv-ui-form-state--active': icon.id === value,
        'vcv-ui-form-iconpicker--disabled': icon.disabled
      })
      iconsContent.push(
        <span
          key={icon.id}
          className={iconClasses}
          value={icon.id}
          onClick={this.handleChange}
          title={icon.title}
        >
          <i className={icon.id} />
        </span>
      )
    })
    return iconsContent
  }

  categoriesContent () {
    let categories = []
    let { iconSetList } = this.state
    let { iconSet } = this.state.value
    if (!iconSetList[ iconSet ]) {
      let keys = Object.keys(iconSetList)
      // In case if not set available
      iconSet = keys[ 0 ]
    }
    if (iconSet && typeof iconSetList[ iconSet ] !== 'undefined' && typeof iconSetList[ iconSet ].iconData !== 'undefined' && !Array.isArray(iconSetList[ iconSet ].iconData)) {
      Object.keys(iconSetList[ iconSet ].iconData).forEach((category) => {
        categories.push(<option key={'innerCategory' + category} value={category}>{category}</option>)
      })
    }
    return categories
  }

  popupContent () {
    let { search, category, value, showSearch, iconSetList } = this.state
    let { iconSet } = value
    let content
    let categories = this.categoriesContent()
    let iconsContent = this.iconsContent()
    if (!iconsContent.length) {
      iconsContent.push(<div className='vcv-ui-form-iconpicker-error' key='no-icon-found'>No icons found</div>)
    }

    let popupClasses = classNames({
      'vcv-ui-form-iconpicker-content': true,
      'vcv-ui-form-state--active': this.state.popupOpen
    })

    let categoriesContent = ''
    let iconSetLength = Object.keys(iconSetList).length

    if (categories.length && iconSetLength > 1) {
      categoriesContent = (
        <select onChange={this.category} value={category} className='vcv-ui-form-dropdown'>
          <option key='all' value=''>From all categories</option>
          {categories}
        </select>
      )
    }

    let iconsSetContent = ''
    if (iconSetLength > 1) {
      let innerSetContent = []
      Object.keys(iconSetList).forEach((i) => {
        let name = i.charAt(0).toUpperCase() + i.slice(1)
        let optionText = iconSetList[ i ].disabled ? name + ` (Premium)` : name
        innerSetContent.push(<option key={'inner' + i} value={i}>{optionText}</option>)
      })
      iconsSetContent = (
        <select onChange={this.iconSet} value={iconSet} className='vcv-ui-form-dropdown'>
          {innerSetContent}
        </select>
      )
    }

    let renderSearch = null

    if (showSearch) {
      renderSearch = (
        <div className='vcv-ui-input-search'>
          <input type='search' value={search} onChange={this.search} placeholder='Search Icon'
            className='vcv-ui-form-input' />
          <label className='vcv-ui-form-input-search-addon'>
            <i className='vcv-ui-icon vcv-ui-icon-search' />
          </label>
        </div>
      )
    }

    content = (
      <div className={popupClasses}>
        <div className='vcv-ui-form-iconpicker-content-heading'>
          {iconsSetContent}
          {renderSearch}
          {categoriesContent}
        </div>
        <div className='vcv-ui-form-iconpicker-options'>
          {iconsContent}
        </div>
      </div>
    )

    return content
  }

  togglePopup = (e) => {
    e && e.preventDefault && e.preventDefault()

    if (this.state.popupOpen) {
      document.body.removeEventListener('click', this.closeIfNotInside)
    } else {
      document.body.addEventListener('click', this.closeIfNotInside)
    }

    this.setState({
      popupOpen: !this.state.popupOpen,
      search: '',
      category: ''
    })
  }

  search = (e) => {
    this.setState({
      search: e.currentTarget.value,
      category: ''
    })
  }

  category = (e) => {
    this.setState({
      category: e.currentTarget.value,
      search: ''
    })
  }

  iconSet = (e) => {
    const newValue = Object.assign({}, this.state.value)
    newValue.iconSet = e.currentTarget.value
    this.setState({
      value: newValue,
      category: '',
      search: ''
    })
  }

  handleChange (event) {
    const newValue = Object.assign({}, this.state.value)
    newValue.icon = event.currentTarget.attributes.value.textContent
    this.setFieldValue(newValue)
  }

  getClosest (el, selector) {
    let matchesFn;
    // find vendor prefix
    [ 'matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector' ].some(function (fn) {
      if (typeof document.body[ fn ] === 'function') {
        matchesFn = fn

        return true
      }

      return false
    })
    let parent
    // traverse parents
    while (el) {
      parent = el.parentElement
      if (parent && parent[ matchesFn ](selector)) {
        return parent
      }
      el = parent
    }

    return null
  }

  closeIfNotInside = (e) => {
    e && e.preventDefault()
    let $el = e.target

    let $dropDown = '.vcv-ui-form-iconpicker-content'
    let $openingButton = '.vcv-ui-iconpicker-picker-dropdown'
    let container = null

    if ($el.closest === undefined) {
      container = this.getClosest($el, $dropDown) || this.getClosest($el, $openingButton)
    } else {
      container = $el.closest($dropDown) || $el.closest($openingButton)
    }
    if (container) {
      return
    }

    this.togglePopup()
  }

  render () {
    let { popupOpen } = this.state
    let value = this.state.value.icon

    let selectedIconClasses = classNames({
      'vcv-ui-param-iconpicker-icon-empty': !value
    }, value)

    let selectorClasses = classNames({
      'vcv-ui-form-dropdown': true,
      'vcv-ui-form-dropdown-style--inline': true,
      'vcv-ui-iconpicker-picker-dropdown': true,
      'vcv-ui-form-state--focus': popupOpen
    })

    let popupContent = ''
    if (popupOpen) {
      popupContent = this.popupContent()
    }

    let wrapperClasses = classNames({
      'vcv-ui-form-iconpicker': true
    })
    return (
      <div className={wrapperClasses}>
        <div className='vcv-ui-form-iconpicker'>
          <div className={selectorClasses} onClick={this.togglePopup}>
            <i className={selectedIconClasses} />
          </div>
          {popupContent}
        </div>
      </div>
    )
  }
}

Iconpicker.DEFAULT_ICON_SET = 'fontawesome'

export default Iconpicker
