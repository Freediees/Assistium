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
  {label: 'Tidak', value: 2},
];

const urlApi = 'https://apifactory.telkom.co.id:8243/HCM/Assistium/v1/external/search';

//data constant
// import { TOKEN_KEY } from '../../../configs/constants';

//url


var taskArray = [];

import url from '../../../config/api_service';

class FilterInSearch extends Component {

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

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
      filterKey: params.default,
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

      axios.get(`https://apifactory.telkom.co.id:8243/HCM/Assistium/v1/external/getjt/${compdep_id}`, {
        headers: { 'x-authorization': `bearer ${token}` }
      })
      .then((res) => {
        console.log(res.data.data);
        //this.setState({ tasks: res.data.data });
        taskArray = res.data.data;
        this.setState({
            tasks: taskArray,
            dataSource: this.state.dataSource.cloneWithRows(taskArray)
        })
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
  }

  renderRow(rowData, sectionId, rowId) {
      return (
          <ListItem>
              <View style={{opacity: this.state.editModeOpacity, width: this.state.width}}>
                  <CheckBox checked={rowData.isChecked || true} onPress={() => this.toggleCheckForTask(rowData.jobtarget_id)} />
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
    console.log(date);
    this.setState({ filterEndda: date });
  }

  onPressButton(){
    const {token, compdep_id} = this.props;

    var a = '';
    let { tasks } = this.state;
    for (var i = 0; i < tasks.length; i++) {
      if(i === 0){
        if (tasks[i].isChecked !== true) {
            a = a + tasks[i].jobtarget_id;
        }
      }else{
        if (tasks[i].isChecked !== true) {
            a = a + '.' + tasks[i].jobtarget_id;
        }
      }
    }

    const urlSearch = `${urlApi}/${compdep_id}/${a || null}/${this.state.filterBegda}/${this.state.filterEndda}/${this.state.filterExpired}/${this.state.filterKey || 'axzc'}/${this.state.filterLimit}/${this.state.filterOffset}`;
    console.log(urlSearch);

    this.props.navigation.navigate('FilterSearch', {url: urlSearch});
  }


  onPressCheckBox(value){
    console.log(value);
  }

  _renderItem(item){
    return(

      <ListItem key={item.jobtarget_id}>
        <CheckBox checked={true} onPress={()=> this.toggleCheckForTask(item.jobtarget_id)}/>
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
            <Text style={{marginLeft:10, marginTop: 10, fontSize: 17}}>Kata Pencarian</Text>
            <View style={{marginVertical:10, padding: 10, backgroundColor:'white'}}>
              <Item>
                <Input
                  value={this.state.filterKey}
                  placeholder='Kata Pencarian'
                  onChangeText={kata => this.setState({ filterKey: kata })}
                />
              </Item>
            </View>


              <Text style={{marginLeft:10, fontSize: 17}}>Expired</Text>
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
                onPress={(value) => {this.setState({filterExpired: value})}}
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



                {
                  // <Text style={{marginLeft:10, fontSize: 17}}>Offset</Text>
                  // <View style={{marginVertical:10, padding: 10, backgroundColor:'white'}}>
                  //   <Text style={{ margin: 15, fontSize: 14}}>Offset</Text>
                  // </View>
                }

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

export default connect(mapStateToProps)(FilterInSearch);


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
