
export const PRESET_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
  'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
  'linear-gradient(45deg, #00dbde 0%, #fc00ff 100%)',
  'linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%)',
  'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)',
  'linear-gradient(90deg, #1A2980 0%, #26D0CE 100%)',
  'linear-gradient(90deg, #FF416C 0%, #FF4B2B 100%)',
  'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)',
  'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
  'linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)',
  'linear-gradient(90deg, #f953c6 0%, #b91d73 100%)',
  'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
  'linear-gradient(90deg, #F761A1 0%, #8C1BAB 100%)',
  'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
  'linear-gradient(90deg, #ffefba 0%, #ffffff 100%)',
  'linear-gradient(90deg, #3c1053 0%, #ad5389 100%)',
  'linear-gradient(90deg, #20002c 0%, #cbb4d4 100%)',
  'linear-gradient(90deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  'linear-gradient(90deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)',
  'linear-gradient(90deg, #c31432 0%, #240b36 100%)',
  'linear-gradient(90deg, #f12711 0%, #f5af19 100%)',
  'linear-gradient(90deg, #659999 0%, #f4791f 100%)',
  'linear-gradient(90deg, #dd3e54 0%, #6be585 100%)',
  'linear-gradient(90deg, #8360c3 0%, #2ebf91 100%)',
  'linear-gradient(90deg, #544a7d 0%, #ffd452 100%)',
  'linear-gradient(90deg, #009fff 0%, #ec2f4b 100%)',
  'linear-gradient(90deg, #654ea3 0%, #eaafc8 100%)',
  'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
  'linear-gradient(90deg, #0b8793 0%, #360033 100%)',
  'linear-gradient(90deg, #329d9c 0%, #7be495 100%)',
  'linear-gradient(90deg, #74ebd5 0%, #9face6 100%)',
  'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
  'linear-gradient(90deg, #2c3e50 0%, #4ca1af 100%)',
  'linear-gradient(90deg, #00467f 0%, #a5cc82 100%)',
  'linear-gradient(90deg, #1D2B64 0%, #F8CDDA 100%)',
];

// Helper function to generate a random gradient
export const getRandomGradient = (): string => {
  const randomIndex = Math.floor(Math.random() * PRESET_GRADIENTS.length);
  return PRESET_GRADIENTS[randomIndex];
};

// Helper function to create a gradient from two colors and an angle
export const createGradient = (startColor: string, endColor: string, angle: number = 90): string => {
  return `linear-gradient(${angle}deg, ${startColor} 0%, ${endColor} 100%)`;
};
