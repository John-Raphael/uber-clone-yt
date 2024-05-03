import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import RideOptionsCard from "./RideOptionsCard";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning John</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={styles}
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={200}
            enablePoweredByContainer={false}
            minLength={2}
            returnKeyType={"Search"}
            query={{
              key: process.env.GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              if (details && details.description) {
                dispatch(
                  setDestination({
                    location: details.description, // Assuming description contains the location
                    description: data.description,
                  })
                );
                navigation.navigate("RideOptionsCard");
              } else {
                console.error("Invalid details object:", details);
              }
            }}
          />
        </View>
        <NavFavourites />
      </View>

      <View
        style={tw`flex flex-row justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row w-24 px-4 py-3 rounded-full bg-gray-200 justify-between`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 1,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
