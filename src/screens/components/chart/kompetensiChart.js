import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor,
  Dimensions
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

class KompetensiChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataKompetensi:this.props.datanya,
      
      //data Leader
      dataLeadWeakness:'',
      dataLeadMet:'',
      dataLeadStrength:'',

      //data prof
      dataProfWeakness:'',
      dataProfMet:'',
      dataProfStrength:'',

      legend: {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 10,
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [{y:[0, 0, 0]}, {y:[0, 0, 0]}], //weakness - met - strength
          label: '',
          config: {
            colors: [processColor('#FFD08C'), processColor('#FFF78C'), processColor('#C0FF8C')],
            stackLabels: ['Weakness', 'Met', 'Strength'],
            valueTextSize: 0,
          }
        }],
      },
      xAxis: {
        valueFormatter: ['Profesional', 'Leader'],
        granularityEnabled: true,
        granularity: 1,               
      },
      yAxis: {
        left: {
          valueFormatter: 'percent',
          axisMaximum: 100,
          axisMinimum: 0,
          granularityEnabled: true,
          enabled: true         
        },
        right:{
          enabled: false 
        }   
      }
    }
  }

  componentWillMount() {
    //data Leader
    const dataLeadWeakness = this.state.dataKompetensi.LEAD.weakness
    const dataLeadMet      = this.state.dataKompetensi.LEAD.met
    const dataLeadStrength = this.state.dataKompetensi.LEAD.strength

    //data prof
    const dataProfWeakness = this.state.dataKompetensi.PROF.weakness
    const dataProfMet      = this.state.dataKompetensi.PROF.met
    const dataProfStrength = this.state.dataKompetensi.PROF.strength

    this.setState({
      data: {
        dataSets: [{
          values: [{y:[dataProfWeakness, dataProfMet, dataProfStrength]}, {y:[dataLeadWeakness, dataLeadMet, dataLeadStrength]}], //weakness - met - strength
          label: '',
          config: {
            colors: [processColor('#FFD08C'), processColor('#FFF78C'), processColor('#C0FF8C')],
            stackLabels: ['Weakness', 'Met', 'Strength'],
            valueTextSize: 0,
          }
        }],
      },
    })
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

  render() {
    return (
      <View style={styles.container}>
        <BarChart
          style={styles.chart}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          data={this.state.data}
          legend={this.state.legend}
          drawValueAboveBar={true}
          highlights={this.state.highlights}
          onSelect={this.handleSelect.bind(this)}
          gridBackgroundColor={processColor('#ffffff')}
          animation={{durationX: 2000}}
          drawBarShadow={false}
          drawHighlightArrow={true}
          chartDescription={{ text: '' }}    
        />
      </View>    
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
    padding: 10,
    justifyContent:'center',
    alignItems:'center'
  }
});


export default KompetensiChart;