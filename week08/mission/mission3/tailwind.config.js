// tailwind.config.js (ESM 방식 export default)
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 이 부분이 핵심! src 폴더 안의 모든 파일을 검사하라는 뜻
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}