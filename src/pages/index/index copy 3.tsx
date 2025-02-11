"use client";

import { useState } from "react";
import mapMarkerIcon from "../../assets/images/map-marker.png";
import { View, Text, Input, Button, Map, Switch } from "@tarojs/components";
import {
  Home,
  Menu,
  User,
  Volume2,
  Phone,
  MessageCircle,
  MapPin,
  Info,
  Camera,
  HelpCircle,
  ShoppingCart,
  Battery,
  Zap,
  Car,
  ChevronRight,
  X,
} from "lucide-react";

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
  const [selectedService, setSelectedService] = useState("traffic");

  return (
    <View className="min-h-screen bg-black text-white">
      {/* Header */}
      <View className="flex items-center justify-between p-5 bg-black">
        <View className="home-icon cursor-pointer hover:opacity-75 transition-opacity">
          <Home size={24} color="white" />
        </View>
        <Text className="text-xl font-bold">SpeedAid</Text>
        <View className="flex gap-4">
          <Menu
            size={24}
            color="white"
            className="cursor-pointer hover:opacity-75 transition-opacity"
          />
          <User
            size={24}
            color="white"
            className="cursor-pointer hover:opacity-75 transition-opacity"
          />
        </View>
      </View>

      {/* Sound/Status Bar */}
      <View className="flex items-center justify-between p-3 bg-green-500 text-black">
        <View className="flex items-center gap-2">
          <Volume2 size={20} />
          <Text>SpeedAid平台建议</Text>
        </View>
        <X
          size={20}
          className="cursor-pointer hover:opacity-75 transition-opacity"
        />
      </View>

      {/* Map Section */}
      <View className="relative h-96">
        <Map
          className="w-full h-full"
          // style={{ width: "100%", height: "300px" }}
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
        <View className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg">
          <View className="flex items-center gap-2 mb-2">
            <MapPin size={20} color="#00FF00" />
            <Text className="font-bold">故障地点</Text>
          </View>
          <Text className="text-sm mb-1">
            33 Burbank Dr, Toronto, ON M2K 1N1, Canada
          </Text>
          <Text className="text-xs text-gray-400">(距离：20.324km)</Text>
        </View>
      </View>

      {/* Contact Buttons */}
      <View className="fixed right-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        <Button className="flex flex-col items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <Phone size={24} color="white" />
        </Button>
        <Button className="flex flex-col items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <MessageCircle size={24} color="white" />
        </Button>
      </View>

      {/* Service Selection */}
      <View className="p-4 bg-gray-900">
        <Text className="text-lg font-bold mb-3">选择服务类型</Text>
        <View className="grid grid-cols-3 gap-2">
          <Button
            className={`py-3 rounded-lg flex items-center justify-center gap-2 ${
              selectedService === "traffic"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => setSelectedService("traffic")}
          >
            <Car size={20} />
            <Text>交通意外</Text>
          </Button>
          <Button
            className={`py-3 rounded-lg flex items-center justify-center gap-2 ${
              selectedService === "battery"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => setSelectedService("battery")}
          >
            <Battery size={20} />
            <Text>搭电</Text>
          </Button>
          <Button
            className={`py-3 rounded-lg flex items-center justify-center gap-2 ${
              selectedService === "rescue"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => setSelectedService("rescue")}
          >
            <Zap size={20} />
            <Text>脱困</Text>
          </Button>
        </View>
      </View>

      {/* Form Section */}
      <View className="p-5 bg-gray-900">
        <View className="flex items-center gap-2 text-gray-400 mb-5">
          <Info size={20} />
          <Text className="text-sm">
            适用场景：车辆无法行驶,需要拖动到维修厂或其他位置。
          </Text>
        </View>

        <View className="mb-5">
          <View className="flex items-center gap-2 mb-2">
            <MapPin size={20} color="#00FF00" />
            <Text className="font-bold">拖车目的地</Text>
          </View>
          <Text className="text-sm text-gray-300">
            18 Laidlaw Blvd Unit 1, Markham, ON L3P 1W7
          </Text>
          <View className="flex items-center justify-between mt-2">
            <Text className="text-green-500">更改目的地</Text>
            <ChevronRight size={20} color="#00FF00" />
          </View>
        </View>

        {/* License Plate Input */}
        <View className="mb-5">
          <Text className="text-sm mb-2">
            车牌号码 <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex gap-1">
            {licensePlate.map((value, index) => (
              <Input
                key={index}
                className="w-10 h-10 bg-gray-800 border border-gray-700 text-center text-lg rounded"
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
          <Text className="text-green-500 mt-2 cursor-pointer hover:underline">
            来自我的车辆
          </Text>
        </View>

        {/* Customer Info */}
        <View className="mb-5">
          <View className="mb-3">
            <Text className="text-sm mb-1">
              客户姓名 <Text className="text-red-500">*</Text>
            </Text>
            <Input
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
              placeholder="请输入姓名"
            />
          </View>
          <View>
            <Text className="text-sm mb-1">
              联系电话 <Text className="text-red-500">*</Text>
            </Text>
            <Input
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
              placeholder="请输入联系电话"
            />
          </View>
        </View>

        {/* Photo Upload */}
        <View className="mb-5">
          <Text className="text-sm mb-2">现场拍照</Text>
          <View className="w-24 h-24 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
            <Camera size={40} color="#00FF00" />
          </View>
        </View>

        {/* Wheel Usage */}
        <View className="flex items-center justify-between mb-5">
          <Text className="text-sm">使用辅轮</Text>
          <Switch
            checked={useWheel}
            onChange={() => setUseWheel(!useWheel)}
            className="bg-gray-700"
            color="#00FF00"
          />
        </View>

        {/* Estimated Cost */}
        <View className="flex items-center justify-between mb-5 bg-gray-800 p-3 rounded-lg">
          <Text className="text-sm">预估费用</Text>
          <View className="flex items-center gap-2">
            <Text className="text-green-500 text-xl font-bold">C$201.30</Text>
            <HelpCircle size={20} color="#00FF00" className="cursor-pointer" />
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <Button className="w-11/12 mx-auto mt-5 bg-green-500 text-white py-4 rounded-lg text-lg font-bold hover:bg-green-600 transition-colors">
        申请服务
      </Button>
      <Text className="text-center text-xs text-gray-500 mt-3 mb-20">
        申请服务，即表示已阅读并同意
        <Text className="text-green-500 cursor-pointer hover:underline">
          《SpeedAid服务协议》
        </Text>
      </Text>

      {/* Bottom Navigation */}
      <View className="fixed bottom-0 left-0 right-0 grid grid-cols-4 bg-gray-900 py-3 border-t border-gray-800">
        <View className="flex flex-col items-center text-green-500 cursor-pointer hover:opacity-75 transition-opacity">
          <HelpCircle size={24} />
          <Text className="text-xs mt-1">救援</Text>
        </View>
        <View className="flex flex-col items-center text-gray-500 cursor-pointer hover:opacity-75 transition-opacity">
          <Menu size={24} />
          <Text className="text-xs mt-1">服务</Text>
        </View>
        <View className="flex flex-col items-center text-gray-500 cursor-pointer hover:opacity-75 transition-opacity">
          <ShoppingCart size={24} />
          <Text className="text-xs mt-1">订单</Text>
        </View>
        <View className="flex flex-col items-center text-gray-500 cursor-pointer hover:opacity-75 transition-opacity">
          <User size={24} />
          <Text className="text-xs mt-1">我的</Text>
        </View>
      </View>
    </View>
  );
}
