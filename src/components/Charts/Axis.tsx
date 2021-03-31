import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export const XAxis = ({ top, bottom, left, right, height, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisBottom(scale) as any);
    });

    return <g className="axis x" ref={axis} transform={`translate(${left}, ${height - bottom})`} />;
};

export const YAxis = ({ top, bottom, left, right, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisLeft(scale) as any);
    });

    return <g className="axis y" ref={axis} transform={`translate(${left}, ${top})`} />;
};
