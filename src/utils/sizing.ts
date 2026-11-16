export function calculateEuSizeFromCm(cm: number): { euSize: number; label: string; notes: string } {
  if (!cm || isNaN(cm)) {
    return { euSize: 40, label: 'EU 40', notes: 'Please enter a valid centimeter measurement.' };
  }
  let euSize = 40;
  if (cm < 22.0) {
    euSize = 35;
  } else if (cm >= 22.0 && cm <= 22.5) {
    euSize = 35;
  } else if (cm > 22.5 && cm <= 23.0) {
    euSize = 36;
  } else if (cm > 23.0 && cm <= 24.0) {
    euSize = 37;
  } else if (cm > 24.0 && cm <= 24.5) {
    euSize = 38;
  } else if (cm > 24.5 && cm <= 25.0) {
    euSize = 39;
  } else if (cm > 25.0 && cm <= 26.0) {
    euSize = 40;
  } else if (cm > 26.0 && cm <= 26.5) {
    euSize = 41;
  } else if (cm > 26.5 && cm <= 27.5) {
    euSize = 42;
  } else if (cm > 27.5 && cm <= 28.0) {
    euSize = 43;
  } else if (cm > 28.0 && cm <= 29.0) {
    euSize = 44;
  } else {
    euSize = 45;
  }

  return {
    euSize,
    label: `EU ${euSize}`,
    notes: 'Have wide feet or high instep? We offer custom wooden lasting adjustments at zero extra cost. Chat with us on Messenger!'
  };
}

export function getCmFromEuSize(euSize: number): number {
  const map: Record<number, number> = {
    35: 22.5,
    36: 23.0,
    37: 23.8,
    38: 24.3,
    39: 24.8,
    40: 25.5,
    41: 26.3,
    42: 27.0,
    43: 27.8,
    44: 28.5,
    45: 29.5
  };
  return map[euSize] || 25.5;
}
