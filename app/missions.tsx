import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

type MissionDifficulty = "Fácil" | "Média" | "Difícil";

type Mission = {
  id: string;
  title: string;
  difficulty: MissionDifficulty;
  progress: number;
  locked?: boolean;
};

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

const activeMissions: Mission[] = [
  {
    id: "1",
    title: "Primeira Colheita em Marte",
    difficulty: "Média",
    progress: 60,
  },
  {
    id: "2",
    title: "Estabilidade Energética",
    difficulty: "Fácil",
    progress: 30,
  },
  {
    id: "3",
    title: "Reciclagem de Água",
    difficulty: "Fácil",
    progress: 0,
  },
  {
    id: "4",
    title: "Exploração do Subsolo",
    difficulty: "Difícil",
    progress: 0,
    locked: true,
  },
  {
    id: "5",
    title: "Produção de Oxigênio",
    difficulty: "Média",
    progress: 0,
    locked: true,
  },
];

const completedMissions: Mission[] = [
  {
    id: "6",
    title: "Primeiro Módulo Habitável",
    difficulty: "Fácil",
    progress: 100,
  },
  {
    id: "7",
    title: "Comunicação com a Terra",
    difficulty: "Média",
    progress: 100,
  },
];

export default function MissionsScreen() {
  const [selectedTab, setSelectedTab] = useState<"Ativas" | "Concluídas">(
    "Ativas"
  );

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

  const missions =
    selectedTab === "Ativas" ? activeMissions : completedMissions;

  function handleOpenMission(mission: Mission) {
    if (mission.locked) return;

    router.push({
      pathname: "/mission-detail",
      params: {
        id: mission.id,
        title: mission.title,
        difficulty: mission.difficulty,
        progress: mission.progress,
      },
    });
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

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={31} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.title}>MISSÕES</Text>

        <View style={styles.headerSpace} />
      </View>

      <View style={styles.tabsContainer}>
        <Pressable
          style={[
            styles.tabButton,
            selectedTab === "Ativas" && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab("Ativas")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Ativas" && styles.tabTextActive,
            ]}
          >
            Ativas
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            selectedTab === "Concluídas" && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab("Concluídas")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Concluídas" && styles.tabTextActive,
            ]}
          >
            Concluídas
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onPress={() => handleOpenMission(mission)}
          />
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

type MissionCardProps = {
  mission: Mission;
  onPress: () => void;
};

function MissionCard({ mission, onPress }: MissionCardProps) {
  const difficultyColor =
    mission.difficulty === "Fácil"
      ? "#2DD4BF"
      : mission.difficulty === "Média"
      ? "#38BDF8"
      : "#FB7185";

  return (
    <Pressable
      style={[styles.missionCard, mission.locked && styles.missionCardLocked]}
      onPress={onPress}
    >
      <View style={styles.missionHeader}>
        <View style={styles.missionInfo}>
          <Text style={styles.missionTitle}>{mission.title}</Text>

          <Text style={styles.difficultyText}>
            Dificuldade:{" "}
            <Text style={[styles.difficultyValue, { color: difficultyColor }]}>
              {mission.difficulty}
            </Text>
          </Text>
        </View>

        {mission.locked && (
          <Ionicons name="lock-closed-outline" size={30} color="#94A3B8" />
        )}
      </View>

      {!mission.locked && (
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${mission.progress}%`,
                  backgroundColor: difficultyColor,
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>{mission.progress}%</Text>
        </View>
      )}
    </Pressable>
  );
}

function BottomNav() {
  return (
    <View style={styles.bottomNav}>
      <NavItem icon="home-outline" label="Home" onPress={() => router.push("/home")} />
      <NavItem icon="create" label="Missões" active onPress={() => router.push("/missions")} />
      <NavItem
        icon="notifications-outline"
        label="Alertas"
        onPress={() => router.push("/alerts")}
      />
      <NavItem
        icon="trophy-outline"
        label="Ranking"
        onPress={() => router.push("/ranking")}
      />
      <NavItem
        icon="person-outline"
        label="Perfil"
        onPress={() => router.push("/profile")}
      />
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
  header: {
    paddingTop: 62,
    paddingHorizontal: 22,
    height: 118,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0.8,
    textShadowColor: "rgba(255,255,255,0.35)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  headerSpace: {
    width: 42,
    height: 42,
  },
  tabsContainer: {
    height: 50,
    marginHorizontal: 36,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.72)",
    borderWidth: 1,
    borderColor: "rgba(30,64,175,0.20)",
    flexDirection: "row",
    padding: 3,
    marginBottom: 22,
    zIndex: 10,
  },
  tabButton: {
    flex: 1,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: "#4F63D9",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.55)",
  },
  tabText: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "900",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 120,
    zIndex: 10,
  },
  missionCard: {
    minHeight: 118,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    backgroundColor: "rgba(8,21,38,0.84)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
  },
  missionCardLocked: {
    opacity: 0.78,
  },
  missionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  missionInfo: {
    flex: 1,
    paddingRight: 14,
  },
  missionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 10,
    textShadowColor: "rgba(255,255,255,0.22)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  difficultyText: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "800",
  },
  difficultyValue: {
    fontWeight: "900",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 20,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(30,41,59,0.96)",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  progressText: {
    width: 44,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "right",
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
  navItem: {
    alignItems: "center",
    gap: 4,
    width: 62,
  },
  navLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
  },
  navLabelActive: {
    color: "#60A5FA",
  },
});