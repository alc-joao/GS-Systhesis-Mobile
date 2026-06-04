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
import { Ionicons } from "@expo/vector-icons";

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

type Player = {
  id: string;
  name: string;
  xp: number;
  rank: number;
  avatar: number;
  title: string;
};

const players: Player[] = [
  {
    id: "1",
    name: "LaraCmdr",
    xp: 2450,
    rank: 1,
    title: "Comandante Elite",
    avatar: require("../assets/images/imgs/avatar-ranking-1.png"),
  },
  {
    id: "2",
    name: "OrbitX",
    xp: 2150,
    rank: 2,
    title: "Piloto Lunar",
    avatar: require("../assets/images/imgs/avatar-ranking-2.png"),
  },
  {
    id: "3",
    name: "SpaceWalker",
    xp: 1980,
    rank: 3,
    title: "Explorador Orbital",
    avatar: require("../assets/images/imgs/avatar-perfil.png"),
  },
  {
    id: "4",
    name: "StarLord",
    xp: 1320,
    rank: 4,
    title: "Engenheiro",
    avatar: require("../assets/images/imgs/avatar-ranking-1.png"),
  },
  {
    id: "5",
    name: "AstroBea",
    xp: 1250,
    rank: 5,
    title: "Você",
    avatar: require("../assets/images/imgs/avatar-perfil.png"),
  },
  {
    id: "6",
    name: "GalaxyMaker",
    xp: 1100,
    rank: 6,
    title: "Pesquisador",
    avatar: require("../assets/images/imgs/avatar-ranking-2.png"),
  },
  {
    id: "7",
    name: "MoonRider",
    xp: 980,
    rank: 7,
    title: "Cadete Lunar",
    avatar: require("../assets/images/imgs/avatar-ranking-1.png"),
  },
];

export default function RankingScreen() {
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

  const champion = players[0];
  const second = players[1];
  const third = players[2];
  const others = players.slice(3);
  const currentUser = players.find((player) => player.name === "AstroBea");

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
          "rgba(250,204,21,0.14)",
          "rgba(59,130,246,0.05)",
          "rgba(2,6,23,0)",
        ]}
        style={styles.topGlow}
      />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={31} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.title}>RANKING</Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.seasonCard}>
          <View>
            <Text style={styles.seasonLabel}>TEMPORADA 01</Text>
            <Text style={styles.seasonTitle}>Liga Orbital</Text>
          </View>

          <View style={styles.seasonBadge}>
            <Ionicons name="trophy" size={18} color="#FACC15" />
            <Text style={styles.seasonBadgeText}>Top 5</Text>
          </View>
        </View>

        <LinearGradient
          colors={[
            "rgba(250,204,21,0.22)",
            "rgba(15,23,42,0.92)",
            "rgba(8,21,38,0.82)",
          ]}
          style={styles.championCard}
        >
          <Text style={styles.crown}>👑</Text>

          <View style={styles.championAvatarRing}>
            <Image
              source={champion.avatar}
              style={styles.championAvatar}
              resizeMode="cover"
            />

            <View style={styles.championRank}>
              <Text style={styles.championRankText}>1</Text>
            </View>
          </View>

          <Text style={styles.championName}>{champion.name}</Text>
          <Text style={styles.championTitle}>{champion.title}</Text>
          <Text style={styles.championXp}>
            {champion.xp.toLocaleString("pt-BR")} XP
          </Text>
        </LinearGradient>

        <View style={styles.podiumSide}>
          <PodiumMini player={second} color="#38BDF8" />
          <PodiumMini player={third} color="#F97316" />
        </View>

        {currentUser && (
          <View style={styles.yourPositionCard}>
            <View>
              <Text style={styles.yourPositionLabel}>SUA POSIÇÃO</Text>
              <Text style={styles.yourPositionText}>
                #{currentUser.rank} no ranking geral
              </Text>
            </View>

            <Text style={styles.yourPositionXp}>
              {currentUser.xp.toLocaleString("pt-BR")} XP
            </Text>
          </View>
        )}

        <View style={styles.list}>
          {others.map((player) => (
            <RankingRow key={player.id} player={player} />
          ))}
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function PodiumMini({ player, color }: { player: Player; color: string }) {
  return (
    <View style={styles.podiumMiniCard}>
      <View style={[styles.miniAvatarRing, { borderColor: color }]}>
        <Image source={player.avatar} style={styles.miniAvatar} />

        <View style={[styles.miniRank, { backgroundColor: color }]}>
          <Text style={styles.miniRankText}>{player.rank}</Text>
        </View>
      </View>

      <View style={styles.miniInfo}>
        <Text style={styles.miniName}>{player.name}</Text>
        <Text style={styles.miniTitle}>{player.title}</Text>
      </View>

      <Text style={[styles.miniXp, { color }]}>
        {player.xp.toLocaleString("pt-BR")} XP
      </Text>
    </View>
  );
}

function RankingRow({ player }: { player: Player }) {
  const isCurrentUser = player.name === "AstroBea";
  const progress = Math.min((player.xp / 3000) * 100, 100);

  return (
    <View style={[styles.rankingRow, isCurrentUser && styles.currentUserRow]}>
      <Text style={styles.rowRank}>{player.rank}</Text>

      <Image source={player.avatar} style={styles.rowAvatar} />

      <View style={styles.rowMiddle}>
        <View style={styles.rowNameLine}>
          <Text style={styles.rowName}>{player.name}</Text>
          {isCurrentUser && <Text style={styles.youBadge}>VOCÊ</Text>}
        </View>

        <Text style={styles.rowTitle}>{player.title}</Text>

        <View style={styles.rowProgressTrack}>
          <View style={[styles.rowProgressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <Text style={styles.rowXp}>{player.xp.toLocaleString("pt-BR")} XP</Text>
    </View>
  );
}

function BottomNav() {
  return (
    <View style={styles.bottomNav}>
      <NavItem icon="home-outline" label="Home" onPress={() => router.push("/home")} />
      <NavItem icon="create-outline" label="Missões" onPress={() => router.push("/missions")} />
      <NavItem icon="notifications-outline" label="Alertas" onPress={() => router.push("/alerts")} />
      <NavItem icon="trophy" label="Ranking" active onPress={() => router.push("/ranking")} />
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
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  headerSpace: {
    width: 42,
    height: 42,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 122,
    zIndex: 10,
  },
  seasonCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "rgba(8,21,38,0.82)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.22)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seasonLabel: {
    color: "#60A5FA",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  seasonTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
    marginTop: 4,
  },
  seasonBadge: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(250,204,21,0.13)",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.32)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  seasonBadgeText: {
    color: "#FACC15",
    fontSize: 12,
    fontWeight: "900",
  },
  championCard: {
    minHeight: 255,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    overflow: "hidden",
  },
  crown: {
    fontSize: 34,
    marginBottom: 4,
  },
  championAvatarRing: {
    width: 118,
    height: 118,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "#FACC15",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(2,6,23,0.9)",
  },
  championAvatar: {
    width: "91%",
    height: "91%",
    borderRadius: 999,
  },
  championRank: {
    position: "absolute",
    bottom: -13,
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#FACC15",
    borderWidth: 3,
    borderColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
  },
  championRankText: {
    color: "#020617",
    fontSize: 15,
    fontWeight: "900",
  },
  championName: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    marginTop: 22,
  },
  championTitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 3,
  },
  championXp: {
    color: "#FACC15",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 8,
  },
  podiumSide: {
    gap: 12,
    marginBottom: 14,
  },
  podiumMiniCard: {
    minHeight: 78,
    borderRadius: 18,
    backgroundColor: "rgba(8,21,38,0.84)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.16)",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  miniAvatarRing: {
    width: 54,
    height: 54,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  miniAvatar: {
    width: "90%",
    height: "90%",
    borderRadius: 999,
  },
  miniRank: {
    position: "absolute",
    bottom: -8,
    width: 23,
    height: 23,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
  },
  miniRankText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },
  miniInfo: {
    flex: 1,
  },
  miniName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  miniTitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },
  miniXp: {
    fontSize: 14,
    fontWeight: "900",
  },
  yourPositionCard: {
    minHeight: 72,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "rgba(37,99,235,0.18)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.44)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  yourPositionLabel: {
    color: "#60A5FA",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.3,
  },
  yourPositionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 4,
  },
  yourPositionXp: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  list: {
    gap: 12,
  },
  rankingRow: {
    minHeight: 76,
    borderRadius: 16,
    backgroundColor: "rgba(8,21,38,0.82)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.12)",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  currentUserRow: {
    backgroundColor: "rgba(14,116,144,0.24)",
    borderColor: "rgba(56,189,248,0.38)",
  },
  rowRank: {
    width: 27,
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "900",
  },
  rowAvatar: {
    width: 38,
    height: 38,
    borderRadius: 999,
    marginRight: 12,
  },
  rowMiddle: {
    flex: 1,
  },
  rowNameLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  rowName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  youBadge: {
    color: "#38BDF8",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  rowTitle: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },
  rowProgressTrack: {
    width: "92%",
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(30,41,59,0.9)",
    overflow: "hidden",
    marginTop: 7,
  },
  rowProgressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#38BDF8",
  },
  rowXp: {
    color: "#CBD5E1",
    fontSize: 12,
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