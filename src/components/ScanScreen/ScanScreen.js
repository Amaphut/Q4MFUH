import * as React from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default class ScanScreen extends React.Component {

// ===========================Header=============================================
  static navigationOptions = {
    title: 'แสกนคิวอาร์โค้ด',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#0091FF',
    fontFamily: 'Prompt-Regular',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  };

  state = {
    hasCameraPermission: null,
    scanned: false,
    dataAll: [],
    dep_queue:[]
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',

        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}>
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </BarCodeScanner>

      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    // console.log(data)

    // //javascript substring() , substr() #HN
    // var hn = data.substr(27, 9);
    // console.log(hn)

    var vncode = data;
    var main_dep = '' // <== 1
    var dataAll = ''
    console.log(vncode)

    // ===================axios===================================== https://github.com/axios/axios

    // not have server but fill ip address
    axios.get(' http://192.168.1.111:3000/users/' + vncode).then(res => { 
      // Axios 1
      dataAll = res.data[0]
      var queue = res.data[0].main_dep_queue - 1
      alert("รออีก "+queue+" คิว");
      this.setState({
        dataAll: res.data[0],
        dep_queue: queue
      })
      console.log(this.state.dataAll)

      // not have server but fill ip address
      axios.get(' http://192.168.1.111:3000/main_dep/' + res.data[0].main_dep).then(res => {
        // Axios 2 (inside axios 1)
        main_dep = res.data[0]
        this.setState({
          main_dep: res.data[0]
        })
        console.log(this.state.main_dep)
      
        // sent value dataAll,main_dep,queue to  /src/components/ListItem/ListItem.js 
        if (dataAll !== undefined) {
          this.props.navigation.navigate('ListItem',{ dataAll,main_dep,queue })
        }
      })
    })
  };
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 3,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 2,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 2,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});