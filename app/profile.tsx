import { useMemo } from "react";
import {
  Image,
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

export default function ProfileScreen() {
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

  function handleLogout() {
    router.replace("/login");
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
          "rgba(37,99,235,0.24)",
          "rgba(14,165,233,0.08)",
          "rgba(2,6,23,0)",
        ]}
        style={styles.topGlow}
      />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={31} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.title}>PERFIL</Text>

        <Pressable style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={23} color="#CBD5E1" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[
            "rgba(96,165,250,0.20)",
            "rgba(8,21,38,0.92)",
            "rgba(8,21,38,0.72)",
          ]}
          style={styles.heroCard}
        >
          <View style={styles.avatarRingOuter}>
            <View style={styles.avatarRing}>
              <Image
                source={require("../assets/images/imgs/avatar-perfil.png")}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
          </View>

          <Text style={styles.playerName}>AstroBea</Text>
          <Text style={styles.playerRole}>Comandante da Base Ares-01</Text>

          <View style={styles.rankBadge}>
            <Ionicons name="planet-outline" size={15} color="#60A5FA" />
            <Text style={styles.rankBadgeText}>Liga Orbital</Text>
          </View>
        </LinearGradient>

        <View style={styles.levelCard}>
          <View style={styles.levelBox}>
            <Text style={styles.levelLabel}>NÍVEL</Text>
            <Text style={styles.levelNumber}>12</Text>
          </View>

          <View style={styles.xpArea}>
            <View style={styles.xpTop}>
              <Text style={styles.xpTitle}>Progresso para o próximo nível</Text>
              <Text style={styles.xpText}>2.450 / 3.000 XP</Text>
            </View>

            <View style={styles.xpTrack}>
              <View style={styles.xpFill} />
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatBox icon="flag-checkered" label="Missões" value="12" />
          <StatBox icon="star-four-points" label="Pontuação" value="2.450" />
          <StatBox icon="rocket-launch" label="Colônias" value="2" />
        </View>

        <View style={styles.achievementCard}>
          <View>
            <Text style={styles.achievementLabel}>CONQUISTA RECENTE</Text>
            <Text style={styles.achievementTitle}>Primeira Colheita</Text>
            <Text style={styles.achievementText}>
              Você concluiu uma missão agrícola em ambiente extremo.
            </Text>
          </View>

          <View style={styles.achievementIcon}>
            <MaterialCommunityIcons name="sprout" size={30} color="#22C55E" />
          </View>
        </View>

        <View style={styles.menuCard}>
          <MenuItem icon="trophy-outline" label="Conquistas" />
          <MenuItem icon="settings-outline" label="Configurações" />
          <MenuItem icon="help-circle-outline" label="Ajuda e Suporte" />
          <MenuItem
            icon="log-out-outline"
            label="Sair da Conta"
            danger
            onPress={handleLogout}
          />
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

type StatBoxProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
};

function StatBox({ icon, label, value }: StatBoxProps) {
  return (
    <View style={styles.statBox}>
      <View style={styles.statIconBox}>
        <MaterialCommunityIcons name={icon} size={20} color="#60A5FA" />
      </View>

      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
  onPress?: () => void;
};

function MenuItem({ icon, label, danger, onPress }: MenuItemProps) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={[styles.menuIconBox, danger && styles.menuIconBoxDanger]}>
          <Ionicons
            name={icon}
            size={19}
            color={danger ? "#FB7185" : "#60A5FA"}
          />
        </View>

        <Text style={[styles.menuText, danger && styles.menuTextDanger]}>
          {label}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#64748B" />
    </Pressable>
  );
}

function BottomNav() {
  return (
    <View style={styles.bottomNav}>
      <NavItem
        icon="home-outline"
        label="Home"
        onPress={() => router.push("/home")}
      />

      <NavItem
        icon="create-outline"
        label="Missões"
        onPress={() => router.push("/missions")}
      />

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
        icon="person"
        label="Perfil"
        active
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
  topGlow: {
    position: "absolute",
    top: 0,
    left: -40,
    right: -40,
    height: 360,
  },
  header: {
    paddingTop: 62,
    paddingHorizontal: 22,
    height: 112,
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
  settingsButton: {
    width: 42,
    height: 42,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 122,
    zIndex: 10,
  },
  heroCard: {
    minHeight: 244,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.30)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  avatarRingOuter: {
    width: 128,
    height: 128,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.35)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(37,99,235,0.08)",
    shadowColor: "#60A5FA",
    shadowOpacity: 0.45,
    shadowRadius: 22,
    elevation: 10,
  },
  avatarRing: {
    width: 112,
    height: 112,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#60A5FA",
    backgroundColor: "rgba(15,23,42,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "92%",
    height: "92%",
    borderRadius: 999,
  },
  playerName: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 14,
  },
  playerRole: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4,
  },
  rankBadge: {
    height: 32,
    borderRadius: 999,
    paddingHorizontal: 13,
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.28)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  rankBadgeText: {
    color: "#DBEAFE",
    fontSize: 12,
    fontWeight: "900",
  },
  levelCard: {
    minHeight: 92,
    borderRadius: 20,
    padding: 14,
    backgroundColor: "rgba(8,21,38,0.88)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.24)",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  levelBox: {
    width: 76,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(15,23,42,0.90)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  levelLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  levelNumber: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 1,
  },
  xpArea: {
    flex: 1,
  },
  xpTop: {
    marginBottom: 10,
  },
  xpTitle: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 4,
  },
  xpText: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "900",
  },
  xpTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(30,41,59,0.94)",
    overflow: "hidden",
  },
  xpFill: {
    width: "82%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#38BDF8",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    minHeight: 116,
    borderRadius: 18,
    backgroundColor: "rgba(8,21,38,0.88)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.20)",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  statIconBox: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: "rgba(37,99,235,0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  statLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4,
  },
  achievementCard: {
    minHeight: 116,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(22,101,52,0.15)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.28)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  achievementLabel: {
    color: "#22C55E",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  achievementTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 5,
  },
  achievementText: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
    marginTop: 5,
    maxWidth: 245,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(22,101,52,0.24)",
    alignItems: "center",
    justifyContent: "center",
  },
  menuCard: {
    borderRadius: 20,
    backgroundColor: "rgba(8,21,38,0.88)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.22)",
    overflow: "hidden",
  },
  menuItem: {
    minHeight: 62,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148,163,184,0.10)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconBox: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(37,99,235,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconBoxDanger: {
    backgroundColor: "rgba(251,113,133,0.12)",
  },
  menuText: {
    color: "#CBD5E1",
    fontSize: 15,
    fontWeight: "900",
  },
  menuTextDanger: {
    color: "#FB7185",
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