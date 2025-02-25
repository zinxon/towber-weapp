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
      console.log("Login code:", code);

      if (!code) {
        throw new Error("Login failed");
      }

      // Get user profile through button tap
      const userProfileRes = await Taro.getUserInfo({
        // desc: "用于完善会员资料",
        lang: "zh_CN",
      });

      console.log("User profile response:", userProfileRes);

      if (userProfileRes.userInfo) {
        console.log("User info:", userProfileRes.userInfo);
        setUserInfo(userProfileRes.userInfo);
        setIsLoggedIn(true);
        // Store user info
        Taro.setStorageSync(
          "userInfo",
          JSON.stringify(userProfileRes.userInfo)
        );
      }
    } catch (error) {
      console.error("Login failed with error:", error);
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
            className="w-full max-w-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-full font-medium shadow-md hover:opacity-90 transition-all text-sm"
            hoverClass="opacity-80"
            onClick={handleLogin}
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
        <View className="px-4 pt-10">
          <Button
            className="w-full max-w-sm bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-full font-medium shadow-md hover:opacity-90 transition-all text-sm"
            hoverClass="opacity-80"
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </View>
      )}
      <BottomNavigation active="profile" />
    </View>
  );
}
