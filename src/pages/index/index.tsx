"use client";

import { View, Text, Input, Button, Map, Switch } from "@tarojs/components";
import { useState } from "react";
import {
  Home,
  Menu,
  User,
  VolumeX,
  Phone,
  MessageCircle,
  MapPin,
  Info,
  Camera,
  HelpCircle,
  ShoppingCart,
} from "lucide-react";
import mapMarkerIcon from "../../assets/images/map-marker.png";

export default function Index() {
  const [licensePlate, setLicensePlate] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [useWheel, setUseWheel] = useState(false);

  return (
    <View className="min-h-screen bg-gray-100">
      {/* Header */}
      <View className="flex items-center justify-between p-5 bg-white">
        <View className="home-icon">
          <Home size={24} />
        </View>
        <Text className="text-xl font-bold">SpeedAid</Text>
        <View className="flex gap-4">
          <Menu size={24} />
          <User size={24} />
        </View>
      </View>

      {/* Sound/Status Bar */}
      <View className="flex items-center gap-2 p-3 bg-lime-200">
        <VolumeX size={20} />
        <Text>SpeedAid平台建议</Text>
      </View>

      {/* Map Section */}
      <View className="relative h-80">
        <Map
          className="w-full h-full"
          style={{ width: "100%", height: "300px" }}
          longitude={-79.3832}
          latitude={43.6532}
          markers={[
            {
              id: 1,
              latitude: 43.6532,
              longitude: -79.3832,
              width: 30,
              height: 30,
              iconPath: mapMarkerIcon,
            },
          ]}
          onError={(e) => {
            console.log(e);
          }}
        />
        {/* <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white p-3 rounded text-center">
          <Text className="text-sm">
            33 Burbank Dr, Toronto, ON M2K 1N1, Canada
          </Text>
          <Text className="text-xs mt-1">(距离：20.324km)</Text>
        </View> */}
      </View>

      {/* Contact Buttons */}
      <View className="fixed right-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        <Button className="flex flex-col items-center bg-white rounded-lg p-3 shadow">
          <Phone size={24} color="#4B0082" />
          <Text className="text-xs mt-1">电话</Text>
        </Button>
        <Button className="flex flex-col items-center bg-white rounded-lg p-3 shadow">
          <MessageCircle size={24} color="#4B0082" />
          <Text className="text-xs mt-1">资询</Text>
        </Button>
      </View>

      {/* Location Details */}
      <View className="bg-white p-4 mt-4">
        <View className="flex items-center gap-2">
          <MapPin size={24} color="#FF0000" />
          <Text className="font-bold">故障地点</Text>
        </View>
        <Text className="mt-2">33 Burbank Dr, Toronto, ON M2K 1N1, Canada</Text>
      </View>

      {/* Action Buttons */}
      <View className="grid grid-cols-3 gap-px mt-4">
        <Button className="py-4 bg-indigo-900 text-white">交通意外</Button>
        <Button className="py-4 bg-white">搭电</Button>
        <Button className="py-4 bg-white">脱困</Button>
      </View>

      {/* Form Section */}
      <View className="bg-white p-5 mt-4">
        <View className="flex items-center gap-2 text-gray-600 mb-5">
          <Info size={20} color="#666" />
          <Text className="text-sm">
            适用场景：车辆无法行驶,需要拖动到维修厂或其他位置。
          </Text>
        </View>

        <View className="mb-5">
          <View className="flex items-center gap-2">
            <MapPin size={24} color="#00FF00" />
            <Text className="font-bold">拖车目的地</Text>
          </View>
          <Text className="mt-2">
            18 Laidlaw Blvd Unit 1, Markham, ON L3P 1W7
          </Text>
        </View>

        {/* License Plate Input */}
        <View className="mb-5">
          <Text className="text-red-500 mr-1">*</Text>
          <Text>车牌号码：</Text>
          <View className="flex gap-1 mt-2">
            {licensePlate.map((value, index) => (
              <Input
                key={index}
                className="w-10 h-10 border border-gray-300 text-center text-lg"
                value={value}
                maxlength={1}
                onInput={(e) => {
                  const newPlate = [...licensePlate];
                  newPlate[index] = e.detail.value;
                  setLicensePlate(newPlate);
                }}
              />
            ))}
          </View>
          <Text className="text-indigo-900 mt-2">来自我的</Text>
        </View>

        {/* Customer Info */}
        <View className="mb-5">
          <View className="mb-3">
            <Text className="text-red-500 mr-1">*</Text>
            <Text>客户姓名：</Text>
            <Input
              className="border-b border-gray-300 py-1 w-full mt-1"
              placeholder="请输入姓名"
            />
          </View>
          <View>
            <Text className="text-red-500 mr-1">*</Text>
            <Text>联系电话：</Text>
            <Input
              className="border-b border-gray-300 py-1 w-full mt-1"
              placeholder="请输入联系电话"
            />
          </View>
        </View>

        {/* Photo Upload */}
        <View className="mb-5">
          <Text>现场拍照：</Text>
          <View className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center mt-2">
            <Camera size={40} color="#999" />
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
            <HelpCircle size={20} color="#999" />
            <Text className="text-lime-500 text-xl font-bold">C$201.30</Text>
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <Button className="w-11/12 mx-auto mt-5 bg-indigo-900 text-white py-4 rounded">
        申请服务
      </Button>
      <Text className="text-center text-xs text-gray-600 mt-3 mb-20">
        申请服务，即表示已阅读并同意《SpeedAid服务协议》
      </Text>

      {/* Bottom Navigation */}
      <View className="fixed bottom-0 left-0 right-0 grid grid-cols-4 bg-white py-3 border-t border-gray-200">
        <View className="flex flex-col items-center text-indigo-900">
          <HelpCircle size={24} color="#4B0082" />
          <Text className="text-xs mt-1">救援</Text>
        </View>
        <View className="flex flex-col items-center text-gray-600">
          <Menu size={24} color="#999" />
          <Text className="text-xs mt-1">服务</Text>
        </View>
        <View className="flex flex-col items-center text-gray-600">
          <ShoppingCart size={24} color="#999" />
          <Text className="text-xs mt-1">订单</Text>
        </View>
        <View className="flex flex-col items-center text-gray-600">
          <User size={24} color="#999" />
          <Text className="text-xs mt-1">我的</Text>
        </View>
      </View>
    </View>
  );
}
