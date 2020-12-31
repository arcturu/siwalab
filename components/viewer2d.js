import { Button } from '@material-ui/core';
import Link from 'next/link';
import styles from './viewer2d.module.css';
import { useState } from 'react';

export default function Viewer2d(props) {
    const [azimuthId, setAzimuthId] = useState(0);
    const [mouseDownPos, setMouseDownPos] = useState([0, 0]);
    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownAzimuthId, setMouseDownAzimuthId] = useState(0);

    const size = props.size;
    const modelId = props.modelId;

    const roundAzimuthId = (x) => (x + (x < 0 ? Math.ceil(-x / 24) * 24 : 0)) % 24;

    return (
        <div className={styles.container}
            onPointerDown={(e) => {
                setMouseDownPos([e.clientX, e.clientY]);
                setIsDragging(true);
                setMouseDownAzimuthId(azimuthId);
            }}
            onPointerUp={(e) => {
                setIsDragging(false);
            }}
            onTouchMove={(e) => {
                e.stopPropagation();
            }}
            onPointerLeave={(e) => {
                setIsDragging(false);
            }}
            onPointerMove={(e) => {
                if (!isDragging) {
                    return;
                }
                let deltaX = e.clientX - mouseDownPos[0];
                let deltaY = e.clientY - mouseDownPos[1];
                let deltaAzimuthId = Math.floor(deltaX / 10);
                setAzimuthId(roundAzimuthId(mouseDownAzimuthId + deltaAzimuthId));
            }}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundImage: `url(../model-images/${modelId}.png)`,
                backgroundSize: `${100 * 24}%`,
                backgroundRepeat: "no-repeat",
                backgroundPositionX: `${-size * (azimuthId)}px`
            }}>
            <button className={`${styles.rotate}`}
                onClick={() => setAzimuthId(roundAzimuthId(azimuthId + 1))}
                style={{
                    position: 'absolute',
                    top: `${size / 2 - 20}px`
                }}>
                <div className={`${styles.arrow} ${styles.left}`}></div>
            </button>
            <button className={`${styles.rotate}`}
                onClick={() => setAzimuthId(roundAzimuthId(azimuthId - 1))}
                style={{
                    position: 'absolute',
                    top: `${size / 2 - 20}px`,
                    right: `0px`
                }}>
                <div className={`${styles.arrow} ${styles.right}`}></div>
            </button>
        </div>
    )
}