import React from "react";
import { View, Text, Switch, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

export default class TestRequest extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    state = {
        phoneNo: "",
        aadharNo: "",
        switchValue: false,
        cough: false,
        fever: false,
        rnose: false,
        breath: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            region: null,
        }
        this.submitSymptoms()
    }

    _toggleShow = () => {
        this.setState({ showSymptoms: !this.state.showSymptoms })
    }


    submitSymptoms() {
        let data = {}
        data.mobile = this.state.phoneNo
        data.aadhar = this.state.aadharNo
        data._isSymptomatic = this.state.switchValue
        data.cough = this.state.cough
        data.fever = this.state.fever
        data.runny_nose = this.state.rnose
        data.hard_breath = this.state.breath
        data.location = this.state.region

        console.log(JSON.stringify(data))
        var url = 'http://localhost/unCOVID/request.php'
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                }
                this.setState({ region: region })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={phoneNo => this.setState({ phoneNo })}
                            value={this.state.phoneNo}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Aadhar Number</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={aadharNo => this.setState({ aadharNo })}
                            value={this.state.aadharNo}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32, flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ marginRight: 10, fontSize: 10, color: "#8A8F9E", textTransform: "uppercase" }}>Do You Have Symptoms? </Text>
                        <Switch
                            value={this.state.switchValue}
                            onValueChange={(switchValue) => {
                                this.setState({ switchValue })
                                this._toggleShow()
                            }} />
                    </View>
                    {this.state.showSymptoms &&
                        <View style={{ marginTop: 12 }}>

                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={{ marginRight: 10, fontSize: 10, color: "#8A8F9E", textTransform: "uppercase" }}>Difficulty Breathing</Text>
                                <CheckBox
                                    checked={this.state.breath}
                                    onPress={() => this.setState({ breath: !this.state.breath })}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={{ marginRight: 10, fontSize: 10, color: "#8A8F9E", textTransform: "uppercase" }}>Cough</Text>
                                <CheckBox
                                    checked={this.state.cough}
                                    onPress={() => this.setState({ cough: !this.state.cough })}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={{ marginRight: 10, fontSize: 10, color: "#8A8F9E", textTransform: "uppercase" }}>fever</Text>
                                <CheckBox
                                    checked={this.state.fever}
                                    onPress={() => this.setState({ fever: !this.state.fever })}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={{ marginRight: 10, fontSize: 10, color: "#8A8F9E", textTransform: "uppercase" }}>Runny Nose</Text>
                                <CheckBox
                                    checked={this.state.rnose}
                                    onPress={() => this.setState({ rnose: !this.state.rnose })}
                                />
                            </View>

                        </View>
                    }

                    <TouchableOpacity style={styles.button} onPress={() => this.submitSymptoms()}>
                        <Text style={{ color: "#FFF", fontWeight: "500" }}>Submit Test Request</Text>
                    </TouchableOpacity>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        top: 32,
        marginHorizontal: 30,
        backgroundColor: "#6f78f7",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});
