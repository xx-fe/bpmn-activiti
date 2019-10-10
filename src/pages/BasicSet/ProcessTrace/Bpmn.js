import React, { Component, Fragment } from 'react';
import BpmnViewer from 'bpmn-js';
import { diagramXML } from './xml';
import './Bpmn.css';

class Bpmn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 0, y: 0,
        }
    }




    componentDidMount() {
        let that = this;
        const { callback } = this.props;
        let viewer = new BpmnViewer({
            container: '#canvas',
            height: 400,
        });

        viewer.importXML(diagramXML, function (err) {
            if (err) {
                console.error('failed to load diagram');
                console.error(err);
                return console.log('failed to load diagram', err);
            }
            // diagram is loaded, add interaction to it
            // Option 1:
            // directly hook into internal diagram events
            // this allows you to access the clicked element directly
            let eventBus = viewer.get('eventBus');
            // you may hook into any of the following events
            let events = [
                'element.hover',
                // 'element.out',
                // 'element.click',
                // 'element.dblclick',
                // 'element.mousedown',
                // 'element.mouseup'
            ];
            events.forEach(function (event) {
                eventBus.on(event, function (e) {
                    // e.element = the model element
                    // e.gfx = the graphical element
                    console.log(event, 'on', e.element.id, e.originalEvent);
                    const { clientX, clientY } = e.originalEvent
                    const arr = t.filter(li => li.id == e.element.id)
                    if (arr.length >= 1) {
                        that.setState({
                            x: clientX,
                            y: clientY,
                            selectId: e.element.id,
                        })
                    }
                    callback(e.element.id); // 流程图点击回调
                });
            });
            // Option 2:
            // directly attach an event listener to an elements graphical representation
            // each model element a data-element-id attribute attached to it in HTML
            // select the end event
            // let endEventNode = document.querySelector('#js-canvas [data-element-id=END_EVENT]');
            // endEventNode.addEventListener('click', function(e) {
            //     alert('clicked the end event!');
            // });
            // 删除 bpmn logo
            const bjsIoLogo = document.querySelector('.bjs-powered-by');
            while (bjsIoLogo.firstChild) {
                bjsIoLogo.removeChild(bjsIoLogo.firstChild);
            }
        });
    }

     getMousePos=(event)=> {
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

        console.log(e,scrollX,scrollY)
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;
        return { "x": x, "y": y };
    }

    render() {
        const { x, y, selectId } = this.state
        const { data } = this.props;
        const detailArr = t.filter(v => v.id === data.id)

        return (
            <div>
                <div id="canvas">
                    <div style={{
                        position: "fixed",
                        left: x,
                        top: y - 200,
                        width: 400,
                        height: 200,
                        border: "4px red solid",
                        zIndex: 99,
                        display: detailArr.length >= 1 ? "block" : "none"
                    }}>
                        {detailArr.map((v, index) => {
                            return (
                                <ul key={index} >
                                    <li>
                                        {v.time}&nbsp;&nbsp;&nbsp;&nbsp;{v.user}&nbsp;&nbsp;&nbsp;&nbsp;
                                    {v.mark}
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                </div>
                {/* {data.id} */}
                <div>
                    {t.map((v, index) => {
                        return (
                            <ul style={{
                                width: 600,
                                border: `2px red ${detailArr.length >= 1 && (v.id == selectId) ? "solid" : ""}`,
                                transition: "0.5s all ease"
                            }} key={index} >
                                <li >
                                    {v.time}&nbsp;&nbsp;&nbsp;&nbsp;{v.user}&nbsp;&nbsp;&nbsp;&nbsp;
                                    {v.mark}
                                </li>
                            </ul>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Bpmn;


const t = [
    { id: 'Process_2', time: '2019-09-21 10:00:00', user: '张三', mark: '通过' },
    {
        id: 'SequenceFlow_0l6oqvc',
        time: '2019-09-21 10:10:00',
        user: '李四',
        mark: '不通过，请修改资料',
    },
    {
        id: 'Process_2',
        time: '2019-09-21 10:20:00',
        user: '张三',
        mark: '通过，资料已修补，请审核',
    },
    { id: 'SequenceFlow_0l6oqvc', time: '2019-09-21 10:10:00', user: '李四', mark: '通过' },
    { id: 'SequenceFlow_1js3qmv', time: '2019-09-21 10:30:00', user: '王五', mark: '通过' },
];
