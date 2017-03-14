import React from 'react'
import ReactDOM from 'react-dom'
import vcCake from 'vc-cake'
import lodash from 'lodash'

class ColumnResizer extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = {
      dragging: false,
      leftColPercentage: null,
      rightColPercentage: null,
      labelPosition: null
    }
  }

  static data = {
    rowId: null,
    rowData: null,
    helper: null,
    rightColumn: null,
    leftColumn: null,
    bothColumnsWidth: null,
    columnGap: null
  }

  componentDidUpdate (props, state) {
    let ifameDocument = document.querySelector('#vcv-editor-iframe').contentWindow
    if (this.state.dragging && !state.dragging) {
      ifameDocument.addEventListener('mousemove', this.handleMouseMove)
      ifameDocument.addEventListener('mouseup', this.handleMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      ifameDocument.removeEventListener('mousemove', this.handleMouseMove)
      ifameDocument.removeEventListener('mouseup', this.handleMouseUp)
    }
  }

  getRowData () {
    let $helper = ReactDOM.findDOMNode(this)
    let $rightCol = $helper.nextElementSibling
    let $leftCol = $helper.previousElementSibling
    let rightColId = $rightCol ? $rightCol.id.replace('el-', '') : null
    let leftColId = $leftCol ? $leftCol.id.replace('el-', '') : null
    let rowId = vcCake.getService('document').get(rightColId || leftColId).parent
    let rowData = vcCake.getService('document').get(rowId)
    let columnGap = rowData.columnGap ? parseInt(rowData.columnGap) : 0
    let rowWidth = $helper.parentElement.getBoundingClientRect().width + columnGap
    let bothColumnsWidth = ($leftCol.getBoundingClientRect().width + $rightCol.getBoundingClientRect().width + columnGap * 2) / rowWidth

    ColumnResizer.data.rowId = rowId
    ColumnResizer.data.rowData = rowData
    ColumnResizer.data.helper = $helper
    ColumnResizer.data.rightColumn = $rightCol
    ColumnResizer.data.leftColumn = $leftCol
    ColumnResizer.data.bothColumnsWidth = bothColumnsWidth
    ColumnResizer.data.columnGap = columnGap
  }

  handleMouseDown (e) {
    if (e.nativeEvent.which === 1) {
      this.getRowData()
      let colSizes = this.getResizedColumnsWidth(e)
      let labelPosition = e.clientY - ColumnResizer.data.helper.getBoundingClientRect().top

      this.setState({
        dragging: true,
        leftColPercentage: Math.round(colSizes.leftCol * 100),
        rightColPercentage: Math.round(colSizes.rightCol * 100),
        labelPosition: labelPosition
      })
    }
  }

  handleMouseUp (e) {
    this.setState({ dragging: false })

    // let leftColSize = Math.round(this.state.leftColPercentage).toString()
    // let rightColSize = Math.round(this.state.rightColPercentage).toString()
    //
    // this.updateColumnMixin(ColumnResizer.data.rowId, [ leftColSize, rightColSize ])
    // this.resizeColumns(ColumnResizer.data.leftColumn.id.replace('el-', ''), ColumnResizer.data.rightColumn.id.replace('el-', ''), leftColSize, rightColSize, ColumnResizer.data.rowId)
  }

  handleMouseMove (e) {
    if (!this.state.dragging) {
      return
    }
    this.renderTemporaryColStyles(e)
  }

  renderTemporaryColStyles (e) {
    let columnGap = ColumnResizer.data.columnGap
    let colSizes = this.getResizedColumnsWidth(e)
    let resizerPercentages = colSizes.leftCol
    let rightResizerPercentages = colSizes.rightCol

    let equalSpace = columnGap * (resizerPercentages * 100 - 1)
    let rightEqualSpace = columnGap * (rightResizerPercentages * 100 - 1)
    let gapSpace = columnGap * (100 - 1)

    let leftWidth = `calc((100% - ${gapSpace}px) * ${resizerPercentages} + ${equalSpace}px)`
    let rightWidth = `calc((100% - ${gapSpace}px) * ${rightResizerPercentages} + ${rightEqualSpace}px)`

    ColumnResizer.data.leftColumn.style.flexBasis = leftWidth
    ColumnResizer.data.leftColumn.style.maxWidth = leftWidth

    ColumnResizer.data.rightColumn.style.flexBasis = rightWidth
    ColumnResizer.data.rightColumn.style.maxWidth = rightWidth

    this.setState({
      leftColPercentage: Math.round(resizerPercentages * 100),
      rightColPercentage: Math.round(rightResizerPercentages * 100)
    })
  }

  getResizedColumnsWidth (e) {
    let $row = ColumnResizer.data.helper.parentElement
    let rowWidth = $row.getBoundingClientRect().width + ColumnResizer.data.columnGap
    let resizerWidth = e.clientX - ColumnResizer.data.leftColumn.getBoundingClientRect().left + ColumnResizer.data.columnGap / 2
    let leftCol = resizerWidth / rowWidth
    return { leftCol: leftCol, rightCol: ColumnResizer.data.bothColumnsWidth - leftCol }
  }

  updateColumnMixin (rowId, sizes) {
    let rowData = vcCake.getService('document').get(rowId)

    let newMixins = {}
    for (let i = 0; i < sizes.length; i++) {
      let percentage = parseFloat(sizes[ i ]) / 100
      let mixinName = `customColumnMixinResize${i}`
      // todo change 'columnStyleMixin:col0:md'
      newMixins[ mixinName ] = lodash.defaultsDeep({}, rowData.layout.attributeMixins[ 'columnStyleMixin:col33.33/100:md' ])
      newMixins[ mixinName ].variables.percentageSelector.value = sizes[ i ]
      newMixins[ mixinName ].variables.percentage.value = percentage.toString()
      rowData.layout.attributeMixins[ mixinName ] = newMixins[ mixinName ]
    }
    // vcCake.setData(`element:instantMutation:${rowId}`, elementData)
    this.props.api.request('data:instantMutation', rowData, 'update')
  }

  resizeColumns (leftColId, rightColId, leftColSize, rightColSize) {
    let leftCol = vcCake.getService('document').get(leftColId)
    let rightCol = vcCake.getService('document').get(rightColId)
    leftCol.size = leftColSize + '%'
    rightCol.size = rightColSize + '%'
    this.props.api.request('data:update', leftCol.id, leftCol)
    this.props.api.request('data:update', rightCol.id, rightCol)
  }

  render () {
    let resizerLabels = ''
    if (this.state.dragging) {
      let labelProps = {
        style: {
          top: `${this.state.labelPosition}px`
        }
      }
      resizerLabels = (
        <div className='vce-column-resizer-label-container' {...labelProps}>
          <div className='vce-column-resizer-label vce-column-resizer-label-left'>
            <svg width='41px' height='23px' viewBox='0 0 41 23' version='1.1' xmlns='http://www.w3.org/2000/svg'>
              <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' opacity='0.9'>
                <g id='Left' fill='#282828'>
                  <path
                    d='M9.67660985,2.33058017e-12 L35.1786526,0 C37.9367983,0 40.1727172,2.24721412 40.1727172,4.99065745 L40.1727172,18.0093426 C40.1727172,20.7656066 37.9304373,23 35.1786526,23 L9.67660985,23 C9.12217523,23 8.35313873,22.6804216 7.97065195,22.2979348 L0.582842894,12.9101257 C-0.195948043,12.1313348 -0.192612096,10.8653293 0.582842894,10.0898743 L7.97065195,0.702065207 C8.35839186,0.3143253 9.12167598,2.33058017e-12 9.67660985,2.33058017e-12 Z'
                    id='Combined-Shape'
                    transform='translate(20.086359, 11.500000) scale(-1, 1) translate(-20.086359, -11.500000)' />
                </g>
              </g>
            </svg>
            <span className='vce-column-resizer-label-percentage'>{this.state.leftColPercentage + '%'}</span>
          </div>
          <div className='vce-column-resizer-label vce-column-resizer-label-right'>
            <svg width='41px' height='23px' viewBox='0 0 41 23' version='1.1' xmlns='http://www.w3.org/2000/svg'>
              <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' opacity='0.9'>
                <g id='Right' fill='#282828'>
                  <path
                    d='M9.67660985,2.33058017e-12 L35.1786526,0 C37.9367983,0 40.1727172,2.24721412 40.1727172,4.99065745 L40.1727172,18.0093426 C40.1727172,20.7656066 37.9304373,23 35.1786526,23 L9.67660985,23 C9.12217523,23 8.35313873,22.6804216 7.97065195,22.2979348 L0.582842894,12.9101257 C-0.195948043,12.1313348 -0.192612096,10.8653293 0.582842894,10.0898743 L7.97065195,0.702065207 C8.35839186,0.3143253 9.12167598,2.33058017e-12 9.67660985,2.33058017e-12 Z'
                    id='Combined-Shape' />
                </g>
              </g>
            </svg>
            <span className='vce-column-resizer-label-percentage'>{this.state.rightColPercentage + '%'}</span>
          </div>
        </div>
      )
    }

    return (
      <vcvhelper className='vce-column-resizer'>
        <div className='vce-column-resizer-handler' onMouseDown={this.handleMouseDown}>
          {resizerLabels}
        </div>
      </vcvhelper>
    )
  }
}

export default ColumnResizer
