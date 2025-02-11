"use client";

import { View, Text, Input, Button, Map, Switch } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtIcon } from "taro-ui";
import mapMarkerIcon from "../../assets/images/map-marker.png";
import Taro from "@tarojs/taro";

export default function Index() {
  const [licensePlate, setLicensePlate] = useState("");
  const [useWheel, setUseWheel] = useState(false);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedService, setSelectedService] = useState<
    "accident" | "battery" | "stuck" | null
  >("accident");
  const [latitude, setLatitude] = useState(43.6532);
  const [longitude, setLongitude] = useState(-79.3832);
  const [markers, setMarkers] = useState([
    {
      id: 1,
      latitude: 43.6532,
      longitude: -79.3832,
      width: 30,
      height: 30,
      iconPath: mapMarkerIcon,
    },
  ]);

  const getCurrentLocation = async () => {
    try {
      const res = await Taro.getLocation({
        type: "gcj02",
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
    } catch (err) {
      console.error("Failed to get location:", err);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View className="min-h-screen bg-gray-100">
      {/* Header - Refined with better spacing and shadow */}
      <View className="flex items-center justify-between p-4 bg-white shadow-sm">
        <View className="p-2">
          <AtIcon value="home" size={24} color="#4B0082" />
        </View>
        <Text className="text-xl font-bold text-indigo-900">Towber 拖吧</Text>
        <View className="flex gap-6 p-2">
          <AtIcon value="menu" size={24} color="#4B0082" />
          <AtIcon value="user" size={24} color="#4B0082" />
        </View>
      </View>

      {/* Status Bar - Better contrast and padding */}
      <View className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border-b border-indigo-100">
        <AtIcon value="volume-off" size={20} color="#4B0082" />
        <Text className="text-sm text-indigo-900">Towber 拖吧平台建议</Text>
      </View>

      {/* Map Section - Added border and shadow */}
      <View className="relative h-80 border-b border-gray-200 shadow-inner">
        <Map
          className="w-full h-full"
          longitude={longitude}
          latitude={latitude}
          markers={markers}
          onError={(e) => {
            console.log(e);
          }}
        />
      </View>

      {/* Contact Buttons - Improved visibility */}
      <View className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
        <Button className="flex flex-col items-center bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow">
          <AtIcon value="phone" size={24} color="#4B0082" />
          <Text className="text-xs mt-1 text-indigo-900">电话</Text>
        </Button>
        <Button className="flex flex-col items-center bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow">
          <AtIcon value="message" size={24} color="#4B0082" />
          <Text className="text-xs mt-1 text-indigo-900">资询</Text>
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
          onInput={(e) => {
            setLocation(e.detail.value);
          }}
        />
      </View>

      {/* Action Buttons - Improved spacing and transitions */}
      <View className="flex mt-2 shadow-sm">
        <Button
          className={`py-3 flex-1 text-sm font-medium transition-colors ${
            selectedService === "accident"
              ? "bg-indigo-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedService("accident")}
        >
          交通意外
        </Button>
        <Button
          className={`py-3 flex-1 text-sm font-medium transition-colors ${
            selectedService === "battery"
              ? "bg-indigo-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedService("battery")}
        >
          搭电
        </Button>
        <Button
          className={`py-3 flex-1 text-sm font-medium transition-colors ${
            selectedService === "stuck"
              ? "bg-indigo-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
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

        {/* Submit Button and Agreement Text - Added padding bottom */}
        <View className="pb-20 px-4">
          <View className="flex flex-col items-center">
            <Button
              className="w-full max-w-sm bg-indigo-900 text-white py-2.5 rounded-full font-medium shadow-md hover:bg-indigo-800 transition-colors text-sm"
              hoverClass="opacity-90"
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

      {/* Bottom Navigation - Fixed position with proper spacing */}
      <View className="fixed bottom-0 left-0 right-0 grid grid-cols-4 bg-white py-3 border-t border-gray-200 shadow-lg z-10">
        <View className="flex flex-col items-center text-indigo-900">
          <AtIcon value="help" size={24} color="#4B0082" />
          <Text className="text-xs mt-1 font-medium">救援</Text>
        </View>
        <View className="flex flex-col items-center text-gray-600">
          <AtIcon value="menu" size={24} color="#999" />
          <Text className="text-xs mt-1">服务</Text>
        </View>
        <View className="flex flex-col items-center text-gray-600">
          <AtIcon value="shopping-cart" size={24} color="#999" />
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
