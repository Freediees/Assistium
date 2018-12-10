import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  processColor,
  Dimensions
} from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';
import axios from 'axios';
import { connect } from "react-redux";

//global
import { logout } from '../../../../../actions/actionCreator';
import url from '../../../../../config/api_service';

class PieChartScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      legend: {
        enabled: false,
        textSize: 15,
        form: 'CIRCLE',

        horizontalAlignment: "LEFT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: false
      },
      data: {
        dataSets: [{
          values: [
            {value: 0, label: 'Strength'},
            {value: 0, label: 'Met'},
            {value: 0, label: 'Weakness'},
          ],
          label: '',
          config: {
            colors: [processColor('#00CEA8'), processColor('#FFCE00'), processColor('#FB2F23'),],
            valueTextSize: 12,
            valueTextColor: processColor('white'),
            sliceSpace: 5,
            selectionShift: 13,
            valueFormatter: "#.#'%'",
            valueLineColor: processColor('white'),
            valueLinePart1Length: 0.5
          }
        }],
      },
      highlights: [{x:2}],

      //data Strength
      strengthPersen:0,
      strengthOrang:'',

      //data Met
      metPersen:0,
      metOrang:'',

      //data Weakness
      weaknessPersen:0,
      weaknessOrang:'',
    };
  }

  componentWillMount(){
    const {compdep_id, token} = this.props;
    const begda = null;
    const endda = null;
    const expired = 1;
    const jt = null;
    const abc = this.props.data;
    axios.get(abc || `${url.API}/profilerekomendasi/${compdep_id}/${begda}/${endda}/${expired}/${jt}`,{
      headers: { 'x-Authorization': `bearer ${token}`}
    }).then((res) => {
        console.log(res)
        this.setState({
          //data Strength
          strengthOrang:res.data.data.RN.people,
          //data Met
          metOrang:res.data.data.RWD.people,
          //data Weakness
          weaknessOrang:res.data.data.NR.people,

          data: {
            dataSets: [{
              values: [
                {value: res.data.data.RN.persen, label: `${res.data.data.RN.people} People`},
                {value: res.data.data.RWD.persen, label: `${res.data.data.RWD.people} People`},
                {value: res.data.data.NR.persen, label: `${res.data.data.NR.people} People`},
              ],
              label: '',
              config: {
                colors: [processColor('#00CEA8'), processColor('#FFCE00'), processColor('#FB2F23'),],
                valueTextSize: 12,
                valueTextColor: processColor('white'),
                sliceSpace: 5,
                selectionShift: 13,
                valueFormatter: "#.#'%'",
                valueLineColor: processColor('white'),
                valueLinePart1Length: 0.5
              }
            }],
          }
        })

      }).catch((err) => {
        Alert.alert(
          'Pemberitahuan',
          'Maaf sesi login anda sudah berakhir',
          [
            {text: 'OK', onPress: this.props.logout},
          ]
        )
      })
  }

  render() {
    return (
        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            data={this.state.data}
            chartDescription={{text:""}}
            legend={this.state.legend}
            highlights={this.state.highlights}
            entryLabelColor={processColor('white')}
            entryLabelTextSize={12}
            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={360}
          />
        </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.LoginReducer.token,
  compdep_id:state.LoginReducer.compdep_id,
})

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(PieChartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  chart:{
    height: Dimensions.get('window').height / 3,
    width:250,
    justifyContent:'center',
    alignItems:'center'
  }
});
