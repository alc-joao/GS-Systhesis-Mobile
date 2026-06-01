import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 200 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() > 0.88 ? 2.2 : 1.1,
        opacity: Math.random() * 0.8 + 0.2,
      })),
    []
  );

  function validateForm() {
    let isValid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!name.trim()) {
      setNameError("Informe seu nome.");
      isValid = false;
    } else if (name.trim().length < 3) {
      setNameError("O nome deve possuir pelo menos 3 caracteres.");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Informe seu e-mail.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Digite um e-mail válido.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Informe sua senha.");
      isValid = false;
    } else if (!strongPasswordRegex.test(password)) {
      setPasswordError("Use 8+ caracteres, letra maiúscula e número.");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirme sua senha.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      isValid = false;
    }

    return isValid;
  }

  function handleRegister() {
    if (!validateForm()) return;

    router.replace("/home");
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <LinearGradient
        colors={["#020617", "#030712", "#061021", "#020617"]}
        locations={[0, 0.32, 0.68, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.starsLayer}>
        {stars.map((star, index) => (
          <View
            key={index}
            style={[
              styles.star,
              {
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              },
            ]}
          />
        ))}
      </View>

      <LinearGradient
        colors={[
          "rgba(59,130,246,0)",
          "rgba(59,130,246,0.20)",
          "rgba(168,85,247,0.18)",
          "rgba(2,6,23,0)",
        ]}
        locations={[0, 0.35, 0.65, 1]}
        style={styles.milkyWay}
      />

      <View style={styles.brightStarOne} />
      <View style={styles.brightStarTwo} />
      <View style={styles.brightStarThree} />
      <View style={styles.brightStarFour} />
      <View style={styles.brightStarFive} />

      <LinearGradient
        colors={["rgba(2,6,23,0)", "rgba(2,6,23,0.72)", "#020617"]}
        locations={[0, 0.58, 1]}
        style={styles.bottomDark}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>

            <Text style={styles.logo}>SYSTHESIS</Text>
            <Text style={styles.subtitle}>Cadastro de novo operador</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Criar conta</Text>

            <Text style={styles.description}>
              Registre seu acesso para gerenciar colônias, missões e alertas
              críticos do sistema.
            </Text>

            <View style={[styles.inputGroup, nameError && styles.inputError]}>
              <Ionicons name="person-outline" size={20} color="#94A3B8" />

              <TextInput
                placeholder="Nome completo"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setNameError("");
                }}
                autoCapitalize="words"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {!!nameError && <Text style={styles.errorText}>{nameError}</Text>}

            <View style={[styles.inputGroup, emailError && styles.inputError]}>
              <Ionicons name="mail-outline" size={20} color="#94A3B8" />

              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <View
              style={[styles.inputGroup, passwordError && styles.inputError]}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />

              <TextInput
                placeholder="Senha"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
                secureTextEntry
                style={styles.input}
              />
            </View>

            {!!passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}

            <View
              style={[
                styles.inputGroup,
                confirmPasswordError && styles.inputError,
              ]}
            >
              <Ionicons name="shield-checkmark-outline" size={20} color="#94A3B8" />

              <TextInput
                placeholder="Confirmar senha"
                placeholderTextColor="#94A3B8"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmPasswordError("");
                }}
                secureTextEntry
                style={styles.input}
              />
            </View>

            {!!confirmPasswordError && (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            )}

            <Pressable onPress={handleRegister} style={styles.registerButton}>
              <LinearGradient
                colors={["#06B6D4", "#38BDF8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerGradient}
              >
                <Text style={styles.registerButtonText}>CRIAR CONTA</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.loginText}>
                Já possui conta?{" "}
                <Text style={styles.loginHighlight}>Entrar</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    overflow: "hidden",
  },

  starsLayer: {
    ...StyleSheet.absoluteFillObject,
  },

  star: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#E0F2FE",
  },

  milkyWay: {
    position: "absolute",
    top: -80,
    left: "34%",
    width: 130,
    height: "120%",
    borderRadius: 100,
    transform: [{ rotate: "18deg" }],
    opacity: 0.9,
  },

  brightStarOne: {
    position: "absolute",
    top: 72,
    left: "52%",
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    shadowColor: "#7DD3FC",
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },

  brightStarTwo: {
    position: "absolute",
    top: 165,
    left: "64%",
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    shadowColor: "#A78BFA",
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },

  brightStarThree: {
    position: "absolute",
    top: 215,
    left: "48%",
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    shadowColor: "#38BDF8",
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },

  brightStarFour: {
    position: "absolute",
    top: 48,
    left: "40%",
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#FCA5A5",
    shadowColor: "#F87171",
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 4,
  },

  brightStarFive: {
    position: "absolute",
    top: 110,
    left: "28%",
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    shadowColor: "#BAE6FD",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },

  bottomDark: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "42%",
    zIndex: 4,
  },

  keyboardView: {
    flex: 1,
    zIndex: 10,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  backButton: {
    position: "absolute",
    left: 0,
    top: 4,
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.72)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.24)",
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 5,
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 10,
    fontSize: 14,
    letterSpacing: 0.8,
    textAlign: "center",
  },

  card: {
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.24)",
    borderRadius: 28,
    padding: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 8,
  },

  description: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },

  inputGroup: {
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.24)",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(2,6,23,0.55)",
  },

  inputError: {
    borderColor: "#F87171",
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    marginLeft: 12,
    fontSize: 15,
  },

  errorText: {
    color: "#F87171",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 6,
    fontWeight: "700",
  },

  registerButton: {
    borderRadius: 18,
    overflow: "hidden",
    marginTop: 8,
  },

  registerGradient: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  loginText: {
    color: "#94A3B8",
    marginTop: 22,
    textAlign: "center",
    fontSize: 14,
  },

  loginHighlight: {
    color: "#38BDF8",
    fontWeight: "900",
  },
});