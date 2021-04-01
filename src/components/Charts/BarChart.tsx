import * as d3 from 'd3';
import React from 'react';
import { BarChartData } from 'typings';
import { XAxis, YAxis } from './Axis';
import { Rect } from './Rect';

export type BarProps = {
    data: BarChartData[];
    width: number;
    height: number;
};

export const Bar = (props: BarProps) => {
    const axisPadding = 30;
    const rightPadding = 0;
    const topPadding = 20;
    const data = props.data;

    const x = d3
        .scaleBand()
        .range([0, props.width - axisPadding - rightPadding])
        .domain(data.map((d) => d.dayOfWeek))
        .paddingInner(0.1);

    const y = d3
        .scaleLinear()
        .range([props.height - topPadding - axisPadding, 0])
        .domain([0, d3.max(data, (d) => d.value)!]);

    return (
        <>
            <svg width={props.width} height={props.height}>
                <XAxis
                    scale={x}
                    top={topPadding}
                    bottom={axisPadding}
                    left={axisPadding}
                    right={rightPadding}
                    height={props.height}
                />
                <YAxis scale={y} top={topPadding} bottom={axisPadding} left={axisPadding} right={rightPadding} />
                <g transform={`translate(${axisPadding}, ${topPadding})`}>
                    {data.map((d, i) => (
                        <Rect
                            data={d}
                            x={x}
                            y={y}
                            key={d.date}
                            top={topPadding}
                            bottom={axisPadding}
                            height={props.height}
                        />
                    ))}
                </g>
            </svg>
        </>
    );
};
