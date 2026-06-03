import { useMemo } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type MissionDifficulty = "Fácil" | "Média" | "Difícil";
type Planet = "Marte" | "Lua";

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

export default function MissionDetailScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    difficulty?: MissionDifficulty;
    progress?: string;
    planet?: Planet;
  }>();

  const missionTitle = params.title ?? "Primeira Colheita em Marte";
  const difficulty = params.difficulty ?? "Média";
  const progress = Number(params.progress ?? 60);
  const planet: Planet = params.planet === "Lua" ? "Lua" : "Marte";

  const missionImage =
    planet === "Lua"
      ? require("../assets/images/imgs/colheita-lua.png")
      : require("../assets/images/imgs/colheita-marte.png");

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

  const difficultyColor =
    difficulty === "Fácil"
      ? "#2DD4BF"
      : difficulty === "Média"
      ? "#F59E0B"
      : "#FB7185";

  function handleStartChallenge() {
    router.push({
      pathname: "/challenge",
      params: {
        id: params.id ?? "1",
        title: missionTitle,
        difficulty,
        progress: String(progress),
        planet,
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

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={31} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.headerTitle}>MISSÃO</Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={missionImage}
          style={styles.heroCard}
          imageStyle={styles.heroImage}
          resizeMode="contain"
        >
          <LinearGradient
            colors={[
              "rgba(2,6,23,0.72)",
              "rgba(2,6,23,0.10)",
              "rgba(2,6,23,0.88)",
            ]}
            locations={[0, 0.42, 1]}
            style={styles.heroOverlay}
          >
            <View>
              <Text style={styles.missionTitle}>{missionTitle.toUpperCase()}</Text>

              <Text style={styles.difficultyText}>
                Dificuldade:{" "}
                <Text style={[styles.difficultyValue, { color: difficultyColor }]}>
                  {difficulty}
                </Text>
              </Text>

              <Text style={styles.description}>
                Sua estufa está pronta para a primeira colheita. Mas algo pode
                dar errado...
              </Text>
            </View>

            <View style={styles.bottomPanel}>
              <Text style={styles.panelTitle}>RECOMPENSAS</Text>

              <View style={styles.rewardRow}>
                <View style={styles.rewardBox}>
                  <MaterialCommunityIcons
                    name="star-four-points"
                    size={22}
                    color="#FBBF24"
                  />
                  <Text style={styles.rewardText}>200</Text>
                </View>

                <View style={styles.rewardBox}>
                  <MaterialCommunityIcons
                    name="flask"
                    size={22}
                    color="#C084FC"
                  />
                  <Text style={styles.rewardText}>50</Text>
                </View>
              </View>

              <View style={styles.panelDivider} />

              <View style={styles.progressTop}>
                <Text style={styles.panelTitle}>PROGRESSO</Text>
                <Text style={styles.progressPercent}>{progress}%</Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progress}%`,
                    },
                  ]}
                />
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <Pressable style={styles.startButton} onPress={handleStartChallenge}>
          <Text style={styles.startButtonText}>Iniciar Missão</Text>
        </Pressable>
      </ScrollView>
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
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  headerSpace: {
    width: 42,
    height: 42,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 36,
    zIndex: 10,
  },
  heroCard: {
  height: 790,
  borderRadius: 26,
  overflow: "hidden",
  backgroundColor: "#020617",
  borderWidth: 1,
  borderColor: "rgba(96,165,250,0.24)",
  },

  heroImage: {
    borderRadius: 26,
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    flex: 1,
    padding: 22,
    justifyContent: "space-between",
  },
  missionTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 39,
    letterSpacing: 0.2,
    textShadowColor: "rgba(0,0,0,0.90)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginTop: 8,
  },
  difficultyText: {
    color: "#CBD5E1",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 16,
    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  difficultyValue: {
    fontWeight: "900",
  },
  description: {
    color: "#E5E7EB",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 31,
    marginTop: 36,
    maxWidth: 315,
    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  bottomPanel: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: "rgba(15,23,42,0.86)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.18)",
  },
  panelTitle: {
    color: "#F87171",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
  rewardRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 14,
  },
  rewardBox: {
    minWidth: 126,
    height: 54,
    borderRadius: 14,
    backgroundColor: "rgba(15,23,42,0.86)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.18)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  rewardText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
  },
  panelDivider: {
    height: 1,
    backgroundColor: "rgba(148,163,184,0.16)",
    marginVertical: 18,
  },
  progressTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressPercent: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  progressTrack: {
    height: 9,
    borderRadius: 999,
    backgroundColor: "rgba(30,41,59,0.92)",
    overflow: "hidden",
    marginTop: 12,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#38BDF8",
  },
  startButton: {
    height: 68,
    borderRadius: 16,
    marginTop: 28,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
  },
});