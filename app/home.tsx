import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Planet = "Marte" | "Lua";
type ColonyStatus = "Estável" | "Alerta";

type Colony = {
  id: string;
  name: string;
  planet: Planet;
  status: ColonyStatus;
  day: number;
  level: number;
  xp: number;
};

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

const STORAGE_KEY = "@systhesis:colonies";

const DEFAULT_COLONIES: Colony[] = [
  {
    id: "1",
    name: "Base Ares-01",
    planet: "Marte",
    status: "Estável",
    day: 23,
    level: 12,
    xp: 2450,
  },
  {
    id: "2",
    name: "Base Artemis",
    planet: "Lua",
    status: "Alerta",
    day: 17,
    level: 8,
    xp: 1180,
  },
];

export default function HomeScreen() {
  const [colonies, setColonies] = useState<Colony[]>([]);

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

  async function loadColonies() {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        setColonies(JSON.parse(saved));
        return;
      }

      setColonies(DEFAULT_COLONIES);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COLONIES));
    } catch {
      setColonies(DEFAULT_COLONIES);
    }
  }

  useEffect(() => {
    loadColonies();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadColonies();
    }, [])
  );

  function handleOpenColony(colony: Colony) {
    router.push({
      pathname: "/colony-dashboard",
      params: {
        id: colony.id,
        name: colony.name,
        planet: colony.planet,
        status: colony.status,
        day: String(colony.day),
        level: String(colony.level),
        xp: String(colony.xp),
      },
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <LinearGradient
        colors={["#020617", "#030712", "#08111f", "#020617"]}
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

      <LinearGradient
        colors={[
          "rgba(59,130,246,0)",
          "rgba(59,130,246,0.08)",
          "rgba(168,85,247,0.07)",
          "rgba(2,6,23,0)",
        ]}
        locations={[0, 0.35, 0.65, 1]}
        style={styles.galaxyGlow}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>MINHAS COLÔNIAS</Text>

          <Pressable
            style={styles.plusButton}
            onPress={() => router.push("/colony-create")}
          >
            <Ionicons name="add" size={31} color="#FFFFFF" />
          </Pressable>
        </View>

        {colonies.map((colony) => (
          <Pressable
            key={colony.id}
            style={[
              styles.colonyCard,
              colony.planet === "Marte" ? styles.marsCard : styles.moonCard,
            ]}
            onPress={() => handleOpenColony(colony)}
          >
            <Image
              source={
                colony.planet === "Marte"
                  ? require("../assets/images/imgs/base-marte.png")
                  : require("../assets/images/imgs/base-lua.png")
              }
              style={styles.cardPhoto}
              resizeMode="cover"
            />

            <LinearGradient
              colors={[
                "rgba(0,0,0,0.22)",
                "rgba(0,0,0,0.00)",
                "rgba(0,0,0,0.74)",
              ]}
              locations={[0, 0.5, 1]}
              style={styles.cardOverlay}
            >
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.colonyName}>{colony.name}</Text>
                  <Text style={styles.planetText}>{colony.planet}</Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    colony.status === "Alerta" && styles.statusAlert,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      colony.status === "Alerta" && styles.statusAlertText,
                    ]}
                  >
                    {colony.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBar}>
                <View style={styles.infoItem}>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.infoText}>Dia {colony.day}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoItem}>
                  <MaterialCommunityIcons
                    name="medal-outline"
                    size={17}
                    color="#CBD5E1"
                  />
                  <Text style={styles.infoText}>Nível {colony.level}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoItem}>
                  <MaterialCommunityIcons
                    name="rocket-launch"
                    size={17}
                    color="#FBBF24"
                  />
                  <Text style={styles.infoText}>
                    {colony.xp.toLocaleString("pt-BR")} XP
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        ))}

        <Pressable
          style={styles.createButton}
          onPress={() => router.push("/colony-create")}
        >
          <Ionicons name="add" size={24} color="#CBD5E1" />
          <Text style={styles.createButtonText}>Criar nova colônia</Text>
        </Pressable>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function BottomNav() {
  return (
    <View style={styles.bottomNav}>
      <NavItem icon="home" label="Home" active onPress={() => router.push("/home")} />
      <NavItem icon="create-outline" label="Missões" onPress={() => router.push("/missions")} />
      <NavItem icon="notifications-outline" label="Alertas" onPress={() => router.push("/alerts")} />
      <NavItem icon="trophy-outline" label="Ranking" onPress={() => router.push("/ranking")} />
      <NavItem icon="person-outline" label="Perfil" onPress={() => router.push("/profile")} />
    </View>
  );
}

type NavItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress: () => void;
};

function NavItem({ icon, label, active, onPress }: NavItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.navItem}>
      <Ionicons name={icon} size={25} color={active ? "#60A5FA" : "#94A3B8"} />
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617", overflow: "hidden" },
  starsLayer: { ...StyleSheet.absoluteFillObject },
  star: { position: "absolute", borderRadius: 999, backgroundColor: "#E0F2FE" },
  galaxyGlow: {
    position: "absolute",
    top: -90,
    left: "35%",
    width: 165,
    height: "120%",
    borderRadius: 100,
    transform: [{ rotate: "20deg" }],
    opacity: 0.7,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 62,
    paddingBottom: 126,
    zIndex: 10,
  },
  header: {
    height: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  plusButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: "rgba(37,99,235,0.76)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.52)",
    alignItems: "center",
    justifyContent: "center",
  },
  colonyCard: {
    width: "100%",
    height: 205,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    backgroundColor: "#020617",
    position: "relative",
  },
  marsCard: { borderColor: "rgba(248,113,113,0.58)" },
  moonCard: { borderColor: "rgba(56,189,248,0.44)" },
  cardPhoto: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 18,
    justifyContent: "space-between",
    borderRadius: 24,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  colonyName: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
    textTransform: "uppercase",
    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    maxWidth: 220,
  },
  planetText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
    marginTop: 5,
  },
  statusBadge: {
    height: 34,
    paddingHorizontal: 13,
    borderRadius: 9,
    backgroundColor: "rgba(22,101,52,0.90)",
    alignItems: "center",
    justifyContent: "center",
  },
  statusAlert: { backgroundColor: "rgba(127,29,29,0.90)" },
  statusText: { color: "#86EFAC", fontSize: 12, fontWeight: "900" },
  statusAlertText: { color: "#FF755F" },
  infoBar: {
    minHeight: 46,
    borderRadius: 15,
    backgroundColor: "rgba(2,6,23,0.78)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.16)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
  },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  dot: {
    color: "#F97316",
    fontSize: 21,
    fontWeight: "900",
    marginTop: -2,
  },
  infoText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: "rgba(148,163,184,0.24)",
  },
  createButton: {
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(96,165,250,0.38)",
    backgroundColor: "rgba(2,6,23,0.68)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  createButtonText: {
    color: "#93C5FD",
    fontSize: 16,
    fontWeight: "800",
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: "rgba(2,6,23,0.94)",
    borderTopWidth: 1,
    borderColor: "rgba(148,163,184,0.16)",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 20,
  },
  navItem: { alignItems: "center", gap: 4, width: 62 },
  navLabel: { color: "#94A3B8", fontSize: 11, fontWeight: "700" },
  navLabelActive: { color: "#60A5FA" },
});