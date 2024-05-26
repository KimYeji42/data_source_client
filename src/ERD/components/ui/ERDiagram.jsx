import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styleModule/styles.module.css";
import * as go from 'gojs';

const ERDiagram = ({jsonData}) => {
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
                    {
                        strokeWidth: 1,
                        fill: 'white',
                        stroke: '#bdbdbd'
                    }
                ),
                $(
                    go.Panel,
                    'Table',
                    {
                        defaultRowSeparatorStroke: '#00A3FF',
                        padding: 10
                    },
                    $(
                        go.TextBlock,
                        {
                            row: 0,
                            columnSpan: 4,
                            margin: 10,
                            alignment: go.Spot.Left,
                            font: '11pt KoPubWorld Dotum Bold',
                            stroke: '#595959',
                        },
                        new go.Binding('text', 'name')
                    ),
                    $(
                        go.Panel,
                        'Vertical',
                        {
                            row: 1,
                            columnSpan: 4,
                            margin: new go.Margin(10, 15, 10, 15),
                            alignment: go.Spot.Center
                        },
                        new go.Binding('itemArray', 'columns'),
                        {
                            itemTemplate: $(
                                go.Panel,
                                'Horizontal',
                                {
                                    defaultColumnSeparatorStroke: 'gray',
                                },
                                $(
                                    go.TextBlock,
                                    {
                                        margin: new go.Margin(5, 10, 5, 10),
                                        font: '10pt KoPubWorld Dotum Bold',
                                        stroke: '#595959',
                                        width: 35,
                                        alignment: go.Spot.Center
                                    },
                                    new go.Binding('text', 'keyName'),
                                ),
                                $(
                                    go.TextBlock,
                                    {
                                        margin: new go.Margin(5, 10, 5, 10),
                                        font: '10pt KoPubWorld Dotum Bold',
                                        stroke: '#595959',
                                        width: 100,
                                        alignment: go.Spot.Left
                                    },
                                    new go.Binding('text', 'name')
                                ),
                                $(
                                    go.TextBlock,
                                    {
                                        margin: new go.Margin(5, 10, 5, 10),
                                        font: '10pt KoPubWorld Dotum Bold',
                                        stroke: '#595959',
                                        width: 80,
                                        alignment: go.Spot.Left
                                    },
                                    new go.Binding('text', 'type')
                                ),
                                $(
                                    go.TextBlock,
                                    {
                                        margin: new go.Margin(5, 10, 5, 10),
                                        font: '9pt KoPubWorld Dotum Bold',
                                        stroke: 'gray',
                                        width: 70,
                                        alignment: go.Spot.Left
                                    },
                                    new go.Binding('text', 'nullable', (nullable) => (nullable ? 'NULL' : 'NOT NULL'))
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
            );

            const nodeDataArray = [
                {
                    key: 1,
                    name: '테이블1',
                    columns: [
                        { name: 'id', type: 'int', keyName: 'PK', nullable: false },
                        { name: 'name', type: 'varchar', keyName: '', nullable: true }
                    ],
                },
                {
                    key: 2,
                    name: '테이블2',
                    columns: [
                        { name: 'id', type: 'int', keyName: 'PK', nullable: false },
                        { name: 'description', type: 'text', keyName: '', nullable: true },
                        { name: 'table1_id', type: 'int', keyName: 'FK', nullable: false }
                    ],
                },
                {
                    key: 3,
                    name: '테이블3',
                    columns: [
                        { name: 'id', type: 'int', keyName: 'PK', nullable: false },
                        { name: 'description', type: 'text', keyName: '', nullable: true },
                        { name: 'table1_id', type: 'int', keyName: 'FK', nullable: false }
                    ],
                }
            ];

            const linkDataArray = [
                { from: 1, to: 2 },
                // { from: 2, to: 3 },
            ];

            diagram.model = new go.GraphLinksModel(jsonData.node, jsonData.linkData);

            return diagram;
        };

        let diagramInstance = initDiagram();

        return () => {
            if (diagramInstance) {
                diagramInstance.div = null; // Clean up diagram instance
            }
        };
    }, []);

    return <div ref={diagramRef} className={styles.ERDiagram} />;
};

export default ERDiagram;
