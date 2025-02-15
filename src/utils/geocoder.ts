import Taro from "@tarojs/taro";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoic2hpbmdzb256IiwiYSI6ImNtNnp4anNsdTA5NHgydnBxamVwcnYxNzQifQ.K9u-AwxLnhyTLzIX7pyHOg";

export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  try {
    // Construct URL with query parameters
    const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${MAPBOX_ACCESS_TOKEN}&language=en`;

    const response = await Taro.request({
      url,
      method: "GET",
      enableHttp2: true, // Enable HTTP/2 for better performance
      enableQuic: true, // Enable QUIC if available
      timeout: 10000, // Set timeout to 10 seconds
    });

    console.log("Geocoding response:", response);

    if (
      response.statusCode === 200 &&
      response.data.features &&
      response.data.features.length > 0
    ) {
      const feature = response.data.features[0];
      const address = feature.properties.full_address;
      console.log("Found address:", address);
      return address;
    }

    console.log("No address found in response:", response.data);
    return null;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    return null;
  }
};
