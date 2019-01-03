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

import { CardItem } from 'native-base';

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
      const valueDATA   = this.state.dataKompetensi.map(x => `${x.comp_name.toString().substr(0, 10)}...`);
      console.log(this.state.dataKompetensi);
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
                color: processColor('#4286f4'),
                drawFilled: true,
                fillColor: processColor('#4286f4'),
                fillAlpha: 100,
                lineWidth: 1,
                circleColor: processColor('#4286f4')
              }
            }, {
              values: this.state.ratingCoba,
              label: 'Rating',
              config: {
                color: processColor('#e2a82b'),
                drawFilled: false,
                fillColor: processColor('#e2a82b'),
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
        yAxis={{drawLabels:true, axisMaximum:2, axisMinimum: 0,granularityEnabled: true,
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

        <CardItem style={{ marginTop: -10, height: 30, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}} >
          <CardItem >
            <View style={{ height: 10, width: 10, backgroundColor: '#4286f4', borderRadius: 5 }} />
            <Text style={{textAlign:'left', color:'#000',margin:3, fontSize: 14}}>Requirement</Text>
          </CardItem>
          <CardItem>
            <View style={{ height: 10, width: 10, backgroundColor: '#e2a82b', borderRadius: 5 }} />
            <Text style={{textAlign:'left', color:'#000', margin:3, fontSize: 14 }}>Rating</Text>
          </CardItem>
        </CardItem>
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
    marginTop: -30,
    height: Dimensions.get('window').height / 1.5,
    width:350,
    padding: -250,
    marginBottom: -100,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default RadarChartDetailScreen;
