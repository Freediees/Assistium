import React, { Component } from 'react';
import {format, compareAsc} from 'date-fns';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  BackHandler
} from 'react-native';

//library
import  { Container, Header, Content, Form, Item, Input,
  Label, Button, Text, Icon, Toast, Card, CardItem, Body,
  Right, Left, Title, Footer, FooterTab, DatePicker, ListItem, CheckBox
} from 'native-base';
import axios from 'axios';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {connect} from 'react-redux';

const radio_props = [
  {label: 'Semua', value: 0 },
  {label: 'Ya', value: 1 },
  {label: 'Tidak', value: 0},
];

const urlApiKompetensi = 'https://apifactory.telkom.co.id:8243/HCM/Assistium/v1/external/profilekompetensi';
const urlApiRekomendasi = 'https://apifactory.telkom.co.id:8243/HCM/Assistium/v1/external/profilerekomendasi';

//data constant
// import { TOKEN_KEY } from '../../../configs/constants';

//url
var taskArray = [];
import url from '../../../config/api_service';

class FilterDashboard extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
    this.state = {
      tasks: taskArray,
      dataSource: dataSource.cloneWithRows(taskArray),
      data:[],
      nikUser:'',
      dataCoba:'',
      showLoader:false,
      statusButton:false,
      statusButton2:false,
      messageButton:'Tampilkan',
      token:'',
      filterKey: '',
      filterExpired: 0,
      filterComdep: null,
      filterBegda: null,
      filterEndda: null,
      filterJT: null,
      filterLimit: 10,
      filterOffset: 0,
      dataJT: []
    };
  }

  componentWillMount(){

      const {token, compdep_id} = this.props;

      console.log(compdep_id);

      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.goBack(); // works best when the goBack is async
        return true;
      });


      axios.get(`https://apifactory.telkom.co.id:8243/HCM/Assistium/v1/external/getjt/${compdep_id}`, {
        headers: { 'x-authorization': `bearer ${token}` }
      })
      .then((res) => {
        console.log(res.data.data);
        taskArray = res.data.data;

        this.setState({
            tasks: taskArray,
            dataSource: this.state.dataSource.cloneWithRows(taskArray)
        });

        for (var i = 0; i < this.state.tasks.length; i++) {
          var newTasks = this.state.tasks;
          newTasks[i].isChecked = !newTasks[i].isChecked;
          // //
          // // // the list is updated with the new task array
          var newDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
          // //
          this.setState({
              tasks: newTasks,
              dataSource: newDataSource.cloneWithRows(newTasks)
          });
        }

      })
      .catch((error) => {
        console.log(error)
      });



    // AsyncStorage.getItem(TOKEN_KEY).then(res => {
    //   const token = res;
    //   this.setState({
    //     token:token
    //   })
    // }).catch((error) => {
    //   console.log(error)
    // });
  }

  goBack(){
    this.props.navigation.goBack();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  findTaskIndex(taskId) {
      let { tasks } = this.state;
      for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].jobtarget_id == taskId) {
              return i;
          }
      }

      return -1;
  }

  toggleCheckForTask(taskId) {
      var foundIndex = this.findTaskIndex(taskId);

      // the ischecked value will be set for that task in the tasks array
      var newTasks = this.state.tasks;
      newTasks[foundIndex].isChecked = !newTasks[foundIndex].isChecked;
      // //
      // // // the list is updated with the new task array
      var newDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
      // //
      this.setState({
          tasks: newTasks,
          dataSource: newDataSource.cloneWithRows(newTasks)
      });

      console.log('Index of this task is ', foundIndex);
      //console.log(this.state.tasks);
  }

  renderRow(rowData, sectionId, rowId) {
      return (
          <ListItem>
              <View style={{opacity: this.state.editModeOpacity, width: this.state.width}}>
                  <CheckBox checked={rowData.isChecked} onPress={() => this.toggleCheckForTask(rowData.jobtarget_id)} />
              </View>
              <Body>
                  <View>
                      <Text>{rowData.jobtarget_name}</Text>
                  </View>
              </Body>
          </ListItem>
      );
  }


  renderDataAPi(data){
    const token = this.state;

    axios.get(`${url.APIDEV}search/${data}/10/0`, {
      headers: { 'x-authorization': `bearer ${token}` }
    })
    .then((res) => {
      console.log(res);
      const data = res.data.message;
      this.setState({
        messageButton:data
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  renderButton(data){
    this.setState({
      statusButton:!this.state.statusButton
    })
    this.renderDataAPi(data);
  }

  renderButton2(data){
    this.setState({
      statusButton2:!this.state.statusButton2
    })
    this.renderDataAPi(data);
  }


  setDateStart(newDate) {
    const date = format(newDate, 'YYYY-MM-DD').toString();
    console.log(date);
    this.setState({ filterBegda: date });
  }


  setDateEnd(newDate) {
    const date = format(newDate, 'YYYY-MM-DD').toString();
    this.setState({ filterEndda: date });
  }

  onPressButton(){
    const {token, compdep_id} = this.props;
    var a = '';
    let { tasks } = this.state;
    for (var i = 0; i < tasks.length; i++) {
      if(a === ''){
        if (tasks[i].isChecked === true) {
            a = a + tasks[i].jobtarget_id;
        }
      }else{
        if (tasks[i].isChecked === true) {
            a = a + '.' + tasks[i].jobtarget_id;
        }
      }
    }

    const urlKompetensi = `${urlApiKompetensi}/${compdep_id}/${this.state.filterBegda}/${this.state.filterEndda}/${this.state.filterExpired}/${a || null}`;
    const urlRekomendasi= `${urlApiRekomendasi}/${compdep_id}/${this.state.filterBegda}/${this.state.filterEndda}/${this.state.filterExpired}/${a || null}`;

    this.props.navigation.navigate('DashboardSearch', { urlKompetensi: urlKompetensi, urlRekomendasi: urlRekomendasi });
  }

  _renderItem(item){
    return(

      <ListItem key={item.jobtarget_id}>
        <CheckBox checked={false} />
        <Body>
          <Text>{item.jobtarget_name}</Text>
        </Body>
      </ListItem>
    );
  }

  renderCards(){
    return this.state.dataJT.map( item => {
      return this._renderItem(item);
    });
  }


  render() {

    return (
      <Container style={styles.container}>
      <ScrollView>
      <Header style={{backgroundColor:'#FE000C'}}>
        <Left style={{flex:1}}>
          <Button transparent onPress={() => this.goBack()}>
            <Icon name='arrow-back' type={'Ionicons'}/>
          </Button>
        </Left>
        <Body style={{flex: 2}}>
          <Image
            resizeMode={'contain'}
            style={{
              height:40,
              width:200,
            }}
            source={require('../../../Assets/logo/assistium-logo.png')}
          />
        </Body>
        <Right style={{flex:1}}>

        </Right>
      </Header>

      {
        // <Header style={{backgroundColor:'#092948'}}>
        //   <Left style={{flex: 1}}>
        //     <Button transparent onPress={() => this.goBack()}>
        //       <Icon name='arrow-back' type={'Ionicons'}/>
        //     </Button>
        //   </Left>
        //   <Body style={{flex: 1}}>
        //     <Title>      Filters</Title>
        //   </Body>
        //   <Right style={{flex: 1}}/>
        // </Header>
        //
        // <Content padder>
        //   <View style={styles.container}>
        //     <Button block style={this.state.statusButton ? styles.buttonFiltersActive : styles.buttonFilters} onPress={() => this.renderButton('ctr')}>
        //       <Text style={this.state.statusButton ? styles.buttonTextActive : styles.buttonTextNoActive}>CTR</Text>
        //     </Button>
        //
        //     <Button block style={this.state.statusButton2 ? styles.buttonFiltersActive2 : styles.buttonFilters2} onPress={() => this.renderButton2('ctr-aci')}>
        //       <Text style={this.state.statusButton2 ? styles.buttonTextActive2 : styles.buttonTextNoActive2}>CTR-ACI</Text>
        //     </Button>
        //   </View>
        // </Content>
        //
        // <Footer>
        //   <FooterTab style={{backgroundColor:'#092948'}}>
        //     <Button full onPress={() => alert('Filter')}>
        //       <Text style={{fontSize:14, color:'#fff'}}>{this.state.messageButton}</Text>
        //     </Button>
        //   </FooterTab>
        // </Footer>


        // <View style={{flex: 1, flexDirection:'row'}}>
        //   <View style={styles.shadowViewStyle}>
        //     <Card>
        //       <CardItem>
        //         <Text>Job Target</Text>
        //       </CardItem>
        //     </Card>
        //     <Card>
        //       <CardItem>
        //         <Text>Range Tanggal</Text>
        //       </CardItem>
        //     </Card>
        //     <Card>
        //       <CardItem>
        //         <Text>Expired Status</Text>
        //       </CardItem>
        //     </Card>
        //   </View>
        //
        //   <View style={{flex: 3}}>
        //
        //   </View>
        // </View>
      }



      <View>
        <Form>
              <Text style={{marginLeft:10, fontSize: 17, marginTop: 10}}>Expired</Text>
              <View style={{marginVertical:10, paddingTop: 10, backgroundColor:'white'}}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={false}
                buttonColor={'red'}
                selectedButtonColor={'red'}
                buttonSize={10}
                labelStyle={{marginHorizontal: 40}}
                animation={true}
                onPress={(value) => {
                  this.setState({filterExpired: value})
                  console.log(value);
                }}
              />
              </View>

              <Text style={{marginLeft:10, fontSize: 17}}>Tanggal</Text>
              <View style={{marginVertical:10, padding: 10, backgroundColor:'white'}}>
                <CardItem>
                <View>
                  <Text style={{fontSize: 14, marginLeft: 10}}>Dari</Text>
                  <DatePicker
                    defaultDate={new Date(2018, 11, 1)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Date"
                    textStyle={{ color: "grey"}}
                    placeHolderTextStyle={{ color: "grey" }}
                    onDateChange={(value)=> this.setDateStart(value)}
                    />
                  </View>
                  <View style={{marginLeft: 30}}>
                    <Text style={{fontSize: 14, marginLeft: 10}}>Sampai</Text>
                    <DatePicker
                      defaultDate={new Date(2018, 11, 1)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Date"
                      textStyle={{ color: "grey"}}
                      placeHolderTextStyle={{ color: "grey" }}
                      onDateChange={(value)=> this.setDateEnd(value)}
                      />
                    </View>
                  </CardItem>
                </View>
                {
                  // <Text style={{marginLeft:10, fontSize: 17}}>Job Target</Text>
                  // <View style={{marginVertical:10, padding: 10, backgroundColor:'white'}}>
                  //   {this.renderCards()}
                  // </View>
                }

                <Text style={{marginLeft:10, fontSize: 17}}>Job Target</Text>
                <View style={{marginVertical:10, padding: 10, backgroundColor:'white'}}>
                  <ListView
                     dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}
                     enableEmptySections={true}
                 />
                </View>



                <Card>
                  <CardItem style={{justifyContent: 'center', flexDirection: 'column', backgroundColor: 'red'}} button onPress={()=> this.onPressButton()}>
                    <Text style={{ color: '#fff'}}>Terapkan</Text>
                  </CardItem>
                </Card>
        </Form>
      </View>
      </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.LoginReducer.token,
  compdep_id:state.LoginReducer.compdep_id,
  nik_user:state.LoginReducer.nik_user
})

export default connect(mapStateToProps)(FilterDashboard);


const styles = StyleSheet.create({
  shadowViewStyle: {
    flex: 2,
    padding: 5,
    backgroundColor: '#eceff1',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  container:{
    flex:1,
    marginBottom:20,
    backgroundColor:'#F3F3F3'
  },
  buttonFilters:{
    borderBottomColor:'#f3f3f3',
    borderBottomWidth:1,
    backgroundColor:'transparent'
  },
  buttonFiltersActive:{
    borderBottomColor:'#2c3e50',
    borderBottomWidth:1,
    backgroundColor:'#2c3e50'
  },
  buttonFiltersActive:{
    fontSize:14, color:'#fff'
  },
  buttonTextNoActive:{
    fontSize:14, color:'#000'
  },

  buttonFilters2:{
    borderBottomColor:'#f3f3f3',
    borderBottomWidth:1,
    backgroundColor:'transparent',
    marginTop:10
  },
  buttonFiltersActive2:{
    borderBottomColor:'#2c3e50',
    borderBottomWidth:1,
    backgroundColor:'##2c3e50',
    marginTop:10
  },
  buttonFiltersActive2:{
    fontSize:14, color:'#fff'
  },
  buttonTextNoActive2:{
    fontSize:14, color:'#000'
  },
});
