import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';

import update from 'immutability-helper';
import {RadarChart} from 'react-native-charts-wrapper';

class RadarChartDetailScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataKompetensi:this.props.dataRadar,
      ratingCoba:[],
      valueDATA:[],
      defaultData:[],
      data: {},
      legend: {
        enabled: true,
        textSize: 16,
        form: 'CIRCLE',
        wordWrapEnabled: true
      }
    };
  }

  componentWillMount() {
    if (this.state.dataKompetensi) {
      const dataRating  = this.state.dataKompetensi.map(x => x.rating);
      let   convertData = dataRating.map(v => parseInt(v, 10));
      const valueDATA   = this.state.dataKompetensi.map(x => x.singkatan);        
      const countDataRating = dataRating.length - 1;
      const dataDefault = [];
      for (i=0; i<=countDataRating; i++)
        { 
          dataDefault[i]= 3;
        }
      this.setState({
        ratingCoba:convertData,
        valueDATA:valueDATA,
        defaultData:dataDefault
      })
    }
  }

  componentDidMount(){
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: this.state.defaultData,
              label: 'Requirement',
              config: {
                color: processColor('#95a5a6'),

                drawFilled: true,
                fillColor: processColor('#95a5a6'),
                fillAlpha: 100,
                lineWidth: 1
              }
            }, {
              values: this.state.ratingCoba,
              label: 'Rating',
              config: {
                color: processColor('#2ecc71'),

                drawFilled: true,
                fillColor: processColor('#2ecc71'),
                fillAlpha: 150,
                lineWidth: 2
              }
            }],
          }
        },
        xAxis: {
          $set: {
            valueFormatter: this.state.valueDATA,
            drawGridLines: true,
            axisMaximum: this.state.valueDATA.length,
            granularityEnabled: true,
            enabled:true
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
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
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

export default RadarChartDetailScreen;