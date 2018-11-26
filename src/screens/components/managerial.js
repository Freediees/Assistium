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

class ManagerialComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataMGR:this.props.dataRadar,
     
    };
  }

  componentWillMount() {
    // <FlatList
    //   data={this.state.dataKompetensi}
    //   keyExtractor={(item) => item.comp_id}   
    //   renderItem={({ item }) => (
    //       console.log(item.rating)
    //     )
    //   }
    // />
    if (this.state.dataKompetensi) {
      const dataRating = this.state.dataKompetensi.map(x => x.rating);
      const valueDATA = this.state.dataKompetensi.map(x => x.abbreviation);        
      const countDataRating = dataRating.length - 1;
      const dataDefault = [];
      for (i=0; i<=countDataRating; i++)
        { 
          dataDefault[i]= 3;
        }
      this.setState({
        ratingCoba:dataRating,
        valueDATA:valueDATA,
        defaultData:dataDefault
      })
    }
  }

  render() {
    return (
      <View style={styles.containerTwoCard}>
        <View style={styles.containerStrengthTable}>
          <View style={styles.headerCardStrength}>
            <Text style={{color:'#fff', fontWeight:'bold'}}>MGR</Text>  
          </View>

          <FlatList
            data={item.strength_kompetensi}
            keyExtractor={(item) => item.abbreviation}   
            renderItem={({ item }) => ( 
              <View style={{padding:5, width:'100%', flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#858585'}}>
                <View style={{width:'90%'}}>
                  <Text style={{color:'#858585', fontSize:11}}>
                    {item.comp_name}
                  </Text>
                </View>
                <View style={{width:'10%'}}>
                  <Text style={{color:'#858585',fontSize:12}}>
                    X
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        <View style={styles.containerWeaknessTable}>
          <View style={styles.headerCardWeakness}>
            <Text style={{color:'#fff', fontWeight:'bold'}}>Non MGR</Text>                    
          </View>
          
          <FlatList
            data={item.weakness_kompetensi}
            keyExtractor={item => item.abbreviation}     
            renderItem={({ item }) => ( 
              <View style={{padding:5, width:'100%', flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#858585'}}>
                <View style={{width:'90%'}}>
                  <Text style={{color:'#858585', fontSize:11}}>
                    {item.comp_name}
                  </Text>
                </View>
                <View style={{width:'10%'}}>
                  <Text style={{color:'#858585',fontSize:12}}>
                    X
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
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

  export default ManagerialComponent;