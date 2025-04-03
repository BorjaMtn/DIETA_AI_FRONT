// src/utils/recommendations.ts
interface UserProfile {
    goal: string;
    preferences: string;
    restrictions: string;
  }
  
  export const getDietRecommendations = (profile: UserProfile) => {
    let recommendations: string[] = [];
  
    // Lógica simple para generar recomendaciones según el perfil
    //goal
    if (profile.goal.toLowerCase().includes("bajar de peso")) {
      recommendations.push("Recomendación: Dieta baja en carbohidratos.");
    }
    if (profile.goal.toLowerCase().includes("ganar masa muscular")) {
      recommendations.push("Recomendación: Aumentar el consumo de proteínas.");
    }
    if (profile.goal.toLowerCase().includes("mejorar resistencia")) {
      recommendations.push("Recomendación: Entrenamiento cardiovascular de alta intensidad.");
    }
    if (profile.goal.toLowerCase().includes("aumentar energía")) {
      recommendations.push("Recomendación: Consumo equilibrado de carbohidratos complejos.");
    }
    if (profile.goal.toLowerCase().includes("reducir estrés")) {
      recommendations.push("Recomendación: Incorporar técnicas de mindfulness y yoga.");
    }
    if (profile.goal.toLowerCase().includes("mejorar digestión")) {
      recommendations.push("Recomendación: Dieta rica en fibra y probióticos.");
    }
    if (profile.goal.toLowerCase().includes("mejorar salud cardiovascular")) {
      recommendations.push("Recomendación: Dieta rica en omega-3 y ejercicio aeróbico regular.");
    }
    if (profile.goal.toLowerCase().includes("aumentar flexibilidad")) {
      recommendations.push("Recomendación: Practicar yoga o estiramientos dinámicos.");
    }
    if (profile.goal.toLowerCase().includes("mejorar calidad del sueño")) {
      recommendations.push("Recomendación: Evitar cafeína por la tarde y establecer una rutina de sueño.");
    }
    if (profile.goal.toLowerCase().includes("aumentar concentración")) {
      recommendations.push("Recomendación: Dieta rica en antioxidantes y grasas saludables como nueces y pescado.");
    }
    if (profile.goal.toLowerCase().includes("reducir inflamación")) {
      recommendations.push("Recomendación: Evitar alimentos ultraprocesados y consumir cúrcuma y jengibre.");
    }
    //preferences
    if (profile.preferences.toLowerCase().includes("vegetariano")) {
      recommendations.push("Recomendación: Dieta basada en plantas.");
    }
    if (profile.preferences.toLowerCase().includes("vegano")) {
      recommendations.push("Recomendación: Fuentes de proteína vegetal como legumbres y frutos secos.");
    }
    if (profile.preferences.toLowerCase().includes("keto")) {
      recommendations.push("Recomendación: Dieta alta en grasas saludables y baja en carbohidratos.");
    }
    if (profile.preferences.toLowerCase().includes("paleo")) {
      recommendations.push("Recomendación: Priorizar alimentos naturales y sin procesar.");
    }
    if (profile.preferences.toLowerCase().includes("mediterránea")) {
      recommendations.push("Recomendación: Incorporar aceite de oliva, pescado y vegetales frescos.");
    }
    if (profile.preferences.toLowerCase().includes("sin azúcar")) {
      recommendations.push("Recomendación: Priorizar alimentos naturales y endulzantes alternativos como eritritol.");
    }
    if (profile.preferences.toLowerCase().includes("sin harinas refinadas")) {
      recommendations.push("Recomendación: Optar por harinas integrales o de almendras.");
    }
    if (profile.preferences.toLowerCase().includes("dieta ayuno intermitente")) {
      recommendations.push("Recomendación: Seguir un protocolo de ayuno como 16/8 y priorizar proteínas en la ventana de alimentación.");
    }
    if (profile.preferences.toLowerCase().includes("alta en proteínas")) {
      recommendations.push("Recomendación: Incorporar más carnes magras, huevos y proteínas vegetales.");
    }
    if (profile.preferences.toLowerCase().includes("sin lácteos")) {
      recommendations.push("Recomendación: Usar alternativas vegetales como leche de coco o almendras.");
    }
    if (profile.preferences.toLowerCase().includes("carnívora")) {
      recommendations.push("Recomendación: Dieta basada en carne, huevos y grasas saludables.");
    }
    //restictions
    if (profile.restrictions.toLowerCase().includes("gluten")) {
      recommendations.push("Recomendación: Evitar alimentos con gluten.");
    }
    if (profile.restrictions.toLowerCase().includes("lactosa")) {
      recommendations.push("Recomendación: Evitar lácteos y optar por alternativas como leche de almendras.");
    }
    if (profile.restrictions.toLowerCase().includes("frutos secos")) {
      recommendations.push("Recomendación: Buscar fuentes alternativas de grasas saludables como aguacate.");
    }
    if (profile.restrictions.toLowerCase().includes("soja")) {
      recommendations.push("Recomendación: Evitar productos a base de soja y elegir otras fuentes de proteína.");
    }
    if (profile.restrictions.toLowerCase().includes("azúcar")) {
      recommendations.push("Recomendación: Optar por endulzantes naturales como stevia o eritritol.");
    }
    if (profile.restrictions.toLowerCase().includes("histamina")) {
      recommendations.push("Recomendación: Evitar alimentos fermentados, embutidos y cítricos.");
    }
    if (profile.restrictions.toLowerCase().includes("fodmap")) {
      recommendations.push("Recomendación: Reducir consumo de cebolla, ajo, legumbres y ciertos lácteos.");
    }
    if (profile.restrictions.toLowerCase().includes("oxalatos")) {
      recommendations.push("Recomendación: Evitar espinaca, almendras y remolacha.");
    }
    if (profile.restrictions.toLowerCase().includes("fructosa")) {
      recommendations.push("Recomendación: Limitar frutas ricas en fructosa como manzana y mango.");
    }
    if (profile.restrictions.toLowerCase().includes("legumbres")) {
      recommendations.push("Recomendación: Sustituir legumbres por fuentes de proteína como quinoa y semillas.");
    }
  
    return recommendations;
  };
  