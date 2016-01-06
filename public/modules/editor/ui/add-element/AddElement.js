var React = require('react');
var Modal = require('react-modal');
var Mediator = require('../../../../helpers/Mediator'); // need to remove too
var ElementComponents = require('../../../../helpers/ElementComponents'); // need to remove too
var ElementControl = require('./ElementControl');
require('./AddElement.less');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '0',
        background: 'transparent'
    }
};

module.exports = React.createClass(Mediator.installTo({
    componentWillMount: function () {
        this.subscribe('app:add', function () {
            this.setState({modalIsOpen: true});
        }.bind(this));
    },
    getInitialState: function () {
        return {modalIsOpen: false};
    },
    openModal: function (e) {
        e && e.preventDefault();
        this.setState({modalIsOpen: true});
    },
    closeModal: function (e) {
        e && e.preventDefault();
        this.setState({modalIsOpen: false});
    },
    render: function () {
		var components = this.state.modalIsOpen ? ElementComponents.getElementsList() : {};
		var	dependencies = "*";

		// get dependencies
		if (this.state.modalIsOpen) {
			let activeNode =  Mediator.getService('data').activeNode;
			let nodeData = ElementComponents.get(activeNode);

			if (Object.getOwnPropertyNames(nodeData).length && nodeData.children) {
				dependencies = nodeData.children.toString();
			}
		}

        return (<Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.closeModal}><span
                            aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">Add element</h4>
                    </div>
                    <div className="modal-body">
                        <ul className="vc_v-modal-content">
                            { Object.keys(components).map(function (key) {
                                var component = components[key];
								console.log(":"+component.tag.toString());
								// check relations
								if ( "*" === dependencies ) {
									if ( component.strongRelation && component.strongRelation.toString() ) {
										return false;
									}
								} else if ( dependencies.length ) {
									let allowed = false;
									// check by tag name
									if ( dependencies.indexOf(component.tag.toString()) > -1 ) {
										allowed = true;
									}
									// check by relatedTo
									if ( component.relatedTo ) {
										console.log(component.relatedTo.toString());
										console.log(component.tag.toString());
										component.relatedTo.toString().map( function ( relation ) {
											console.log(relation);
											console.log(dependencies.indexOf(relation));
											if ( dependencies.indexOf(relation) > -1 ) {
												allowed = true;
											}
										})
									}
									if ( !allowed ) {
										return false;
									}
								}

                                return (function(){
                                            if(undefined === component.manageable || true == component.manageable) {
                                                return <ElementControl
                                                    key={'vc-element-control-' + component.tag.toString()}
                                                    tag={component.tag.toString()}
                                                    name={component.name.toString()}
                                                    icon={component.icon ? component.icon.toString() : ''}/>;
                                            }
                                        })()
                                }
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </Modal>);
    }
}));