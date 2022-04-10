import React from "react";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryGroup, VictoryTooltip } from "victory";

export default function ChartResult(props) {
  var { data } = props

  data.map((item, index) => {
    Object.assign(item, {label: `On ${item.dateTaken} :: systolic: ${item.systolic} and diastolic: ${item.diastolic}`})
  })
  
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
      <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
      <VictoryBar 
      labelComponent={<VictoryTooltip/>}
          style={{ data: { fill: "#feb5b1" } }} 
          
          barRatio={0.5}
          alignment="start"
          data={data} 
          x="dateTaken"
          y="systolic"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
      />
      <VictoryBar 
      labelComponent={<VictoryTooltip/>}
          style={{ data: { fill: "#a2bffe" } }} 
          
          barRatio={0.5}
          alignment="start"
          data={data} 
          x="dateTaken"
          y="diastolic"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
      />
      </VictoryGroup>
    </VictoryChart>
  );
}
