import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import React from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { ScrollView } from "react-native-virtualized-view";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-4`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://download.logo.wine/logo/Uber/Uber-Logo.wine.png",
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Where from?"
          styles={{
            container: { flex: 0 },
            textInput: { fontSize: 18 },
          }}
          query={{
            key: process.env.GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          returnKeyType={"Search"}
        />

        <NavOptions />

        <NavFavourites />
      </View>

      {/* <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE} // Use Google Maps for Android
          initialRegion={{
            latitude: 14.5995, // Manila latitude
            longitude: 120.9842, // Manila longitude
            latitudeDelta: 0.1, // Adjust the zoom level as needed
            longitudeDelta: 0.1, // Adjust the zoom level as needed
          }}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
});
