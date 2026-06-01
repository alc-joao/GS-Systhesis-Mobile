import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../src/theme";

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

export default function LoaderScreen() {
  const [progress, setProgress] = useState(0);
  const { width, height } = useWindowDimensions();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setTimeout(() => router.replace("/login"), 2000);
          return 100;
        }
        return old + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

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

      <View style={[styles.logoContainer, { top: height * 0.0 }]}>
        <Image
          source={require("../assets/images/imgs/logo-systhesis.png")}
          style={{
            width: width * 1.50,
            height: width * 1.20,
          }}
          resizeMode="contain"
        />
      </View>

      <View
        style={[
          styles.marsContainer,
          {
            width: width * 1.08,
            height: width * 1.08,
            top: height * 0.46,
          },
        ]}
      >
        <View style={styles.marsGlow} />

        <Image
          source={require("../assets/images/imgs/mars.png")}
          style={styles.mars}
          resizeMode="contain"
        />

        <LinearGradient
          colors={[
            "rgba(255,190,120,0.15)",
            "rgba(2,6,23,0.05)",
            "rgba(2,6,23,0.90)",
          ]}
          locations={[0, 0.50, 1]}
          style={styles.marsFade}
        />
      </View>

      <LinearGradient
        colors={["rgba(2,6,23,0)", "rgba(2,6,23,0.92)", "#020617"]}
        locations={[0, 0.55, 1]}
        style={styles.bottomDark}
      />

      <View style={[styles.loadingContainer, { bottom: height * 0.10 }]}>
        <Text style={styles.loadingText}>
          {progress < 100 ? "Inicializando colônia..." : "Preparando sistemas..."}
        </Text>

        <View style={styles.progressTrack}>
          <LinearGradient
            colors={["#06B6D4", "#38BDF8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>

        <Text style={styles.progressText}>{progress}%</Text>
      </View>
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

  logoContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },

  marsContainer: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },

  marsGlow: {
    position: "absolute",
    width: "108%",
    height: "108%",
    borderRadius: 999,
    backgroundColor: "rgba(249,115,22,0.15)",
  },

  mars: {
    width: "100%",
    height: "100%",
    opacity: 0.91,
  },

  marsFade: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
  },

  bottomDark: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    zIndex: 7,
  },

  loadingContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 12,
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 14,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },

  progressTrack: {
    width: "72%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(30,41,59,0.95)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  progressText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 16,
    letterSpacing: 2,
  },
});