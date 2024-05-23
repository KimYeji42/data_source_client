import React, {useEffect, useRef, useState} from 'react';
import {Network} from 'vis-network';
import 'vis-network/styles/vis-network.css';
import styles from "../../styleModule/styles.module.css";
import SelectedNodeTableUi from "./SelectedNodeTableUi";

const NetworkGraph = ({ selectedProjectId }) => {
    const networkRef = useRef(null);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const createNetwork = async(nodes, edges) => {
        console.log("createNetwork")
        const container = await networkRef.current;
        console.log(container)

        const data = {
            nodes,
            edges
        };

        const options = {
            nodes: {
                shape: 'box',
                widthConstraint: { minimum: 100 },
                heightConstraint: { minimum: 50 }
            },
            edges: {
                arrows: 'to'
            }
        };

        const network = new Network(container, data, options);

        network.on('select', function(event) {
            const { nodes } = event; // 선택된 노드의 ID를 포함한 이벤트 객체
            if (nodes.length > 0) {
                const selectedNodeId = nodes[0]; // 첫 번째로 선택된 노드의 ID
                setSelectedNodeId(selectedNodeId);
                console.log('선택한 노드 ID : ', selectedNodeId);
            }
        });
    };

    const diagramData = async (projectId) => {
        try {
            if (projectId == null) return;
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/diagram/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            // console.log(responseData)

            const nodes = responseData.map(diagram => ({
                id: diagram.id,
                label: diagram.label
            }));

            const edges = responseData.flatMap(diagram =>
                Array.isArray(diagram.edges) ? // diagram.edges가 배열인지 확인
                    diagram.edges.map(edge => ({
                        from: edge.from,
                        to: edge.to
                    })) : [] // 배열이 아니면 빈 배열 반환
            );
            createNetwork(nodes, edges);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setSelectedNodeId(null);
        console.log("받아낸 프로젝트 ID:", selectedProjectId);
        diagramData(selectedProjectId);
    }, [selectedProjectId]);

    return (
        <div className={styles.networkGraphContainer}>
            <div ref={networkRef} className={styles.networkGraph} />
            <SelectedNodeTableUi selectedTableId={selectedNodeId} />
        </div>
    );
};

export default NetworkGraph;
