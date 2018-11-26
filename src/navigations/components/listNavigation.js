
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
  Platform
} from 'react-native';

//library
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from 'react-navigation';
import {connect} from 'react-redux';
import axios from 'axios';

//global
import { logout } from '../../actions/actionCreator';

class Menu extends Component {
  constructor(props){
    super(props);

    this.state = {
      isModalVisible: false,
      nik:'',
      nama:'',
      foto:null,
      token:'',

      displayVideo: false,
      timer: null
    }
  }

  goDashboard(){
    setTimeout(() => { 
      this.props.navigation.navigate('Dashboard')  
    }, 100); 
    this.props.navigation.dispatch(DrawerActions.closeDrawer());    
  }

  goProfile(){
    setTimeout(() => { 
      this.props.navigation.navigate('Profile')  
    }, 100); 
    this.props.navigation.dispatch(DrawerActions.closeDrawer());  
  }

  render(){
    const {logout, imageProfile} = this.props;
    return (
      <View style={styles.container}> 
        {/* <View style={styles.containerUser}>
          <View style={{justifyContent:'center', alignItemsL:'center', width:'100%'}}>
            <Image style={styles.avatar} source={{uri: imageProfile}}/>    
          </View>
        </View> */}

        <View style={styles.menuTitle}>
          <Text style={styles.styleTitleMenu}>MENU</Text>
        </View>

        <TouchableOpacity onPress={() => this.goDashboard()}>
          <View style={styles.menuItems}>
            <View>
              <Icon name="home" size={16} color="#828282"/>
            </View>
            <View>
              <Text style={styles.styleMenuItems}>   Home</Text>          
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.goProfile()}>
          <View style={styles.menuItems}>
            <View>
              <Icon2 name="md-person" size={17} color="#828282"/>
            </View>
            <View>
              <Text style={styles.styleMenuItems}>    About Us</Text>          
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={logout}>
          <View style={styles.menuItems}>
            <View>
              <Icon name="logout-variant" size={16} color="#828282"/>
            </View>
            <View>
              <Text style={styles.styleMenuItems}>   Logout</Text>          
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.LoginReducer.token,
  compdep_id:state.LoginReducer.compdep_id,
  imageProfile:state.dashboardReducer.dataDashboard,
})

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  containerUser:{
    backgroundColor:'#d65347',
    height:150,
    justifyContent:'center',
    alignItems:'center'
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  menuItems:{
    padding:15,
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row',
  },
  styleMenuItems:{
    fontSize:16,
    color:'#828282'
  },
  menuTitle:{
    backgroundColor:'#7b7b7b',
    padding:10,
    marginTop:Platform.OS === 'ios' ? 20 : 0
  },
  styleTitleMenu:{
    color:'#fff',
    textAlign:'center', 
    fontSize:18,
    fontWeight:'bold'
  },
});
