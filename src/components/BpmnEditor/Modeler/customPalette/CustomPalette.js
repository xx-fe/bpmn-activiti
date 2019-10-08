import {assign} from 'min-dash';

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default class CustomPalette {
    constructor(
        palette,
        create,
        elementFactory,
        spaceTool,
        lassoTool,
        handTool,
        globalConnect,
        translate
    ) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.spaceTool = spaceTool;
        this.lassoTool = lassoTool;
        this.handTool = handTool;
        this.globalConnect = globalConnect;
        this.translate = translate;
        palette.registerProvider(this);
    }

    getPaletteEntries = () => {
        const actions = [];
        const {
            create,
            elementFactory,
            translate,
            spaceTool,
            lassoTool,
            handTool,
            globalConnect,
        } = this;
        function createAction(type, group, className, title, options, customType) {
            function createListener(event) {
                const shape = elementFactory.createShape(assign({type}, options, {customType}));

                if (options) {
                    shape.businessObject.di.isExpanded = options.isExpanded;
                }

                create.start(event, shape);
            }

            const shortType = type.replace(/^bpmn:/, '');
            const action = {
                group,
                className,
                title: (title && translate(title)) || translate(`Create ${shortType}`),
                action: {
                    dragstart: createListener,
                    click: createListener,
                },
            };
            return action;
        }

        function createParticipant(event, collapsed) {
            create.start(event, elementFactory.createParticipantShape(collapsed));
        }

        assign(actions, [
            {
                title: translate('Tools'),
                group: 'tools',
                children: [
                    {
                        id: 'hand-tool',
                        group: 'tools',
                        className: 'bpmn-icon-hand-tool',
                        title: translate('Activate the hand tool'),
                        action: {
                            click: event => {
                                handTool.activateHand(event);
                            },
                        },
                    },
                    {
                        id: 'lasso-tool',
                        group: 'tools',
                        className: 'bpmn-icon-lasso-tool',
                        title: translate('Activate the lasso tool'),
                        action: {
                            click: event => {
                                lassoTool.activateSelection(event);
                            },
                        },
                    },
                    {
                        id: 'space-tool',
                        group: 'tools',
                        className: 'bpmn-icon-space-tool',
                        title: translate('Activate the create/remove space tool'),
                        action: {
                            click: event => {
                                spaceTool.activateSelection(event);
                            },
                        },
                    },
                    {
                        id: 'global-connect-tool',
                        group: 'tools',
                        className: 'bpmn-icon-connection-multi',
                        title: translate('Activate the global connect tool'),
                        action: {
                            click: event => {
                                globalConnect.toggle(event);
                            },
                        },
                    },
                ],
            },
            {
                title: translate('FlowGateway'),
                group: 'flowGateway',
                children: [
                    {
                        id: 'create.exclusive-gateway',
                        ...createAction(
                            'bpmn:ExclusiveGateway',
                            'gateway',
                            'bpmn-icon-gateway-xor'
                        ),
                    },
                    {
                        id: 'create.parallel-gateway',
                        ...createAction(
                            'bpmn:ParallelGateway',
                            'gateway',
                            'bpmn-icon-gateway-parallel'
                        ),
                    },
                ],
            },
            {
                title: translate('ProcessControl'),
                group: 'processControl',
                children: [
                    {
                        id: 'create.start-event',
                        ...createAction('bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none'),
                    },
                    {
                        id: 'create.intermediate-event',
                        ...createAction(
                            'bpmn:IntermediateThrowEvent',
                            'event',
                            'bpmn-icon-intermediate-event-none',
                            'Create Intermediate/Boundary Event'
                        ),
                    },
                    {
                        id: 'create.end-event',
                        ...createAction('bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none'),
                    },
                    {
                        id: 'create.task',
                        ...createAction('bpmn:Task', 'activity', 'bpmn-icon-task'),
                    },

                    {
                        id: 'create.user-task',
                        ...createAction('bpmn:UserTask', 'activity', 'bpmn-icon-user-task'),
                    },
                ],
            },
            {
                group: 'model',
                title: '其他',
                children: [
                    // {
                    //     id:'tool-separator',
                    //     group: 'tools',
                    //     separator: true,
                    //     title:''
                    // },
                    // {
                    //     id:'custom-separator',
                    //     group: 'custom',
                    //     separator: true,
                    //     title:''
                    // },
                    {
                        id: 'create.participant-expanded',
                        group: 'collaboration',
                        className: 'bpmn-icon-participant',
                        title: translate('Create Pool/Participant'),
                        action: {
                            dragstart: createParticipant,
                            click: createParticipant,
                        },
                    },
                    {
                        id: 'create.subprocess-expanded',
                        ...createAction(
                            'bpmn:SubProcess',
                            'activity',
                            'bpmn-icon-subprocess-expanded',
                            'Create expanded SubProcess',
                            {isExpanded: true}
                        ),
                    },
                    {
                        id: 'create.group',
                        ...createAction(
                            'bpmn:Group',
                            'artifact',
                            'bpmn-icon-group',
                            'Create Group'
                        ),
                    },

                    {
                        id: 'create.data-object',
                        ...createAction(
                            'bpmn:DataObjectReference',
                            'data-object',
                            'bpmn-icon-data-object',
                            'Create DataObjectReference'
                        ),
                    },
                    {
                        id: 'create.data-store',
                        ...createAction(
                            'bpmn:DataStoreReference',
                            'data-store',
                            'bpmn-icon-data-store',
                            'Create DataStoreReference'
                        ),
                    },
                ],
            },
        ]);
        return actions;
    };
}

CustomPalette.$inject = [
    'palette',
    'create',
    'elementFactory',
    'spaceTool',
    'lassoTool',
    'handTool',
    'globalConnect',
    'translate',
];
