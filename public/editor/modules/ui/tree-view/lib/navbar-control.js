/*eslint jsx-quotes: [2, "prefer-double"]*/
var vcCake = require('vc-cake')
vcCake.add('ui-tree-view', function (api) {
  var React = require('react')
  var classNames = require('classnames')
  var Control = React.createClass({
    getInitialState: function () {
      return {
        controlActive: false,
        data: []
      }
    },
    componentDidMount: function () {
      api
        .reply('bar-content-start:show', () => {
          this.setState({ controlActive: true })
        })
        .reply('bar-content-start:hide', () => {
          this.setState({ controlActive: false })
        })
    },
    toggleTreeView: function (e) {
      api.request('bar-content-start:toggle')
    },
    render: function () {
      let controlClass = classNames({
        'vcv-ui-navbar-control': true,
        'vcv-ui-pull-end': true
      })
      return <a className={controlClass} href="#" title="Tree View" onClick={this.toggleTreeView}>
        <span className="vcv-ui-navbar-control-content">
          <i className="vcv-ui-navbar-control-icon vcv-ui-icon vcv-ui-icon-layers"></i>
          <span>Tree View</span>
        </span>
      </a>
    }
  })
  api.module('ui-navbar').do('addElement', 'Tree layout', Control, {pin: 'visible'})
})

