import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor,
  Dimensions
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';

class RekomendasiChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //data user
      dataRekomendasi:this.props.datanya,
      dataJumlah:[],
      dataName:[],

      //state of chart
      data:{},
      legend: {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 10,
        wordWrapEnabled: true
      },
      xAxis:{},
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

  componentWillMount(){
    if (this.state.dataRekomendasi) {

      //data BE/EM
      const beemNR  = this.state.dataRekomendasi.BE_EM.NOT_READY.jumlah;
      const beemRWD = this.state.dataRekomendasi.BE_EM.READY_WITH_DEVELOPMENT.jumlah;
      const beemRN  = this.state.dataRekomendasi.BE_EM.READ_NOW.jumlah;

      //data C_R
      const c_rNR  = this.state.dataRekomendasi.C_R.NOT_READY.jumlah;
      const c_rRWD = this.state.dataRekomendasi.C_R.READY_WITH_DEVELOPMENT.jumlah;
      const c_rRN  = this.state.dataRekomendasi.C_R.READ_NOW.jumlah;

      //data D_I
      const d_iNR  = this.state.dataRekomendasi.D_I.NOT_READY.jumlah;
      const d_iRWD = this.state.dataRekomendasi.D_I.READY_WITH_DEVELOPMENT.jumlah;
      const d_iRN  = this.state.dataRekomendasi.D_I.READ_NOW.jumlah;

      //data R_C
      const r_cNR  = this.state.dataRekomendasi.R_C.NOT_READY.jumlah;
      const r_cRWD = this.state.dataRekomendasi.R_C.READY_WITH_DEVELOPMENT.jumlah;
      const r_cRN  = this.state.dataRekomendasi.R_C.READ_NOW.jumlah;

      //data SP_D
      const sp_dNR  = this.state.dataRekomendasi.SP_D.NOT_READY.jumlah;
      const sp_dRWD = this.state.dataRekomendasi.SP_D.READY_WITH_DEVELOPMENT.jumlah;
      const sp_dRN  = this.state.dataRekomendasi.SP_D.READ_NOW.jumlah;

      //data Akronim
      const akro_beem = this.state.dataRekomendasi.BE_EM.NOT_READY.akronim;
      const akro_cr   = this.state.dataRekomendasi.C_R.NOT_READY.akronim;
      const akro_di   = this.state.dataRekomendasi.D_I.NOT_READY.akronim;
      const akro_rc   = this.state.dataRekomendasi.R_C.NOT_READY.akronim;
      const akro_spd  = this.state.dataRekomendasi.SP_D.NOT_READY.akronim;
      const dataAkronim = [akro_beem, akro_cr, akro_di, akro_rc, akro_spd]

      this.setState({
        data: {
          dataSets: [{
          values: 
            [
              {
                y:[beemNR, beemRWD, beemRN]
              }, 
              { 
                y:[d_iNR, d_iRWD, d_iRN]
              }, 
              { 
                y:[r_cNR, r_cRWD, r_cRN]
              }, 
              {
                y:[r_cNR, r_cRWD, r_cRN]
              }, 
              {
                y:[sp_dNR, sp_dRWD, sp_dRN]
              }
            ],            
            label: '',
            config: {
              colors: [processColor('#FFD08C'), processColor('#FFF78C'), processColor('#C0FF8C')],
              stackLabels: ['Not Ready', 'Ready with Development', 'Ready Now'],              
              valueTextSize: 0,
            }
          }],
        },
        xAxis: {   
          valueFormatter: dataAkronim,
          granularityEnabled: true,
          granularity: 1,
        },
      });      
    }
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
          // drawValueAboveBar={true}
          onSelect={this.handleSelect.bind(this)}
          gridBackgroundColor={processColor('#ffffff')}
          animation={{durationX: 2000}}
          drawBarShadow={false}
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


export default RekomendasiChart;