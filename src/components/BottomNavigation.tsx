import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";

type TabType = "rescue" | "service" | "orders" | "profile";

interface BottomNavigationProps {
  active: TabType;
}

export default function BottomNavigation({ active }: BottomNavigationProps) {
  const getTabStyle = (tab: TabType) => ({
    color: active === tab ? "#4F46E5" : "#666",
    fontWeight: active === tab ? "medium" : "normal",
  });

  const getIconColor = (tab: TabType) => (active === tab ? "#4F46E5" : "#999");

  return (
    <View className="fixed bottom-0 left-0 right-0 grid grid-cols-3 bg-white/80 backdrop-blur-sm py-3 border-t border-indigo-100 shadow-lg z-10">
      <View
        className="flex flex-col items-center"
        onClick={() => Taro.navigateTo({ url: "/pages/index/index" })}
        style={getTabStyle("rescue")}
      >
        <AtIcon
          value="lightning-bolt"
          size={24}
          color={getIconColor("rescue")}
        />
        <Text className="text-xs mt-1">救援</Text>
      </View>
      {/* <View
        className="flex flex-col items-center"
        style={getTabStyle("service")}
      >
        <AtIcon value="menu" size={24} color={getIconColor("service")} />
        <Text className="text-xs mt-1">服务</Text>
      </View> */}
      <View
        className="flex flex-col items-center"
        style={getTabStyle("orders")}
      >
        <AtIcon value="folder" size={24} color={getIconColor("orders")} />
        <Text className="text-xs mt-1">订单</Text>
      </View>
      <View
        className="flex flex-col items-center"
        onClick={() => Taro.navigateTo({ url: "/pages/user/index" })}
        style={getTabStyle("profile")}
      >
        <AtIcon value="user" size={24} color={getIconColor("profile")} />
        <Text className="text-xs mt-1">我的</Text>
      </View>
    </View>
  );
}
