import { ScaleBand, ScaleLinear } from 'd3-scale';
import { BarChartData } from 'typings';
import * as d3 from 'd3';

type RectProps = {
    data: BarChartData;
    x: ScaleBand<string>;
    y: ScaleLinear<number, number, never>;
    top: number;
    bottom: number;
    height: number;
};

const colors = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format('.2f');

export const Rect = ({ data, x, y, height, top, bottom }: RectProps) => {
    const value = data.value;
    return (
        <g transform={`translate(${x(data.dayOfWeek)}, ${y(value)})`}>
            <rect width={x.bandwidth()} height={height - bottom - top - y(value)} fill={colors(data.date)} />
            <text
                transform={`translate(${x.bandwidth() / 2}, ${-2})`}
                textAnchor="middle"
                alignmentBaseline="baseline"
                fill="grey"
                fontSize="10"
            >
                {format(value)}
            </text>
        </g>
    );
};
