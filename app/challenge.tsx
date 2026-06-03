import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Planet = "Marte" | "Lua";

type Star = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

type Alternative = {
  id: string;
  label: string;
};

type Question = {
  statement: string;
  question: string;
  alternatives: Alternative[];
  correctId: string;
};

const marsQuestions: Question[] = [
  {
    statement:
      "Uma tempestade reduziu a geração de energia da colônia em 35%. Você possui 1200 kWh armazenados.",
    question: "Quantos kWh restarão após a tempestade?",
    alternatives: [
      { id: "A", label: "720 kWh" },
      { id: "B", label: "780 kWh" },
      { id: "C", label: "820 kWh" },
      { id: "D", label: "880 kWh" },
    ],
    correctId: "B",
  },
  {
    statement:
      "A estufa marciana consome 40 litros de água por dia. O reservatório possui 280 litros disponíveis.",
    question: "Por quantos dias a estufa pode funcionar?",
    alternatives: [
      { id: "A", label: "5 dias" },
      { id: "B", label: "6 dias" },
      { id: "C", label: "7 dias" },
      { id: "D", label: "8 dias" },
    ],
    correctId: "C",
  },
  {
    statement:
      "A produção inicial gerou 18 unidades de alimento. Uma melhoria aumenta essa produção em 50%.",
    question: "Qual será a nova produção?",
    alternatives: [
      { id: "A", label: "24 unidades" },
      { id: "B", label: "27 unidades" },
      { id: "C", label: "30 unidades" },
      { id: "D", label: "36 unidades" },
    ],
    correctId: "B",
  },
];

const moonQuestions: Question[] = [
  {
    statement:
      "A base lunar perdeu 25% da energia após uma falha nos painéis solares. Ela possuía 800 kWh armazenados.",
    question: "Quantos kWh restaram na base?",
    alternatives: [
      { id: "A", label: "500 kWh" },
      { id: "B", label: "560 kWh" },
      { id: "C", label: "600 kWh" },
      { id: "D", label: "640 kWh" },
    ],
    correctId: "C",
  },
  {
    statement:
      "Uma plantação lunar precisa de 15 litros de água por ciclo. Há 90 litros disponíveis.",
    question: "Quantos ciclos podem ser realizados?",
    alternatives: [
      { id: "A", label: "4 ciclos" },
      { id: "B", label: "5 ciclos" },
      { id: "C", label: "6 ciclos" },
      { id: "D", label: "7 ciclos" },
    ],
    correctId: "C",
  },
  {
    statement:
      "O módulo lunar produziu 12 unidades de alimento. Uma melhoria aumentou a produção em 25%.",
    question: "Qual será a nova produção?",
    alternatives: [
      { id: "A", label: "13 unidades" },
      { id: "B", label: "14 unidades" },
      { id: "C", label: "15 unidades" },
      { id: "D", label: "18 unidades" },
    ],
    correctId: "C",
  },
];

export default function ChallengeScreen() {
  const params = useLocalSearchParams<{
    title?: string;
    difficulty?: string;
    progress?: string;
    planet?: Planet;
  }>();

  const planet: Planet = params.planet === "Lua" ? "Lua" : "Marte";
  const questions = planet === "Lua" ? moonQuestions : marsQuestions;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(
    null
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finished, setFinished] = useState(false);

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

  const currentQuestion = questions[questionIndex];
  const totalQuestions = questions.length;

  function handleConfirmAnswer() {
    if (!selectedAlternative) return;

    if (selectedAlternative === currentQuestion.correctId) {
      setCorrectAnswers((current) => current + 1);
    }

    if (questionIndex + 1 >= totalQuestions) {
      setFinished(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAlternative(null);
  }

  function handleFinishMission() {
    router.push("/missions");
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

        <Text style={styles.headerTitle}>
          {finished ? "RESULTADO" : "DESAFIO"}
        </Text>

        <Text style={styles.counter}>
          {finished
            ? `${correctAnswers}/${totalQuestions}`
            : `${questionIndex + 1}/${totalQuestions}`}
        </Text>
      </View>

      {!finished ? (
        <View style={styles.content}>
          <Text style={styles.planetLabel}>{planet.toUpperCase()}</Text>

          <View style={styles.questionCard}>
            <Text style={styles.statement}>{currentQuestion.statement}</Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>

          <View style={styles.alternatives}>
            {currentQuestion.alternatives.map((alternative) => {
              const selected = selectedAlternative === alternative.id;

              return (
                <Pressable
                  key={alternative.id}
                  style={[
                    styles.alternativeButton,
                    selected && styles.alternativeButtonSelected,
                  ]}
                  onPress={() => setSelectedAlternative(alternative.id)}
                >
                  <View
                    style={[
                      styles.alternativeCircle,
                      selected && styles.alternativeCircleSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.alternativeLetter,
                        selected && styles.alternativeLetterSelected,
                      ]}
                    >
                      {alternative.id}
                    </Text>
                  </View>

                  <Text style={styles.alternativeText}>{alternative.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            style={[
              styles.confirmButton,
              !selectedAlternative && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirmAnswer}
          >
            <Text style={styles.confirmButtonText}>Confirmar Resposta</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.resultContent}>
          <View style={styles.resultCard}>
            <View style={styles.resultIcon}>
              <Ionicons name="checkmark" size={42} color="#020617" />
            </View>

            <Text style={styles.resultTitle}>Missão concluída</Text>

            <Text style={styles.resultSubtitle}>
              Você acertou {correctAnswers} de {totalQuestions} desafios em{" "}
              {planet} e garantiu novas recompensas para a colônia.
            </Text>

            <View style={styles.rewardsGrid}>
              <RewardItem icon="star-four-points" label="+200 XP" />
              <RewardItem icon="flask" label="+50 Pesquisa" />
              <RewardItem icon="water" label="+12 Água" />
              <RewardItem icon="food-apple" label="+8 Comida" />
            </View>
          </View>

          <Pressable style={styles.finishButton} onPress={handleFinishMission}>
            <Text style={styles.finishButtonText}>Voltar para missões</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

type RewardItemProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
};

function RewardItem({ icon, label }: RewardItemProps) {
  return (
    <View style={styles.rewardItem}>
      <MaterialCommunityIcons name={icon} size={22} color="#60A5FA" />
      <Text style={styles.rewardText}>{label}</Text>
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
  counter: {
    width: 42,
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
    textAlign: "right",
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingBottom: 34,
    zIndex: 10,
  },
  planetLabel: {
    color: "#60A5FA",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 14,
  },
  questionCard: {
    borderRadius: 18,
    padding: 20,
    backgroundColor: "rgba(8,21,38,0.86)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.18)",
    marginBottom: 26,
  },
  statement: {
    color: "#CBD5E1",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 29,
    marginBottom: 28,
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
    lineHeight: 31,
  },
  alternatives: {
    gap: 18,
  },
  alternativeButton: {
    minHeight: 76,
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: "rgba(8,21,38,0.82)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.18)",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  alternativeButtonSelected: {
    backgroundColor: "rgba(37,99,235,0.22)",
    borderColor: "#38BDF8",
  },
  alternativeCircle: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  alternativeCircleSelected: {
    backgroundColor: "rgba(96,165,250,0.38)",
  },
  alternativeLetter: {
    color: "#CBD5E1",
    fontSize: 16,
    fontWeight: "900",
  },
  alternativeLetterSelected: {
    color: "#FFFFFF",
  },
  alternativeText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
  },
  confirmButton: {
    height: 68,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  confirmButtonDisabled: {
    opacity: 0.45,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
  },
  resultContent: {
    flex: 1,
    paddingHorizontal: 22,
    paddingBottom: 34,
    justifyContent: "center",
    zIndex: 10,
  },
  resultCard: {
    borderRadius: 24,
    padding: 22,
    backgroundColor: "rgba(8,21,38,0.88)",
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.24)",
    alignItems: "center",
  },
  resultIcon: {
    width: 78,
    height: 78,
    borderRadius: 999,
    backgroundColor: "#60A5FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  resultTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 12,
  },
  resultSubtitle: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 24,
  },
  rewardsGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  rewardItem: {
    width: "47%",
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: "rgba(15,23,42,0.9)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.16)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  rewardText: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "900",
  },
  finishButton: {
    height: 64,
    borderRadius: 17,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  finishButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
});