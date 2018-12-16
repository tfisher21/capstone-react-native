import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { MapView } from "expo";

const Marker = MapView.Marker;

export default class CoffeeInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 41.8825,
      longitude: -87.6233
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <MapView
          style={{
            maxHeight: "50%",
            minHeight: "50%"
          }}
          initialRegion={{
            latitude: 41.8781,
            longitude: -87.6298,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onPress={e => {
            this.setState({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
            console.log(this.state);
          }}
        />
        <Text>Testing</Text>
      </View>
    );
  }
}

/*
onPress={() => {
  this.coffeeInvite();
}}
*/
