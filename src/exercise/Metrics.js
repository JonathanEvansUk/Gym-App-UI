import React from "react";
import { Line } from "react-chartjs-2";

const Metrics = props => {
  const { metrics } = props;

  console.log(metrics);

  // TODO remove this if statement. This component should not be rendering twice. It renders twice due to 2 fetch calls
  if (metrics === undefined) {
    return "No Metrics Found";
  }

  const data = {
    labels: metrics.workoutInformations.map(workoutInformation =>
      new Date(workoutInformation.performedAtTimestamp).toLocaleDateString()
    ),
    datasets: [
      {
        data: metrics.workoutInformations.map(
          workoutInformation => workoutInformation.highestWeightSet
        ),
        //lineTension: 0,
        fill: false,
        label: "Highest Weight Set",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)"
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "KG"
          }
        }
      ]
    }
  };

  return (
    <Line
      data={data}
      options={options}
      onElementsClick={elems => {
        const elem = elems[0];

        console.log(elem);
        if (elem) {
          const datasetIndex = elems[0]._datasetIndex;
          const index = elems[0]._index;

          console.log(data.labels[index]);
          console.log(data.datasets[datasetIndex].data[index]);
        }
      }}
    />
  );
};

export default Metrics;
