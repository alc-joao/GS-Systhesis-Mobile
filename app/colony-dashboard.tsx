import { useMemo } from "react";
import {
  Image,
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

type Planet = "Marte" | "Lua";
type ColonyStatus = "Estável" | "Alerta";

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

export default function ColonyDashboardScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    planet?: Planet;
    status?: ColonyStatus;
    day?: string;
    level?: string;
    xp?: string;
  }>();

  const colonyName = params.name || "Base Ares-01";
  const colonyPlanet = params.planet || "Marte";
  const colonyStatus = params.status || "Estável";
  const colonyDay = Number(params.day) || 23;
  const colonyLevel = Number(params.level) || 12;
  const colonyXp = Number(params.xp) || 2450;

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

  const colonyImage =
    colonyPlanet === "Marte"
      ? require("../assets/images/imgs/colheita-marte.png")
      : require("../assets/images/imgs/colheita-lua.png");

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

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/home")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.greeting}>Olá, Comandante! 👋</Text>
            <Text style={styles.subtitle}>{colonyName}</Text>
          </View>

          <Pressable onPress={() => router.push("/alerts")} style={styles.bellButton}>
            <Ionicons name="notifications-outline" size={25} color="#FFFFFF" />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </Pressable>
        </View>

        <View
          style={[
            styles.mainColonyCard,
            colonyPlanet === "Marte" ? styles.marsBorder : styles.moonBorder,
          ]}
        >
          <Image source={colonyImage} style={styles.colonyImage} resizeMode="cover" />

          <LinearGradient
            colors={[
              "rgba(0,0,0,0.2)",
              "rgba(0,0,0,0.1)",
              "rgba(0,0,0,0.86)",
            ]}
            locations={[0, 0.45, 1]}
            style={styles.cardOverlay}
          >
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.colonyTitle}>{colonyName}</Text>
                <Text style={styles.planetText}>{colonyPlanet}</Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  colonyStatus === "Alerta" && styles.statusAlert,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    colonyStatus === "Alerta" && styles.statusAlertText,
                  ]}
                >
                  {colonyStatus.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.colonyInfoRow}>
              <View>
                <Text style={styles.dayText}>DIA {colonyDay}</Text>
                <Text style={styles.expText}>
                  EXP {colonyXp.toLocaleString("pt-BR")} / 3.000
                </Text>

                <View style={styles.expTrack}>
                  <LinearGradient
                    colors={["#0EA5E9", "#38BDF8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.expFill,
                      { width: `${Math.min((colonyXp / 3000) * 100, 100)}%` },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.levelCircle}>
                <Text style={styles.levelLabel}>NÍVEL</Text>
                <Text style={styles.levelNumber}>{colonyLevel}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>RECURSOS DA COLÔNIA</Text>

        <View style={styles.resourcesGrid}>
          <ResourceCard icon="water" label="ÁGUA" value="72%" variation="+2%" color="#38BDF8" progress={72} />
          <ResourceCard icon="lightning-bolt" label="ENERGIA" value="68%" variation="-5%" color="#FACC15" progress={68} />
          <ResourceCard icon="cloud" label="OXIGÊNIO" value="81%" variation="+1%" color="#2DD4BF" progress={81} />
          <ResourceCard icon="food-apple" label="ALIMENTO" value="45%" variation="-8%" color="#EF4444" progress={45} />
          <ResourceCard icon="thermometer" label="TEMP." value="22°C" subtitle="Estável" color="#C084FC" progress={0} />
          <ResourceCard icon="account-group" label="TRIPULAÇÃO" value="12" subtitle="Saudável" color="#7DD3FC" progress={0} />
        </View>

        <View style={styles.eventCard}>
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>EVENTO ATIVO</Text>

            <View style={styles.eventRow}>
              <MaterialCommunityIcons name="weather-windy" size={22} color="#F97316" />
              <Text style={styles.eventName}>
                {colonyPlanet === "Marte" ? "Tempestade de Poeira" : "Radiação Solar"}
              </Text>
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

          <Ionicons name="warning-outline" size={48} color="rgba(148,163,184,0.28)" />
        </View>

        <Text style={styles.sectionTitle}>MISSÕES ATIVAS</Text>

        <MissionCard
          icon="rocket-outline"
          color="#60A5FA"
          title="Expandir produção de alimento"
          description="Construa uma nova estufa para aumentar a segurança alimentar."
        />

        <MissionCard
          icon="shield-checkmark-outline"
          color="#22C55E"
          title="Reforçar escudos da base"
          description="Proteja a colônia contra eventos extremos do ambiente."
        />
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
        <MaterialCommunityIcons name={icon} size={23} color={color} />
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

type MissionCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  description: string;
};

function MissionCard({ icon, color, title, description }: MissionCardProps) {
  return (
    <Pressable
      onPress={() => router.push("/mission-detail")}
      style={({ pressed }) => [
        styles.missionCard,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.85 },
      ]}
    >
      <View style={styles.missionIcon}>
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <View style={styles.missionContent}>
        <Text style={styles.missionTitle}>{title}</Text>
        <Text style={styles.missionDescription}>{description}</Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#94A3B8" />
    </Pressable>
  );
}

function BottomNav() {
  return (
    <View style={styles.bottomNav}>
      <NavItem icon="home-outline" label="Home" onPress={() => router.push("/home")} />
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
    backgroundColor: "#FFFFFF",
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
  content: {
    paddingHorizontal: 22,
    paddingTop: 52,
    paddingBottom: 120,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 5,
    textTransform: "uppercase",
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 5,
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
    height: 205,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "rgba(15,23,42,0.82)",
    marginBottom: 26,
  },
  marsBorder: {
    borderColor: "rgba(248,113,113,0.48)",
  },
  moonBorder: {
    borderColor: "rgba(56,189,248,0.36)",
  },
  colonyImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 18,
    justifyContent: "space-between",
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
    maxWidth: 220,
    textTransform: "uppercase",
    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  planetText: {
    color: "#E5E7EB",
    marginTop: 7,
    fontSize: 15,
    fontWeight: "800",
    textTransform: "uppercase",
    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  statusBadge: {
    backgroundColor: "rgba(22,101,52,0.88)",
    paddingHorizontal: 13,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statusAlert: {
    backgroundColor: "rgba(127,29,29,0.9)",
  },
  statusText: {
    color: "#86EFAC",
    fontSize: 13,
    fontWeight: "900",
  },
  statusAlertText: {
    color: "#FF755F",
  },
  colonyInfoRow: {
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
    width: 220,
    height: 7,
    borderRadius: 999,
    marginTop: 10,
    backgroundColor: "rgba(15,23,42,0.86)",
    overflow: "hidden",
  },
  expFill: {
    height: "100%",
    borderRadius: 999,
  },
  levelCircle: {
    width: 68,
    height: 68,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(56,189,248,0.78)",
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
    rowGap: 12,
    marginBottom: 26,
  },
  resourceCard: {
    width: "31%",
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
    fontSize: 24,
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
    marginBottom: 26,
    borderRadius: 18,
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventContent: {
    flex: 1,
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
  missionCard: {
    borderRadius: 18,
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  missionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(96,165,250,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  missionContent: {
    flex: 1,
  },
  missionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 5,
  },
  missionDescription: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
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