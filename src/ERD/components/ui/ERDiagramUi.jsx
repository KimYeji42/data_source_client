import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styleModule/styles.module.css";
import * as go from 'gojs';

const ERDiagramUi = ({ jsonData }) => {
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
                                        width: 120,
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
                                    new go.Binding('text', 'nullLabel', (nullable) => (nullable ? 'NULL' : 'NOT NULL'))
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

            diagram.model = new go.GraphLinksModel(jsonData.node, jsonData.linkData);

            return diagram;
        };

        let diagramInstance = initDiagram();

        return () => {
            if (diagramInstance) { // 기존 다이어그램 지우기
                diagramInstance.div = null;
            }
        };
    }, [jsonData]);

    return <div ref={diagramRef} className={styles.ERDiagram} />;
};

export default ERDiagramUi;
