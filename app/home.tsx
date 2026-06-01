import { useMemo } from "react";
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

export default function HomeScreen() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 180 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() > 0.9 ? 2.2 : 1.1,
        opacity: Math.random() * 0.8 + 0.2,
      })),
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <LinearGradient
        colors={["#020617", "#030712", "#061021", "#020617"]}
        locations={[0, 0.35, 0.7, 1]}
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
          "rgba(59,130,246,0.16)",
          "rgba(168,85,247,0.14)",
          "rgba(2,6,23,0)",
        ]}
        locations={[0, 0.35, 0.65, 1]}
        style={styles.milkyWay}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, Comandante! 👋</Text>

          <Pressable onPress={() => router.push("/alerts")} style={styles.bellButton}>
            <Ionicons name="notifications-outline" size={25} color="#FFFFFF" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.mainColonyCard}>
          <LinearGradient
            colors={[
              "rgba(127,29,29,0.72)",
              "rgba(88,28,135,0.28)",
              "rgba(15,23,42,0.86)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.planetGlow} />
          <View style={styles.dome} />
          <View style={styles.domeBase} />
          <View style={styles.antenna} />

          <View style={styles.cardTop}>
            <View>
              <Text style={styles.colonyTitle}>BASE ARES-01</Text>
              <Text style={styles.planetText}>MARTE</Text>
            </View>

            <View style={styles.statusStable}>
              <Text style={styles.statusStableText}>ESTÁVEL</Text>
            </View>
          </View>

          <View style={styles.colonyInfoRow}>
            <View>
              <Text style={styles.dayText}>DIA 23</Text>
              <Text style={styles.expText}>EXP 2.450 / 3.000</Text>

              <View style={styles.expTrack}>
                <LinearGradient
                  colors={["#0EA5E9", "#38BDF8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.expFill}
                />
              </View>
            </View>

            <View style={styles.levelCircle}>
              <Text style={styles.levelLabel}>NÍVEL</Text>
              <Text style={styles.levelNumber}>12</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>RECURSOS DA COLÔNIA</Text>

        <View style={styles.resourcesGrid}>
          <ResourceCard
            icon="water"
            label="ÁGUA"
            value="72%"
            variation="+2%"
            color="#38BDF8"
            progress={72}
          />

          <ResourceCard
            icon="lightning-bolt"
            label="ENERGIA"
            value="68%"
            variation="-5%"
            color="#FACC15"
            progress={68}
          />

          <ResourceCard
            icon="cloud"
            label="OXIGÊNIO"
            value="81%"
            variation="+1%"
            color="#2DD4BF"
            progress={81}
          />

          <ResourceCard
            icon="food-apple"
            label="ALIMENTO"
            value="45%"
            color="#EF4444"
            progress={45}
          />

          <ResourceCard
            icon="thermometer"
            label="TEMPERATURA"
            value="22°C"
            subtitle="Estável"
            color="#C084FC"
            progress={0}
          />

          <ResourceCard
            icon="account-group"
            label="TRIPULAÇÃO"
            value="12"
            subtitle="Saudável"
            color="#7DD3FC"
            progress={0}
          />
        </View>

        <View style={styles.eventCard}>
          <View>
            <Text style={styles.eventTitle}>EVENTO ATIVO</Text>

            <View style={styles.eventRow}>
              <MaterialCommunityIcons name="weather-windy" size={22} color="#F97316" />
              <Text style={styles.eventName}>Tempestade de Poeira</Text>
            </View>

            <Text style={styles.eventDescription}>
              Impacto: -15% na geração de energia
            </Text>

            <View style={styles.eventRow}>
              <MaterialCommunityIcons name="timer-sand" size={21} color="#EF4444" />
              <Text style={styles.eventTime}>
                Tempo restante: <Text style={styles.eventTimeStrong}>02h 14m</Text>
              </Text>
            </View>
          </View>

          <Ionicons name="rainy" size={48} color="rgba(148,163,184,0.28)" />
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

type ResourceCardProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
  variation?: string;
  subtitle?: string;
  color: string;
  progress: number;
};

function ResourceCard({
  icon,
  label,
  value,
  variation,
  subtitle,
  color,
  progress,
}: ResourceCardProps) {
  return (
    <View style={styles.resourceCard}>
      <View style={styles.resourceHeader}>
        <MaterialCommunityIcons name={icon} size={24} color={color} />
        <Text style={[styles.resourceLabel, { color }]}>{label}</Text>
      </View>

      <View style={styles.resourceValueRow}>
        <Text style={[styles.resourceValue, { color }]}>{value}</Text>

        {!!variation && (
          <Text
            style={[
              styles.resourceVariation,
              { color: variation.includes("-") ? "#F87171" : "#5EEAD4" },
            ]}
          >
            {variation}
          </Text>
        )}
      </View>

      {!!subtitle && <Text style={styles.resourceSubtitle}>{subtitle}</Text>}

      {progress > 0 && (
        <View style={styles.resourceTrack}>
          <View
            style={[
              styles.resourceFill,
              {
                width: `${progress}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      )}
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
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
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

  milkyWay: {
    position: "absolute",
    top: -80,
    left: "34%",
    width: 130,
    height: "120%",
    borderRadius: 100,
    transform: [{ rotate: "18deg" }],
    opacity: 0.8,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 52,
    paddingBottom: 120,
    zIndex: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },

  greeting: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  bellButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    position: "absolute",
    top: 3,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  mainColonyCard: {
    height: 185,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(248,113,113,0.48)",
    backgroundColor: "rgba(15,23,42,0.82)",
    padding: 18,
    marginBottom: 26,
  },

  planetGlow: {
    position: "absolute",
    right: 48,
    top: 42,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(249,115,22,0.18)",
  },

  dome: {
    position: "absolute",
    right: 92,
    bottom: 56,
    width: 110,
    height: 56,
    borderTopLeftRadius: 110,
    borderTopRightRadius: 110,
    borderWidth: 2,
    borderColor: "rgba(226,232,240,0.48)",
    backgroundColor: "rgba(148,163,184,0.16)",
  },

  domeBase: {
    position: "absolute",
    right: 78,
    bottom: 45,
    width: 140,
    height: 16,
    borderRadius: 6,
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.22)",
  },

  antenna: {
    position: "absolute",
    right: 95,
    bottom: 62,
    width: 3,
    height: 56,
    backgroundColor: "rgba(226,232,240,0.45)",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 4,
  },

  colonyTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  planetText: {
    color: "#E5E7EB",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "800",
  },

  statusStable: {
    backgroundColor: "rgba(22,101,52,0.82)",
    paddingHorizontal: 13,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  statusStableText: {
    color: "#86EFAC",
    fontSize: 13,
    fontWeight: "900",
  },

  colonyInfoRow: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    zIndex: 4,
  },

  dayText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },

  expText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 6,
  },

  expTrack: {
    width: 230,
    height: 7,
    borderRadius: 999,
    marginTop: 10,
    backgroundColor: "rgba(15,23,42,0.86)",
    overflow: "hidden",
  },

  expFill: {
    width: "82%",
    height: "100%",
    borderRadius: 999,
  },

  levelCircle: {
    width: 68,
    height: 68,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(148,163,184,0.7)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.82)",
  },

  levelLabel: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "900",
  },

  levelNumber: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginTop: -2,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 14,
    letterSpacing: 0.4,
  },

  resourcesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  resourceCard: {
    width: "30.8%",
    minHeight: 106,
    borderRadius: 13,
    padding: 11,
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
  },

  resourceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  resourceLabel: {
    fontSize: 10,
    fontWeight: "900",
  },

  resourceValueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 12,
    gap: 4,
  },

  resourceValue: {
    fontSize: 25,
    fontWeight: "900",
  },

  resourceVariation: {
    fontSize: 10,
    fontWeight: "900",
    marginBottom: 4,
  },

  resourceSubtitle: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  resourceTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(51,65,85,0.8)",
    marginTop: 12,
    overflow: "hidden",
  },

  resourceFill: {
    height: "100%",
    borderRadius: 999,
  },

  eventCard: {
    marginTop: 26,
    borderRadius: 18,
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eventTitle: {
    color: "#F87171",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 18,
  },

  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },

  eventName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  eventDescription: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 32,
    marginBottom: 10,
  },

  eventTime: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "800",
  },

  eventTimeStrong: {
    color: "#F97316",
    fontWeight: "900",
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