// dietCalculations.ts

type Gender = "hombre" | "mujer";
type ActivityLevel = "sedentario" | "suave" | "moderada" | "intensa";

export const calculateDailyCalories = (
  gender: Gender,
  age: number,
  weight: number,
  height: number,
  activityLevel: ActivityLevel
): number => {
  const tmb =
    gender === "hombre"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const multipliers: Record<ActivityLevel, number> = {
    sedentario: 1.2,
    suave: 1.375,
    moderada: 1.55,
    intensa: 1.725,
  };

  const multiplier = multipliers[activityLevel] || 1.2;
  return Math.round(tmb * multiplier);
};

export const calculateGoalCalories = (
  goal: string,
  dailyCalories: number
): number => {
  switch (goal) {
    case "aumento_fuerza":
      return dailyCalories + 250; // Aumento de fuerza
    case "perdida_grasa":
      return dailyCalories - 500; // Pérdida de grasa
    case "mejor_tono_cardio":
      return dailyCalories; // Mantener el tono cardiovascular
    default:
      return dailyCalories;
  }
};

export const calculateMacros = (goal: string, totalCalories: number) => {
  let carbPct = 0;
  let proteinPct = 0;
  let fatPct = 0;

  switch (goal) {
    case "aumento_fuerza":
      carbPct = 0.5;
      proteinPct = 0.3;
      fatPct = 0.2;
      break;
    case "mejor_tono_cardio":
      carbPct = 0.475;
      proteinPct = 0.175;
      fatPct = 0.25;
      break;
    case "perdida_grasa":
      carbPct = 0.3;
      proteinPct = 0.45;
      fatPct = 0.25;
      break;
    default:
      carbPct = 0.4;
      proteinPct = 0.3;
      fatPct = 0.3;
  }

  const carbs = Math.round((totalCalories * carbPct) / 4);
  const protein = Math.round((totalCalories * proteinPct) / 4);
  const fat = Math.round((totalCalories * fatPct) / 9);

  return { carbs, protein, fat };
};

export const generateMealPlanPrompt = ({
  gender,
  age,
  height,
  weight,
  activityLevel,
  goal,
  totalCalories,
  macros,
  preferences,
  restrictions,
}: {
  gender: string;
  age: string;
  height: string;
  weight: string;
  activityLevel: string;
  goal: string;
  totalCalories: number;
  macros: { carbs: number; protein: number; fat: number };
  preferences: string;
  restrictions: string[];
}) => {
  return `
Eres un nutricionista profesional. Tu tarea es generar un plan de comidas semanal personalizado (desayuno, comida, cena, y snack si es necesario) para el siguiente perfil de usuario:

- Género: ${gender}
- Edad: ${age}
- Estatura: ${height} cm
- Peso: ${weight} kg
- Nivel de actividad: ${activityLevel}
- Objetivo: ${goal.replace(/_/g, " ")}
- Calorías diarias objetivo: ${totalCalories}
- Macronutrientes diarios: carbohidratos: ${macros.carbs}g, proteínas: ${macros.protein}g, grasas: ${macros.fat}g
- Preferencias alimenticias: ${preferences || "Ninguna"}
- Restricciones alimenticias: ${restrictions.length > 0 ? restrictions.join(", ") : "Ninguna"}

Quiero que generes un JSON con esta estructura exacta:

{
  "meal_plan": {
    "lunes": {
      "desayuno": { "descripcion": "", "calorias": 0 },
      "comida": { "descripcion": "", "calorias": 0 },
      "cena": { "descripcion": "", "calorias": 0 },
      "snack": { "descripcion": "", "calorias": 0 }
    },
    "martes": { ... },
    ...
    "domingo": { ... }
  }
}

Asegúrate de que las calorías por día estén lo más cerca posible de las ${totalCalories} kcal y que las comidas sean variadas, realistas y balanceadas en macros. No incluyas ningún texto fuera del JSON.`;
};