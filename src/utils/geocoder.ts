import NodeGeocoder from "node-geocoder";
import Taro from "@tarojs/taro";

// Custom fetch implementation for Taro environment
const customFetch = async (url: string, options: any) => {
  try {
    const response = await Taro.request({
      url,
      method: options.method || "GET",
      data: options.body,
      header: options.headers,
    });
    return {
      json: () => Promise.resolve(response.data),
      ok: response.statusCode >= 200 && response.statusCode < 300,
    };
  } catch (error) {
    throw error;
  }
};

const options = {
  provider: "mapbox",
  apiKey:
    "pk.eyJ1Ijoic2hpbmdzb256IiwiYSI6ImNtNnp4anNsdTA5NHgydnBxamVwcnYxNzQifQ.K9u-AwxLnhyTLzIX7pyHOg",
  //   fetch: customFetch,
  language: "zh", // Set language to Chinese
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  try {
    const results = await geocoder.reverse({ lat: latitude, lon: longitude });

    if (results && results.length > 0) {
      const result = results[0];
      const formattedAddress = [
        result.streetNumber,
        result.streetName,
        result.city,
        result.administrativeLevels?.level1long,
        result.zipcode,
        result.country,
      ]
        .filter(Boolean)
        .join(", ");

      return formattedAddress;
    }
    return null;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    return null;
  }
};
