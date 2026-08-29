import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

type Message = { id: string; role: "user" | "assistant"; text: string };

const BACKEND_URL = "http://192.168.1.24:8080/api/chat"; // e.g. http://192.168.1.24:8080/api/chat

type Props = {
  originData?: { name?: string } | null;
  destinationData?: { name?: string } | null;
};
// Give me better routes using rta Dubai bus
export default function RouteChat({ originData, destinationData }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

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
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s cap

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
        console.log("HTTP ERROR STATUS:", res.status);
        const errorText = await res.text();
        console.log("HTTP ERROR BODY:", errorText);
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
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        className="mx-5 mt-5 rounded-2xl bg-white p-4"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
          minHeight: 320,
        }}
      >
        <Text className="text-base font-bold mb-3">Ask about your route</Text>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          style={{ maxHeight: 220 }}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
          renderItem={({ item }) => (
            <View
              className={`mb-2 px-3 py-2 rounded-2xl max-w-[85%] ${
                item.role === "user" ? "self-end" : "self-start"
              }`}
              style={{
                backgroundColor:
                  item.role === "user" ? Colors.button : "#F1F1F1",
              }}
            >
              <Text style={{ color: item.role === "user" ? "white" : "#111" }}>
                {item.text}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-sm text-gray-400 text-center mt-6">
              Ask me anything about this route
            </Text>
          }
        />

        {loading && (
          <Text className="text-xs text-gray-400 mt-1 mb-1">
            Assistant is typing…
          </Text>
        )}

        <View className="flex-row items-center mt-3 border-t border-gray-100 pt-3">
          <TextInput
            className="flex-1 px-3 py-2 rounded-full bg-gray-100 text-sm"
            placeholder="Ask something..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            editable={!loading}
          />
          <Pressable
            onPress={sendMessage}
            disabled={loading}
            className="ml-2 w-9 h-9 rounded-full items-center justify-center"
            style={{
              backgroundColor: Colors.button,
              opacity: loading ? 0.5 : 1,
            }}
          >
            <Ionicons name="send" size={16} color="white" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
