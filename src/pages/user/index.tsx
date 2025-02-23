import { View, Text, Button, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useState } from "react";
import BottomNavigation from "src/components/BottomNavigation";
import { AtIcon } from "taro-ui";

interface UserInfo {
  nickName: string;
  avatarUrl: string;
  gender?: number;
  country?: string;
  province?: string;
  city?: string;
}

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLoad(() => {
    checkLoginStatus();
  });

  const checkLoginStatus = async () => {
    try {
      const loginRes = await Taro.checkSession();
      if (loginRes) {
        // Get stored user info
        const storedUserInfo = Taro.getStorageSync("userInfo");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.log("Not logged in:", error);
    }
  };

  const handleLogin = async () => {
    try {
      // First get the login code
      const { code } = await Taro.login();
      if (!code) {
        throw new Error("Login failed");
      }

      // Get user info through button tap
      const { userInfo } = await Taro.getUserInfo({
        lang: "zh_CN",
      });

      if (userInfo) {
        setUserInfo(userInfo);
        setIsLoggedIn(true);
        // Store user info
        Taro.setStorageSync("userInfo", JSON.stringify(userInfo));
      }
    } catch (error) {
      console.error("Login failed:", error);
      Taro.showToast({
        title: "登录失败，请重试",
        icon: "none",
      });
    }
  };

  const handleLogout = () => {
    Taro.removeStorageSync("userInfo");
    setUserInfo(null);
    setIsLoggedIn(false);
    Taro.showToast({
      title: "已退出登录",
      icon: "success",
    });
  };

  return (
    <View className="min-h-screen bg-gray-100">
      {/* Header */}
      <View className="bg-white p-5">
        <Text className="text-xl font-bold">个人中心</Text>
      </View>

      {/* User Profile Section */}
      <View className="bg-white mt-2 p-5">
        {isLoggedIn && userInfo ? (
          <View className="flex items-center">
            <Image
              className="w-20 h-20 rounded-full"
              src={userInfo.avatarUrl}
              mode="aspectFill"
            />
            <View className="ml-4">
              <Text className="text-lg font-bold">{userInfo.nickName}</Text>
              <Text className="text-gray-500 mt-1">
                {userInfo.province} {userInfo.city}
              </Text>
            </View>
          </View>
        ) : (
          <Button
            className="bg-indigo-600 text-white py-3 rounded-lg w-full"
            openType="getUserInfo"
            onGetUserInfo={handleLogin}
          >
            微信登录
          </Button>
        )}
      </View>

      {/* Menu Items */}
      {isLoggedIn && (
        <View className="bg-white mt-2">
          <View className="flex items-center justify-between p-4 border-b border-gray-100">
            <View className="flex items-center">
              <AtIcon value="calendar" size={24} color="#666" />
              <Text className="ml-3">我的订单</Text>
            </View>
            <AtIcon value="chevron-right" size={20} color="#999" />
          </View>

          <View className="flex items-center justify-between p-4 border-b border-gray-100">
            <View className="flex items-center">
              <AtIcon value="credit-card" size={24} color="#666" />
              <Text className="ml-3">我的钱包</Text>
            </View>
            <AtIcon value="chevron-right" size={20} color="#999" />
          </View>

          <View className="flex items-center justify-between p-4">
            <View className="flex items-center">
              <AtIcon value="settings" size={24} color="#666" />
              <Text className="ml-3">设置</Text>
            </View>
            <AtIcon value="chevron-right" size={20} color="#999" />
          </View>
        </View>
      )}

      {/* Logout Button */}
      {isLoggedIn && (
        <Button
          className="mx-5 mt-8 bg-red-500 text-white py-3 rounded-lg"
          onClick={handleLogout}
        >
          退出登录
        </Button>
      )}
      <BottomNavigation active="profile" />
    </View>
  );
}
