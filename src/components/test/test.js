import * as React from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class test extends React.Component {

    static navigationOptions = {
        title: 'Scan QR Code',
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
        },

    };

    state = {
        hasCameraPermission: null,
        scanned: false,
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

                {scanned && (
                    <Button
                        title={'Tap to Scan Again'}
                        onPress={() => this.setState({ scanned: false })}
                    />
                )}
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        console.log(data)

        //javascript substring() , substr() #HN
        var hn = data.substr(27, 9);
        console.log(hn)

        //javascript substring() , substr() #MAIN_DEP
        var depcode = data.substr(37, 3)
        console.log(depcode)

        if (data !== undefined) {
            this.props.navigation.navigate('ListItem', { hn, depcode })
        }

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