import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signInWithEmail, isLoading } = useAuthStore();

  async function handleSignIn() {
    try {
      await signInWithEmail(email, password);
      if (!isLoading) {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      Alert.alert("Sign-in Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Welcome Back!</Text>

        <View style={styles.form}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A3A3A3"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A3A3A3"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>

          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtonContainer}>
          <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
            <AntDesign name="apple1" size={24} color="white" />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1525",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 80,
  },
  containerForm: {
    maxWidth: 450,
    width: "100%",
    marginHorizontal: "auto",
    gap: 16,
  },
  form: {},
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#2A213D",
    color: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  forgotPassword: {
    color: "#A3A3A3",
    fontSize: 14,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#fff",
  },
  dividerText: {
    color: "#A3A3A3",
    marginHorizontal: 10,
  },
  socialButtonContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#4A4A4A",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  socialText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  signUpText: {
    color: "#A3A3A3",
    textAlign: "center",
  },
  signUpLink: {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    margin: 10,
  },
});
