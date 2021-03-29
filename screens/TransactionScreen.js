import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }
  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: "clicked",
      scanned: false,
    });
  };
  handleBarCodeScanner = ({ type, data }) => {
    this.setState({ scanned: true, scannedData: data, buttonState: "normal" });
  };
  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const buttonState = this.state.buttonState;
    const scanned = this.state.scanned;
    if (buttonState === "clicked" && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>
            hasCameraPermission===true?this.state.scannedData:"request for
            camera permission"
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermissions}
          >
            <Text style={styles.buttonText}> Scan QR code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
  scanButton: {
    backgroundColor: "#572",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },
});
