import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';

const ERDiagram = () => {
    const diagramRef = useRef(null);

    useEffect(() => {
        const $ = go.GraphObject.make;

        const initDiagram = () => {
            const diagram = $(go.Diagram, diagramRef.current, {
                initialAutoScale: go.Diagram.Uniform,
                layout: $(go.LayeredDigraphLayout),
            });

            diagram.nodeTemplate = $(
                go.Node,
                'Auto',
                $(
                    go.Shape,
                    'RoundedRectangle',
                    { strokeWidth: 0 },
                    new go.Binding('fill', 'color')
                ),
                $(
                    go.Panel,
                    'Table',
                    { defaultRowSeparatorStroke: 'black' },
                    $(
                        go.TextBlock,
                        { row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center, font: 'bold 12pt sans-serif' },
                        new go.Binding('text', 'name')
                    ),
                    $(
                        go.Panel,
                        'Vertical',
                        { row: 1, column: 0, margin: 3, alignment: go.Spot.Left },
                        new go.Binding('itemArray', 'columns'),
                        {
                            itemTemplate: $(
                                go.Panel,
                                'Horizontal',
                                $(
                                    go.TextBlock,
                                    {
                                        margin: 2,
                                        font: 'bold 10pt sans-serif',
                                        stroke: 'red',
                                        visible: false,
                                        alignment: go.Spot.Left
                                    },
                                    new go.Binding('visible', 'primary'),
                                    new go.Binding('text', 'primary', (primary) => (primary ? 'PK' : ''))
                                ),
                                $(
                                    go.TextBlock,
                                    {
                                        margin: 2,
                                        font: 'bold 10pt sans-serif',
                                        stroke: 'blue',
                                        visible: false,
                                        alignment: go.Spot.Left
                                    },
                                    new go.Binding('visible', 'foreign'),
                                    new go.Binding('text', 'foreign', (foreign) => (foreign ? 'FK' : ''))
                                ),
                                $(
                                    go.TextBlock,
                                    {
                                        margin: 2,
                                        font: '10pt sans-serif',
                                        stroke: 'black',
                                        alignment: go.Spot.Left
                                    },
                                    new go.Binding('text', 'name')
                                ),
                                $(
                                    go.TextBlock,
                                    {
                                        margin: 2,
                                        font: '10pt sans-serif',
                                        stroke: 'black',
                                        alignment: go.Spot.Left
                                    },
                                    new go.Binding('text', 'type')
                                )
                            )
                        }
                    )
                )
            );

            diagram.linkTemplate = $(
                go.Link,
                { routing: go.Link.Orthogonal, corner: 5 },
                $(go.Shape),
                $(go.Shape, { toArrow: 'Standard' })
            );

            const nodeDataArray = [
                {
                    key: 1,
                    name: '테이블1',
                    columns: [
                        { name: 'id', type: 'int', primary: true },
                        { name: 'name', type: 'varchar', primary: false }
                    ],
                    color: 'lightblue'
                },
                {
                    key: 2,
                    name: '테이블2',
                    columns: [
                        { name: 'id', type: 'int', primary: true },
                        { name: 'description', type: 'text', primary: false },
                        { name: 'table1_id', type: 'int', foreign: true }
                    ],
                    color: 'lightgreen'
                },
                {
                    key: 3,
                    name: '테이블3',
                    columns: [
                        { name: 'id', type: 'int', primary: true },
                        { name: 'description', type: 'text', primary: false },
                        { name: 'table1_id', type: 'int', foreign: true }
                    ],
                    color: 'lightcoral'
                }
            ];

            const linkDataArray = [
                { from: 1, to: 2 }
            ];

            diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

            return diagram;
        };

        let diagramInstance = initDiagram();

        return () => {
            if (diagramInstance) {
                diagramInstance.div = null; // Clean up diagram instance
            }
        };
    }, []);

    return <div ref={diagramRef} style={{ width: '100%', height: '80vh', border: '1px solid black' }} />;
};

export default ERDiagram;