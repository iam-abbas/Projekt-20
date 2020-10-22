import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import * as firebase from "firebase";
import MapView from "react-native-maps"
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props)
        this.state = {
            region: null,
        }
    }




    state = {
        email: "",
        displayName: ""
    };


    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });

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

    signOutUser = () => {
        firebase.auth().signOut();
    };



    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    showsCompass={true}
                    rotateEnabled={false}
                    style={styles.mapStyle}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Test")}>
                    <Text style={{ color: "#FFF", marginRight: '5%', fontWeight: "500" }}>Request a Test</Text>
                    <Ionicons name="ios-flask" size={30} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    button: {
        position: 'absolute',
        top: '85%',
        zIndex: 9,
        marginHorizontal: 30,
        backgroundColor: "#6175ff",
        borderRadius: 4,
        height: 52,
        width: 260,
        alignItems: "center",
        shadowColor: "#1f1f1f",
        flexDirection: 'row',
        elevation: 7,
        shadowRadius: 10,
        shadowOpacity: 0.40,
        shadowOffset: {width: 0, height: 2},
        justifyContent: "center"
    }
});
