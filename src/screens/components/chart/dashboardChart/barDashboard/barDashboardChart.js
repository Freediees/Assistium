import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  processColor,
  Dimensions
} from 'react-native';

import {HorizontalBarChart} from 'react-native-charts-wrapper';
import axios from 'axios';
import {connect} from 'react-redux';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legend: {
        enabled: false,
      },
      data: {
        dataSets: [{
          values: [
            {y:[20, 35, 45]},
            {y:[30, 50, 20]},
            {y:[30, 20, 50]},
            {y:[30, 50, 10]},
            {y:[25, 50, 25]},
            {y:[40, 35, 15]},
          ],
          label: '',
          config: {
            barSpace: 5,
            colors: [processColor('#FB2F23'), processColor('#FFCE00'), processColor('#00CEA8')],
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
            valueTextSize: 10,
            valueTextColor: processColor('#FFF'),
            valueFormatter: "#.#'%'",
          }
        }],
      },
      xAxis: {
        valueFormatter: ['AM', 'LEAD', 'DM', 'AT', 'BAW', 'COL'],
        position: 'TOP',
        gridColor: processColor('white'),
        granularityEnabled: true,
        granularity: 1,
        labelCount:10,
      },
      yAxis: {
        left:{
          axisMinimum: 0,
          gridLineWidth: 1,
          gridColor: processColor('white'),
          enabled: false
        },
        right:{
          gridLineWidth: 1,
          gridColor: processColor('white'),
          enabled: false
        }
      }
    };
  }

  componentDidMount(){
    setTimeout(() => {
      const {dataChart} = this.props;
      console.log(dataChart);
      const labelBar = dataChart.map(x => x.comp_name);

      let dataLength = dataChart.length;
      let dataArray1 = [];
      let dataArray2 = [];
      let strcoba    = null;
      let metcoba    = null;
      let weakcoba   = null;
      for (i=0; i<dataLength; i++){

        strcoba  = dataChart[i].strength;
        metcoba  = dataChart[i].met;
        weakcoba = dataChart[i].weakness;

        dataArray1 = {y:[weakcoba, metcoba, strcoba]}

        dataArray2.push( dataArray1 );
      }

      this.setState({
        data: {
          dataSets: [{
            values: dataArray2,
            label: '',
            config: {
              barSpace: 10,
              colors: [processColor('#FB2F23'), processColor('#FFCE00'), processColor('#00CEA8')],
              barShadowColor: processColor('lightgrey'),
              highlightAlpha: 300,
              highlightColor: processColor('red'),
              valueTextSize: 10,
              valueTextColor: processColor('#FFF'),
              valueFormatter: "#.#'%'",
            }
          }],
        },
        xAxis: {
          valueFormatter: labelBar,
          position: 'TOP',
          gridColor: processColor('white'),
          granularityEnabled: true,
          granularity: 1,
          labelCount:dataLength,
        },
      })
    }, 2000)

  }

  render() {
    return (
      <View style={styles.container}>
        <HorizontalBarChart
          style={styles.chart}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          data={this.state.data}
          legend={this.state.legend}
          drawValueAboveBar={false}
          chartDescription={{text:""}}
          animation={{durationX: 2000}}
          drawGridBackground = {false}
          gridBackgroundColor={processColor('#fff')}
          drawBarShadow={false}
          drawHighlightArrow={true}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  dataChart:state.BarDashboardReducer.dataChart
})

export default connect(mapStateToProps)(BarChart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  chart:{
    height:1200,
    width:380,
    justifyContent:'center',
    alignItems:'center'
  }
});
