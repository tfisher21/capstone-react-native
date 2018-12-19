import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { MapView } from "expo";
import axios from "axios";

const Marker = MapView.Marker;
const YELP_API_KEY =
  "zbHmCS0Yv2hlMbzZPOGvLEPGAgurBKpiD7liFWJB3BSavH9HMN0Ge2yNW1IzaydR9TUJiQBlrD-BjL2dEEDqEnZmloe9z3PMtn_wYy10GvdxmpBX4arn9gZniOQWXHYx";

class CoffeeInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {
        latitude: 41.8825,
        longitude: -87.6233
      },
      coffeeBusinesses: []
    };
  }

  static navigationOptions = {
    title: "Coffee Meeting",
    headerBackTitleStyle: {
      color: "#ff9800"
    }
  };

  componentWillMount() {
    this.findCoffee();
  }

  findCoffee() {
    const baseRequest =
      "https://api.yelp.com/v3/businesses/search?limit=5&price=1,2&categories=coffee,All&sort_by=distance&";
    let latLngRequest =
      "latitude=" +
      this.state.coordinates.latitude +
      "&longitude=" +
      this.state.coordinates.longitude;
    let fullRequest = baseRequest + latLngRequest;
    axios
      .get(fullRequest, {
        headers: { Authorization: "Bearer " + YELP_API_KEY }
      })
      .then(response => {
        const coffeeBusiness = response.data.businesses.map(business => {
          return business;
        });
        this.setState({ coffeeBusinesses: coffeeBusiness });
        // console.log(coffeeBusiness);
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCoffee() {
    return this.state.coffeeBusinesses.map((place, i) => (
      <Marker key={i} coordinate={place.coordinates} />
    ));
  }

  setMeeting(name, address) {
    const params = {
      name: name,
      address: address
    };
    axios
      .post("http://capstone.tyler.fish/api/sms/send", params)
      .catch(error => {
        console.log(error);
      });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <MapView
          provider="google"
          style={{
            maxHeight: "50%",
            minHeight: "50%"
          }}
          initialRegion={{
            latitude: 41.8825,
            longitude: -87.6233,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          onPress={e => {
            this.setState({ coordinates: e.nativeEvent.coordinate });
            this.findCoffee();
          }}
        >
          <Marker
            coordinate={this.state.coordinates}
            title="Your Location"
            pinColor="blue"
          />
          {this.renderCoffee()}
        </MapView>
        <ScrollView>
          <Text style={{ marginLeft: 2, color: "#9e9e9e" }} h4>
            {"Where do you want to grab "}
            <Text style={{ color: "#ff9800" }}>Coffee?</Text>
          </Text>
          {this.state.coffeeBusinesses.map((l, i) => {
            return (
              <ListItem
                key={i}
                title={l.name}
                titleStyle={{ color: "#ef6c00" }}
                subtitle={l.location.address1}
                subtitleStyle={{ color: "#424242" }}
                chevron
                bottomDivider
                onPress={() => {
                  this.setMeeting(l.name, l.location.address1);
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(CoffeeInvite);
