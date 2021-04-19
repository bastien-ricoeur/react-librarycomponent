import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from 'react-jss';

import Theme from '../../style/itheme';

import useStyles from './groupedbarchart-card.style';

export interface ChartData {
  label: string;
  data: Array<number>;
}

export type GroupedBarChartCardProps = {
  data: Array<ChartData>;
  groupLabels: Array<string>;
  label: string;
  size?: 'small' | 'medium' | 'large';
};

const GroupedBarChartCard: React.FC<GroupedBarChartCardProps> = ({
  data,
  groupLabels,
  label,
  size = 'medium',
}) => {
  const [displayComponent, setDisplayComponent] = useState(false);

  useEffect(() => {
    setTimeout(() => setDisplayComponent(true), 500);
  });

  let labelFontSize = 0;
  let barSize = 0;

  switch (size) {
    case 'small':
      labelFontSize = 12;
      barSize = 10;
      break;
    case 'medium':
      labelFontSize = 18;
      barSize = 14;
      break;
    default:
      labelFontSize = 29;
      barSize = 18;
      break;
  }

  const theme = useTheme<Theme>();

  const classes = useStyles({
    labelFontSize,
  });

  const chartData = {
    labels: groupLabels,
    datasets: data.map((obj: ChartData, index: number) => {
      let bgColor: string;

      switch (index % 4) {
        case 0:
          bgColor = theme.primary;
          break;
        case 1:
          bgColor = theme.second;
          break;
        case 2:
          bgColor = theme.lightPrimary;
          break;
        case 3:
          bgColor = theme.ligthSecond;
          break;
        default:
          bgColor = '';
          break;
      }

      return {
        ...obj,
        backgroundColor: bgColor,
      };
    }),
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          barThickness: barSize,
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  return (
    <div className={classes.root}>
      <div className={classes.chartLabel}>{label}</div>
      {displayComponent && (
        <div>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default GroupedBarChartCard;
