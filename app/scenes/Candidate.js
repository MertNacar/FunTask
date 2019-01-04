import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity,AsyncStorage } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import { Actions } from "react-native-router-flux";
import Geocoder from 'react-native-geocoding';
import * as con from '../config/config'
import * as uti from '../utils/Utils'


/*
  API usage :  https://playground-test-api.herokuapp.com/api/candidate/:id
*/

export default class Candidate extends Component {
  GetData(){
    Geocoder.init('API KEY HERE and Androidmanifest.xml Api key need'); 

    Geocoder.from(41.89, 12.49)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
			console.log(addressComponent);
		})
		.catch(error => console.warn(error));
  }
  

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({
      type: 'establishment',
      country: 'CA',
      latitude: 53.544389,
      longitude: -113.490927,
      radius: 10
    })
    .then((place) => {
        console.log(place);
        
    })
    .catch(error => console.log(error.message));  
  }

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      fullName: ''
    };
  }
 
  _onPress() {
    uti.FetchData(con.HOST_URL.GET_URL+"ID").then(res => {
      AsyncStorage.getItem("fullName")
      this.setState({
        fullName : res.candidate.fullName
      })
    })
    Alert.alert(
      'My Informations',
      this.props.token,
      this.state.fullName
    
    )
  }
  
  render() {  
    return (
      <View style={styles.container}>
        <Text styles={styles.welcome}>Welcome</Text>   
        <Text styles={styles.welcome}>{this.state.fullName} </Text>
        <TouchableOpacity onPress={() => this._onPress()} style={styles.actionButton}>
          <Text style={styles.actionText}>Get My Informations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => this.GetData()}
        >
          <Text style={styles.actionText}>Pick a Place </Text>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  actionButton: {
    borderWidth: 1,
    overflow: "hidden",
    marginTop: "3%",
    backgroundColor: "white",
    width: "80%", height: "6%",
    borderRadius: 20,
    borderColor: "#4286f4",
    marginBottom: 10
  },
  actionText: {
    marginTop: 3,
    textAlign: "center",
    alignContent: 'center',
    fontSize: 20,
    color: "#4286f4",
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
