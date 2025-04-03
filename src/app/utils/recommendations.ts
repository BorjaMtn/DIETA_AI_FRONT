// src/utils/recommendations.ts
interface UserProfile {
    goal: string;
    preferences: string;
    restrictions: string;
  }
  
  export const getDietRecommendations = (profile: UserProfile) => {
    let recommendations: string[] = [];
  
    // Lógica simple para generar recomendaciones según el perfil
    if (profile.goal.toLowerCase().includes("bajar de peso")) {
      recommendations.push("Recomendación: Dieta baja en carbohidratos.");
    }
    if (profile.goal.toLowerCase().includes("ganar masa muscular")) {
      recommendations.push("Recomendación: Aumentar el consumo de proteínas.");
    }
    if (profile.preferences.toLowerCase().includes("vegetariano")) {
      recommendations.push("Recomendación: Dieta basada en plantas.");
    }
    if (profile.restrictions.toLowerCase().includes("gluten")) {
      recommendations.push("Recomendación: Evitar alimentos con gluten.");
    }
  
    return recommendations;
  };
  