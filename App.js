import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Header, Title, Content, Text,
    Button, Icon, Left, Right, Body, Badge,
    List, ListItem, CheckBox
} from 'native-base';
import { View, ListView } from 'react-native';


var taskArray = [{label: 'Semua', value: 0 },
{label: 'Ya', value: 1 },
{label: 'Tidak', value: 2},];


class App extends React.Component {

    constructor(props) {
       super(props);

       var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
       this.state = {
           tasks: taskArray,
           dataSource: dataSource.cloneWithRows(taskArray),
           isLoading: true
       }
   }


    findTaskIndex(taskId) {
        let { tasks } = this.state;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].value === taskId) {
                return i;
            }
        }

        return -1;
    }

    findTaskIndex(taskId) {
        let { tasks } = this.state;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].value == taskId) {
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
        //
        // // the list is updated with the new task array
        var newDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
        //
        this.setState({
            tasks: newTasks,
            dataSource: newDataSource.cloneWithRows(newTasks)
        });

        console.log('Index of this task is ', foundIndex);
    }

    renderRow(rowData, sectionId, rowId) {
      console.log(rowData.label);
        return (
            <ListItem>
                <View style={{opacity: this.state.editModeOpacity, width: this.state.width}}>
                    <CheckBox checked={rowData.isChecked} onPress={() => this.toggleCheckForTask(rowData.value)} />
                </View>
                <Body>
                    <View>
                        <Text>{rowData.label}</Text>
                    </View>
                </Body>
            </ListItem>
        );
    }

    render() {

      console.log(this.state.tasks);
      let currentView = <View />;
        if (this.state.isLoading) {
            currentView = <View />;
        } else {
          currentView = <ListView
             dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}
             enableEmptySections={true}
         />;
        }

        return (
            <Container>
                <Header>
                    <Left>
                        </Left>
                    <Body>
                        <Title>My tasks</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => this.toggleEditMode()} transparent><Text>Edit</Text></Button>
                    </Right>
                </Header>
                <Content>
                  <ListView
                     dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}
                     enableEmptySections={true}
                 />
                </Content>
            </Container>
        );
    }
}


export default App;
