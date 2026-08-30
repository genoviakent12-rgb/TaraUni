import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Message = { id: string; role: "user" | "assistant"; text: string };

const BACKEND_URL = "http://localhost:8080/api/chat"; // e.g. http://192.168.1.24:8080/api/chat

type Props = {
  originData?: { name?: string } | null;
  destinationData?: { name?: string } | null;
};

export default function RouteChat({ originData, destinationData }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          origin: originData?.name || "Current Location",
          destination: destinationData?.name || "Destination",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        console.log("HTTP ERROR STATUS:", res.status);
        console.log("HTTP ERROR BODY:", errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "a",
          role: "assistant",
          text: data.reply || "Sorry, something went wrong.",
        },
      ]);
    } catch (e) {
      clearTimeout(timeoutId);
      console.log("FETCH ERROR:", e);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "e",
          role: "assistant",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View
        className="mx-5 mt-6 rounded-3xl bg-white overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
          minHeight: 620,
        }}
      >
        {/* Header */}
        <View
          className="flex-row items-center px-5 py-4"
          style={{ borderBottomWidth: 1, borderBottomColor: "#F0F0F0" }}
        >
          <View
            className="w-8 h-8 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: `${Colors.button}1A` }}
          >
            <Ionicons name="sparkles" size={16} color={Colors.button} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold" style={{ color: Colors.text }}>
              Route Assistant
            </Text>
            <Text className="text-xs" style={{ color: Colors.textSecondary }}>
              Ask anything about this trip
            </Text>
          </View>
        </View>

        {/* Message list */}
        <ScrollView
          ref={scrollRef}
          nestedScrollEnabled
          style={{ maxHeight: 325 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 14,
            paddingBottom: 4,
            flexGrow: 1,
          }}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.length === 0 ? (
            <View className="items-center justify-center py-10">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: `${Colors.button}12` }}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={22} color={Colors.button} />
              </View>
              <Text className="text-sm font-medium" style={{ color: Colors.text }}>
                Ask me anything about your route
              </Text>
              <Text className="text-xs mt-1 text-center px-8" style={{ color: Colors.textSecondary }}>
                Try &quot;What&apos;s the fastest way there?&quot; or &quot;Any tolls on this route?&quot;
              </Text>
            </View>
          ) : (
            messages.map((item) => (
              <View
                key={item.id}
                className={`mb-3 px-4 py-2.5 rounded-2xl max-w-[82%] ${
                  item.role === "user" ? "self-end" : "self-start"
                }`}
                style={{
                  backgroundColor: item.role === "user" ? Colors.button : "#F4F4F5",
                  borderBottomRightRadius: item.role === "user" ? 4 : 18,
                  borderBottomLeftRadius: item.role === "user" ? 18 : 4,
                }}
              >
                <Text
                  className="text-sm leading-5"
                  style={{ color: item.role === "user" ? "white" : "#1C1C1E" }}
                >
                  {item.text}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        {/* Typing indicator */}
        {loading && (
          <View className="flex-row items-center px-5 pb-1">
            <View className="flex-row" style={{ gap: 3 }}>
              <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: Colors.textSecondary }} />
              <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: Colors.textSecondary }} />
              <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: Colors.textSecondary }} />
            </View>
            <Text className="text-xs ml-2" style={{ color: Colors.textSecondary }}>
              Thinking…
            </Text>
          </View>
        )}

        <View className="flex-row items-center justify-center gap-10">
          <TouchableOpacity className="w-[100px] h-10 rounded-[15px] items-center justify-center" style={{backgroundColor: Colors.button}}>
            <Text className="text-white text-medium font-medium">Bus</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[100px] h-10 rounded-[15px] items-center justify-center" style={{backgroundColor: Colors.button}}>
            <Text className="text-white text-medium font-medium">Taxi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-[100px] h-10 rounded-[15px] items-center justify-center" style={{backgroundColor: Colors.button}}>
            <Text className="text-white text-medium font-medium">Train</Text>
          </TouchableOpacity>
        </View>

        {/* Input row */}
        <View
          className="flex-row items-center px-4 py-3"
          style={{ borderTopWidth: 1, borderTopColor: "#F0F0F0" }}
        >
          <TextInput
            className="flex-1 px-4 py-2.5 rounded-full text-sm"
            style={{ backgroundColor: "#F4F4F5", color: Colors.text }}
            placeholder="Ask something..."
            placeholderTextColor={Colors.textSecondary}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            editable={!loading}
            returnKeyType="send"
          />
          <Pressable
            onPress={sendMessage}
            disabled={loading || !input.trim()}
            className="ml-2 w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: Colors.button,
              opacity: loading || !input.trim() ? 0.4 : 1,
            }}
          >
            <Ionicons name="arrow-up" size={18} color="white" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}