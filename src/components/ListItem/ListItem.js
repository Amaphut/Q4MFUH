import React, { Component } from 'react';
import { Platform, StyleSheet, View, Button, Text, Image, TouchableOpacity } from 'react-native'; 'react-native';

export default class ListItem extends Component {

  // ===========================Header=============================================
  static navigationOptions = {
    title: 'คิวของคุณ',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#0091FF',
    fontFamily: 'Prompt-Regular',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  };

  constructor(props) {
    super(props);
    this.state = {
      dataAll: [],
      main_dep: [],
      queue:[]
    };
  }

  async componentDidMount() {

    //===========================Get value {dataAll,main_dep,queue} from ScanScreen.js ======================
    let dataAll = this.props.navigation.state.params.dataAll;
    let main_dep = this.props.navigation.state.params.main_dep;
    let queue = this.props.navigation.state.params.queue;
    // console.log(dataAll)
    // console.log(main_dep.department)
    console.log(queue)
    this.setState({
      dataAll:dataAll,
      main_dep:main_dep,
      queue:queue
    })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '25%'
      }}>
        <View style={styles.container}>
          <View style={{ flex: 1.5, flexDirection: 'row' }}>
            {/* //============================mfulogo====================================== */}
            <View style={{ flex: 0.16, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../../../assets/mfulogo.png')} style={{ width: "80%", height: "90%" }} />
            </View>

            <View style={{ flex: 0.84, flexDirection: 'column', backgroundColor: 'Green' }}>
              {/* //==========================โรงพยาบาลมหาวิทยาลัยแม่ฟ้าหลวง================= */}
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  minimumFontScale={0.01}
                  style={{ fontFamily: "Prompt-Regular", fontSize: 17, color: '#0091FF' }}>
                  โรงพยาบาลมหาวิทยาลัยแม่ฟ้าหลวง
                  </Text>
              </View>
              {/* //==========================Mae Fah Luang University Hospital================ */}
              <View style={{ flex: 1, borderTopColor: '#0091FF', borderTopWidth: 2, justifyContent: 'flex-start' }}>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  minimumFontScale={0.01}
                  style={{ fontFamily: "Prompt-Regular", fontSize: 14, color: '#0091FF' }}>
                  Mae Fah Luang University Hospital
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* ================================คิวที่=============================================== */}
            <View style={{
              flex: 1,
              backgroundColor: '#eee',
              alignItems: "center",
              justifyContent: "center",
              borderColor: '#fff',
              borderWidth: 5,
            }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                minimumFontScale={0.01}
                style={{
                  fontFamily: "Prompt-Regular",
                  fontSize: 28,
                  color: 'black'
                }}>คิวที่</Text>
            </View>
            {/* ===================================รออีก============================================== */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#eee',
                alignItems: "center",
                justifyContent: "center",
                borderColor: '#fff',
                borderWidth: 5,
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                minimumFontScale={0.01}
                style={{
                  fontFamily: "Prompt-Regular",
                  fontSize: 28,
                  color: 'red'
                }}>รออีก</Text>
            </View>
          </View>

          <View style={{ flex: 2.5, flexDirection: 'row', backgroundColor: 'steelblue' }}>
            {/* ===================================คิวที่ - ============================================== */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#f6f6f6',
                alignItems: "center",
                justifyContent: "center",
                borderColor: '#fff',
                borderWidth: 5,
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                minimumFontScale={0.01}
                style={{
                  fontFamily: "Prompt-Regular",
                  fontSize: 84,
                  color: 'black'
                }}>{this.state.dataAll.oqueue}</Text>
            </View>
            {/* ==================================รออีก - ============================================== */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#f6f6f6',
                alignItems: "center",
                justifyContent: "center",
                borderColor: '#fff',
                borderWidth: 5,
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                minimumFontScale={0.01}
                style={{
                  fontFamily: "Prompt-Regular",
                  fontSize: 84,
                  color: 'red'
                }}>{this.state.queue}</Text>
            </View>
          </View>

          {/* ==================================วันที่ - เวลา - น. ============================================== */}
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              minimumFontScale={0.01}
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 14,
                color: '#696969'
              }}>วันที่ {this.state.dataAll.vstdate} เวลา {this.state.dataAll.vsttime}</Text>
          </View>
          {/* ==================================จุดรับบริการ: -============================================== */}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              minimumFontScale={0.01}
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 18,
                color: 'black'
              }}>จุดรับบริการ: {this.state.main_dep.department}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '1%',
    paddingBottom: '5%',
    borderRadius: 12,
    shadowRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5, },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: 'white',
  },
});
