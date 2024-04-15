import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  CartesianAxis,
  AreaChart,
  Area,
} from 'recharts';
import ChartWrapper from './Charts.styles';

export default class extends Component {
  render() {
    const { datas, width, height, colors } = this.props;
    // <div className="isoChartWrapper">
    return (
      <ChartWrapper>
        <AreaChart
          width={width}
          height={height}
          data={datas}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EA6118" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EA6118" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" type="category" />
          <CartesianGrid strokeDasharray="3 0" vertical={false} />
          <YAxis axisLine={false} allowDecimals={false} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="linear"
            dot={true}
            dataKey="user"
            stroke="#F7810B"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ChartWrapper>
    );
  }
}
