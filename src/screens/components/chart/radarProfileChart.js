import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ScrollView,
  Dimensions
} from 'react-native';

import update from 'immutability-helper';
import {RadarChart} from 'react-native-charts-wrapper';

class RadarChartScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textSize: 16,
        form: 'CIRCLE',
        wordWrapEnabled: true
      }
    };
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: [{value: 3}, {value: 3}, {value: 3}, {value: 3}, {value: 3}],
              label: 'Requirement',
              config: {
                color: processColor('#95a5a6'),

                drawFilled: true,
                fillColor: processColor('#95a5a6'),
                fillAlpha: 100,
                lineWidth: 2
              }
            }, {
              values: [{value: 2}, {value: 4}, {value: 3}, {value: 3}, {value: 2}],
              label: 'Rating',
              config: {
                color: processColor('#2ecc71'),

                drawFilled: true,
                fillColor: processColor('#2ecc71'),
                fillAlpha: 150,
                lineWidth: 1.5
              }
            }],
          }
        },
        xAxis: {
          $set: {
            valueFormatter: ['A', 'B', 'C', 'D', 'E']
          }
        }
      })
    );
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  renderRadar(){
    return(
      <RadarChart
        style={styles.chart}
        data={this.state.data}
        xAxis={this.state.xAxis}
        legend={this.state.legend}            
        yAxis={{drawLabels:true, axisMaximum:3, axisMinimum: 1,granularityEnabled: true,
          textSize: 14,
          enabled: true}}
        chartDescription={{text: ''}}
        drawWeb={true}
        skipWebLineCount={1}
        onSelect={this.handleSelect.bind(this)}
        onChange={(event) => console.log(event.nativeEvent)}
      />
    )
  }

  render() {
    return (
      <ScrollView stlye={styles.container}>
        {this.renderRadar()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chart: {
    marginTop: 10,
    height: Dimensions.get('window').height / 2,
    width:300,
    padding: 20,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default RadarChartScreen;