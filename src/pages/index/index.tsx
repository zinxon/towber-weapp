"use client";

import { View, Text, Input, Button, Map, Switch } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtIcon } from "taro-ui";
import mapMarkerIcon from "../../assets/images/map-marker.png";
import Taro from "@tarojs/taro";
import { reverseGeocode } from "../../utils/geocoder";

export default function Index() {
  const [licensePlate, setLicensePlate] = useState("");
  const [useWheel, setUseWheel] = useState(false);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("27 Harlech Court");
  const [selectedService, setSelectedService] = useState<
    "accident" | "battery" | "stuck" | null
  >("accident");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([
    {
      id: 1,
      latitude: 0,
      longitude: 0,
      width: 30,
      height: 30,
      iconPath: mapMarkerIcon,
    },
  ]);

  // Add state for customer info
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const res = await Taro.getLocation({
        type: "gcj02",
        isHighAccuracy: true,
        highAccuracyExpireTime: 3000,
      });

      setLatitude(res.latitude);
      setLongitude(res.longitude);

      const newMarker = {
        id: 1,
        latitude: res.latitude,
        longitude: res.longitude,
        width: 30,
        height: 30,
        iconPath: mapMarkerIcon,
      };
      setMarkers([newMarker]);

      // Get address using Mapbox Geocoding API
      const address = await reverseGeocode(res.latitude, res.longitude);
      // console.log("address", address);
      // Taro.showToast({
      //   title: `address: ${address}`,
      //   icon: "none",
      // });
      if (address) {
        setLocation(address);
      } else {
        // Fallback to coordinates if geocoding fails
        setLocation(`${res.latitude.toFixed(6)}, ${res.longitude.toFixed(6)}`);
      }
    } catch (err) {
      console.error("Failed to get location:", err);
      Taro.showToast({
        title: "获取位置失败",
        icon: "none",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Check required fields
    if (!licensePlate) {
      Taro.showToast({
        title: "请输入车牌号码",
        icon: "none",
      });
      return;
    }

    if (!customerName) {
      Taro.showToast({
        title: "请输入客户姓名",
        icon: "none",
      });
      return;
    }

    if (!phoneNumber) {
      Taro.showToast({
        title: "请输入联系电话",
        icon: "none",
      });
      return;
    }

    // Form data object
    const formData = {
      location,
      destination,
      licensePlate,
      customerName,
      phoneNumber,
      useWheel,
      selectedService,
      latitude,
      longitude,
    };

    try {
      const response = await Taro.request({
        url: "https://towber-api.shingsonz.workers.dev/api/orders",
        method: "POST",
        data: formData,
        header: {
          "Content-Type": "application/json",
        },
      });

      if (response.statusCode === 200 || response.statusCode === 201) {
        console.log("Form submitted successfully:", response.data);
        Taro.showToast({
          title: "提交成功",
          icon: "success",
        });
      } else {
        console.error("Submission failed:", response.data);
        Taro.showToast({
          title: "提交失败，请重试",
          icon: "none",
        });
      }
    } catch (error) {
      // Parse the error object for meaningful messages
      let errorMessage = "提交失败，请检查网络"; // Default error message

      if (error && typeof error === "object") {
        if (error.message) {
          errorMessage = `提交失败: ${error.message}`;
        } else if (error.errMsg) {
          errorMessage = `提交失败: ${error.errMsg}`;
        }
      }
      console.error("Error submitting form:", error);
      Taro.showToast({
        title: errorMessage,
        icon: "none",
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header - Modern gradient */}
      <View className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <View className="p-2">
          <AtIcon value="home" size={24} color="#FFFFFF" />
        </View>
        <Text className="text-xl font-bold text-white">Towber 拖吧</Text>
        <View className="flex gap-6 p-2">
          <AtIcon value="menu" size={24} color="#FFFFFF" />
          <AtIcon value="user" size={24} color="#FFFFFF" />
        </View>
      </View>

      {/* Status Bar - Gradient accent */}
      <View className="flex items-center px-4 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-indigo-100">
        <AtIcon
          value="volume-plus"
          size={20}
          color="#4F46E5"
          className="flex-shrink-0 mr-2"
        />
        <View className="overflow-hidden relative flex-1">
          <Text className="sliding-text text-sm text-indigo-700 font-medium">
            Towber 拖吧平台 -
            大多伦多地区最大华人拖车团队，精通国粤双语，提供24小时拖车服务
          </Text>
        </View>
      </View>

      {/* Map Section - Added border and shadow */}
      <View className="relative h-80 border-b border-gray-200 shadow-inner">
        {isLoading ? (
          <View className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <Text className="text-gray-500">定位中...</Text>
          </View>
        ) : (
          <Map
            className="w-full h-full"
            longitude={longitude}
            latitude={latitude}
            markers={markers}
            scale={14}
            showLocation
            onError={(e) => {
              console.log(e);
              Taro.showToast({
                title: "地图加载失败",
                icon: "none",
              });
            }}
          />
        )}
      </View>

      {/* Contact Buttons - Glass morphism effect */}
      <View className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
        <Button className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all">
          <AtIcon value="phone" size={24} color="#4F46E5" />
          <Text className="text-xs mt-1 text-indigo-700 font-medium">电话</Text>
        </Button>
        <Button className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all">
          <AtIcon value="message" size={24} color="#4F46E5" />
          <Text className="text-xs mt-1 text-indigo-700 font-medium">资询</Text>
        </Button>
      </View>

      {/* Location Details - Better spacing and input styling */}
      <View className="bg-white p-4 mt-2 shadow-sm">
        <View className="flex items-center gap-3 mb-2">
          <AtIcon value="map-pin" size={24} color="#FF0000" />
          <Text className="font-bold text-gray-800">故障地点</Text>
        </View>
        <Input
          className="mt-1 w-full border-b border-gray-300 py-3 text-base focus:border-indigo-500"
          placeholder="请输入故障地点"
          value={location}
          onInput={(e) => {
            setLocation(e.detail.value);
          }}
        />
      </View>

      {/* Action Buttons - Gradient states */}
      <View className="flex mt-2 shadow-sm rounded-lg overflow-hidden">
        <Button
          className={`py-3 flex-1 text-sm font-medium transition-all ${
            selectedService === "accident"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              : "bg-white text-gray-700 hover:bg-indigo-50"
          }`}
          onClick={() => setSelectedService("accident")}
        >
          交通意外
        </Button>
        <Button
          className={`py-3 flex-1 text-sm font-medium transition-all ${
            selectedService === "battery"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              : "bg-white text-gray-700 hover:bg-indigo-50"
          }`}
          onClick={() => setSelectedService("battery")}
        >
          搭电
        </Button>
        <Button
          className={`py-3 flex-1 text-sm font-medium transition-all ${
            selectedService === "stuck"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              : "bg-white text-gray-700 hover:bg-indigo-50"
          }`}
          onClick={() => setSelectedService("stuck")}
        >
          脱困
        </Button>
      </View>

      {/* Form Section - Improved spacing and visual hierarchy */}
      <View className="bg-white p-5 mt-2">
        {/* Form Section - Description */}
        <View className="flex items-center gap-2 text-gray-600 mb-6 bg-gray-50 px-4 py-2 rounded-md">
          <AtIcon value="alert-circle" size={20} color="#4B0082" />
          <Text className="text-sm text-gray-600 truncate">
            适用场景：车辆无法行驶,需要拖动到维修厂
          </Text>
        </View>

        {/* Destination Input */}
        <View className="mb-5">
          <View className="flex items-center gap-2">
            <AtIcon value="map-pin" size={24} color="#00FF00" />
            <Text className="font-bold">拖车目的地</Text>
          </View>
          <Input
            className="mt-2 w-full border-b border-gray-300 py-2"
            placeholder="请输入目的地"
            value={destination}
            onInput={(e) => {
              setDestination(e.detail.value);
            }}
          />
        </View>

        {/* License Plate Input */}
        <View className="mb-5">
          <View className="flex items-center">
            <Text className="text-red-500 mr-1">*</Text>
            <Text>车牌号码：</Text>
          </View>
          <Input
            className="mt-2 w-full border-b border-gray-300 py-2"
            placeholder="请输入车牌号码"
            maxlength={8}
            onInput={(e) => {
              setLicensePlate(e.detail.value);
            }}
            value={licensePlate}
          />
        </View>

        {/* Customer Info */}
        <View className="mb-5">
          <View className="mb-3">
            <View className="flex items-center">
              <Text className="text-red-500 mr-1">*</Text>
              <Text>客户姓名：</Text>
            </View>
            <Input
              className="mt-2 w-full border-b border-gray-300 py-2"
              placeholder="请输入姓名"
              value={customerName}
              onInput={(e) => setCustomerName(e.detail.value)}
            />
          </View>
          <View>
            <View className="flex items-center">
              <Text className="text-red-500 mr-1">*</Text>
              <Text>联系电话：</Text>
            </View>
            <Input
              className="mt-2 w-full border-b border-gray-300 py-2"
              placeholder="请输入联系电话"
              value={phoneNumber}
              onInput={(e) => setPhoneNumber(e.detail.value)}
            />
          </View>
        </View>

        {/* Photo Upload */}
        <View className="mb-5">
          <Text>现场拍照：</Text>
          <View className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center mt-2">
            <AtIcon value="camera" size={40} color="#999" />
          </View>
        </View>

        {/* Wheel Usage */}
        <View className="flex items-center gap-5 mb-5">
          <Text>使用辅轮：</Text>
          <Switch checked={useWheel} onChange={() => setUseWheel(!useWheel)} />
        </View>

        {/* Estimated Cost */}
        <View className="flex items-center gap-2 mb-5">
          <Text>预估费用：</Text>
          <View className="flex items-center gap-1">
            <AtIcon value="help" size={20} color="#999" />
            <Text className="text-lime-500 text-xl font-bold">C$201.30</Text>
          </View>
        </View>

        {/* Submit Button - Gradient style */}
        <View className="pb-20 px-4">
          <View className="flex flex-col items-center">
            <Button
              className="w-full max-w-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-full font-medium shadow-md hover:opacity-90 transition-all text-sm"
              hoverClass="opacity-80"
              onClick={handleSubmit}
            >
              申请服务
            </Button>
            <Text className="text-center text-xs text-gray-500 mt-4">
              申请服务，即表示已阅读并同意
              <Text className="text-indigo-900">《Towber拖吧服务协议》</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Navigation - Glass morphism */}
      <View className="fixed bottom-0 left-0 right-0 grid grid-cols-4 bg-white/80 backdrop-blur-sm py-3 border-t border-indigo-100 shadow-lg z-10">
        <View className="flex flex-col items-center text-indigo-700">
          <AtIcon value="lightning-bolt" size={24} color="#4F46E5" />
          <Text className="text-xs mt-1 font-medium">救援</Text>
        </View>
        <View className="flex flex-col items-center text-gray-600">
          <AtIcon value="menu" size={24} color="#999" />
          <Text className="text-xs mt-1">服务</Text>
        </View>
        <View className="flex flex-col items-center text-gray-600">
          <AtIcon value="folder" size={24} color="#999" />
          <Text className="text-xs mt-1">订单</Text>
        </View>
        <View className="flex flex-col items-center text-gray-600">
          <AtIcon value="user" size={24} color="#999" />
          <Text className="text-xs mt-1">我的</Text>
        </View>
      </View>
    </View>
  );
}
