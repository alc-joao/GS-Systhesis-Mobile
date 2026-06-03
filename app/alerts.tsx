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

type AlertFilter = "Todos" | "Não lidos" | "Lidos";
type AlertType = "critical" | "warning" | "attention" | "info";

type ColonyAlert = {
  id: string;
  type: AlertType;
  label: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

const alerts: ColonyAlert[] = [
  {
    id: "1",
    type: "critical",
    label: "CRÍTICO",
    title: "Nível de Alimento Muito Baixo",
    description:
      "A produção de alimentos não está atendendo à demanda da tripulação.",
    time: "Agora",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    label: "ALERTA",
    title: "Tempestade de Poeira se Aproximando",
    description: "Uma forte tempestade pode afetar a geração de energia solar.",
    time: "2 min atrás",
    read: false,
  },
  {
    id: "3",
    type: "attention",
    label: "ATENÇÃO",
    title: "Oxigênio em Queda",
    description: "Verifique os sistemas de filtragem de oxigênio.",
    time: "15 min atrás",
    read: false,
  },
  {
    id: "4",
    type: "info",
    label: "INFO",
    title: "Missão Concluída",
    description: 'Parabéns! Você completou a missão "Água é Vida".',
    time: "1h atrás",
    read: true,
  },
];

export default function AlertsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<AlertFilter>("Todos");

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

  const unreadCount = alerts.filter((alert) => !alert.read).length;

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedFilter === "Não lidos") return !alert.read;
    if (selectedFilter === "Lidos") return alert.read;
    return true;
  });

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
        <Pressable style={styles.headerIconButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={31} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.title}>ALERTAS</Text>

        <Pressable style={styles.headerIconButton}>
          <Ionicons name="options-outline" size={25} color="#CBD5E1" />
        </Pressable>
      </View>

      <View style={styles.filtersContainer}>
        <FilterButton
          label="Todos"
          active={selectedFilter === "Todos"}
          onPress={() => setSelectedFilter("Todos")}
        />

        <FilterButton
          label="Não lidos"
          active={selectedFilter === "Não lidos"}
          onPress={() => setSelectedFilter("Não lidos")}
        />

        <FilterButton
          label="Lidos"
          active={selectedFilter === "Lidos"}
          onPress={() => setSelectedFilter("Lidos")}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </ScrollView>

      <BottomNav unreadCount={unreadCount} />
    </View>
  );
}

type FilterButtonProps = {
  label: AlertFilter;
  active: boolean;
  onPress: () => void;
};

function FilterButton({ label, active, onPress }: FilterButtonProps) {
  return (
    <Pressable
      style={[styles.filterButton, active && styles.filterButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

type AlertCardProps = {
  alert: ColonyAlert;
};

function AlertCard({ alert }: AlertCardProps) {
  const color = getAlertColor(alert.type);

  return (
    <View style={styles.alertCard}>
      <View style={[styles.alertSideBar, { backgroundColor: color }]} />

      <View style={styles.alertContent}>
        <View style={styles.alertHeader}>
          <View style={styles.alertTypeBox}>
            <View style={[styles.alertDot, { backgroundColor: color }]}>
              <Ionicons
                name={getAlertIcon(alert.type)}
                size={11}
                color="#FFFFFF"
              />
            </View>

            <Text style={[styles.alertLabel, { color }]}>{alert.label}</Text>
          </View>

          <Text style={styles.alertTime}>{alert.time}</Text>
        </View>

        <Text style={styles.alertTitle}>{alert.title}</Text>
        <Text style={styles.alertDescription}>{alert.description}</Text>
      </View>
    </View>
  );
}

function getAlertColor(type: AlertType) {
  if (type === "critical") return "#EF4444";
  if (type === "warning") return "#F97316";
  if (type === "attention") return "#FACC15";
  return "#38BDF8";
}

function getAlertIcon(type: AlertType): keyof typeof Ionicons.glyphMap {
  if (type === "critical") return "alert";
  if (type === "warning") return "warning";
  if (type === "attention") return "information";
  return "checkmark";
}

function BottomNav({ unreadCount }: { unreadCount: number }) {
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
        icon="notifications"
        label="Alertas"
        active
        badge={unreadCount}
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
  badge?: number;
  onPress: () => void;
};

function NavItem({ icon, label, active, badge, onPress }: NavItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.navItem}>
      <View>
        <Ionicons name={icon} size={25} color={active ? "#60A5FA" : "#94A3B8"} />

        {!!badge && badge > 0 && (
          <View style={styles.navBadge}>
            <Text style={styles.navBadgeText}>{badge}</Text>
          </View>
        )}
      </View>

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
  headerIconButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  filtersContainer: {
    height: 48,
    marginHorizontal: 22,
    marginBottom: 24,
    flexDirection: "row",
    gap: 10,
    zIndex: 10,
  },
  filterButton: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.74)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonActive: {
    backgroundColor: "#4F63D9",
    borderColor: "rgba(96,165,250,0.55)",
  },
  filterText: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "900",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 122,
    zIndex: 10,
  },
  alertCard: {
    minHeight: 142,
    borderRadius: 16,
    backgroundColor: "rgba(8,21,38,0.84)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.13)",
    marginBottom: 17,
    overflow: "hidden",
    flexDirection: "row",
  },
  alertSideBar: {
    width: 3,
    height: "100%",
  },
  alertContent: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },
  alertTypeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  alertDot: {
    width: 19,
    height: 19,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  alertLabel: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  alertTime: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "800",
  },
  alertTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 23,
    marginBottom: 9,
  },
  alertDescription: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
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
  navBadge: {
    position: "absolute",
    top: -9,
    right: -13,
    minWidth: 21,
    height: 21,
    borderRadius: 999,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  navBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },
});