import { useMemo, useState } from "react";
import {
  Alert,
  Image,
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
import { api } from "../src/services/api";

type Planet = "Marte" | "Lua";
type Difficulty = "Fácil" | "Média" | "Difícil";

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

export default function ColonyCreateScreen() {
  const [colonyName, setColonyName] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>("Marte");
  const [difficulty, setDifficulty] = useState<Difficulty>("Média");
  const [loading, setLoading] = useState(false);

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 260 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() > 0.97 ? 3 : Math.random() > 0.82 ? 2 : 1,
        opacity: Math.random() * 0.8 + 0.2,
      })),
    []
  );

  async function handleCreateColony() {
    if (!colonyName.trim()) {
      Alert.alert("Atenção", "Digite o nome da colônia.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/colonias", {
        nome: colonyName.trim(),
        planeta: selectedPlanet === "Lua" ? "LUA" : "MARTE",
        setor: selectedPlanet === "Lua" ? "Setor Artemis" : "Setor Ares",
        latitude: 0,
        longitude: 0,
      });

      router.replace("/home");
    } catch (error) {
      console.log("ERRO AO CRIAR COLÔNIA:", error);

      Alert.alert(
        "Erro",
        "Não foi possível criar a colônia. Verifique se a API está online."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <LinearGradient
        colors={["#020617", "#030712", "#08111F", "#020617"]}
        locations={[0, 0.35, 0.72, 1]}
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

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.push("/home")}>
            <Ionicons name="arrow-back" size={30} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.title}>CRIAR COLÔNIA</Text>

          <View style={styles.headerGhost} />
        </View>

        <View style={styles.planetsRow}>
          <PlanetCard
            label="Marte"
            active={selectedPlanet === "Marte"}
            image={require("../assets/images/imgs/dashboard-marte.png")}
            activeColor="#FF4B35"
            onPress={() => setSelectedPlanet("Marte")}
          />

          <PlanetCard
            label="Lua"
            active={selectedPlanet === "Lua"}
            image={require("../assets/images/imgs/dashboard-lua.png")}
            activeColor="#94A3B8"
            onPress={() => setSelectedPlanet("Lua")}
          />

          <View style={styles.planetCard}>
            <View style={styles.lockedCircle}>
              <Image
                source={require("../assets/images/imgs/planeta-bloqueado.png")}
                style={styles.planetImage}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.planetLabel}>OUTROS</Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Nome da Colônia</Text>

          <TextInput
            value={colonyName}
            onChangeText={setColonyName}
            placeholder="Ex: Base Ares-02"
            placeholderTextColor="#64748B"
            style={styles.input}
          />

          <Text style={[styles.label, styles.difficultyLabel]}>Dificuldade</Text>

          <View style={styles.difficultyRow}>
            <DifficultyButton
              label="Fácil"
              active={difficulty === "Fácil"}
              onPress={() => setDifficulty("Fácil")}
            />

            <DifficultyButton
              label="Média"
              active={difficulty === "Média"}
              onPress={() => setDifficulty("Média")}
            />

            <DifficultyButton
              label="Difícil"
              active={difficulty === "Difícil"}
              onPress={() => setDifficulty("Difícil")}
            />
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>RESUMO</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Planeta</Text>
              <Text style={styles.summaryValue}>{selectedPlanet}</Text>
            </View>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Dificuldade</Text>
              <Text style={styles.summaryValue}>{difficulty}</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[
            styles.startButton,
            (!colonyName.trim() || loading) && styles.startButtonDisabled,
          ]}
          onPress={handleCreateColony}
          disabled={loading}
        >
          <LinearGradient
            colors={["#6366F1", "#3B82F6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startGradient}
          >
            <Text style={styles.startText}>
              {loading ? "Criando..." : "Iniciar Colônia"}
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

type PlanetCardProps = {
  label: Planet;
  image: number;
  active: boolean;
  activeColor: string;
  onPress: () => void;
};

function PlanetCard({
  label,
  image,
  active,
  activeColor,
  onPress,
}: PlanetCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.planetCard}>
      <View
        style={[
          styles.planetCircle,
          active && {
            borderColor: activeColor,
            shadowColor: activeColor,
          },
        ]}
      >
        <Image source={image} style={styles.planetImage} resizeMode="cover" />
      </View>

      <Text style={styles.planetLabel}>{label.toUpperCase()}</Text>
    </Pressable>
  );
}

type DifficultyButtonProps = {
  label: Difficulty;
  active: boolean;
  onPress: () => void;
};

function DifficultyButton({ label, active, onPress }: DifficultyButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.difficultyButton, active && styles.difficultyButtonActive]}
    >
      <Text style={[styles.difficultyText, active && styles.difficultyTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617", overflow: "hidden" },
  starsLayer: { ...StyleSheet.absoluteFillObject },
  star: { position: "absolute", borderRadius: 999, backgroundColor: "#E0F2FE" },
  content: {
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 54,
    zIndex: 10,
  },
  header: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  headerGhost: { width: 44, height: 44 },
  planetsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  planetCard: {
    alignItems: "center",
    width: "30%",
  },
  planetCircle: {
    width: 105,
    height: 105,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "rgba(148,163,184,0.18)",
    backgroundColor: "rgba(15,23,42,0.65)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  lockedCircle: {
    width: 105,
    height: 105,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(30,64,175,0.35)",
    backgroundColor: "rgba(15,23,42,0.44)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    opacity: 0.75,
  },
  planetImage: {
    width: "100%",
    height: "100%",
  },
  planetLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 14,
    letterSpacing: 0.5,
  },
  formCard: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "rgba(2,15,32,0.82)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.12)",
    marginBottom: 26,
  },
  label: {
    color: "#CBD5E1",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 13,
  },
  input: {
    height: 68,
    borderRadius: 12,
    backgroundColor: "rgba(2,6,23,0.74)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.24)",
    paddingHorizontal: 18,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  difficultyLabel: {
    marginTop: 30,
  },
  difficultyRow: {
    flexDirection: "row",
    gap: 12,
  },
  difficultyButton: {
    flex: 1,
    height: 66,
    borderRadius: 12,
    backgroundColor: "rgba(15,23,42,0.72)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  difficultyButtonActive: {
    backgroundColor: "rgba(14,165,233,0.16)",
    borderColor: "#38BDF8",
    borderWidth: 2,
  },
  difficultyText: {
    color: "#CBD5E1",
    fontSize: 17,
    fontWeight: "800",
  },
  difficultyTextActive: {
    color: "#FFFFFF",
  },
  summaryCard: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "rgba(2,15,32,0.82)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.12)",
    marginBottom: 32,
  },
  summaryTitle: {
    color: "#CBD5E1",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  summaryBox: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "rgba(15,23,42,0.58)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.12)",
    padding: 16,
  },
  summaryLabel: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 7,
  },
  summaryValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  startButton: {
    height: 72,
    borderRadius: 14,
    overflow: "hidden",
  },
  startButtonDisabled: {
    opacity: 0.55,
  },
  startGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  startText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
  },
});