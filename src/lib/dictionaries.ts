export type Language = "en" | "id";

type Dictionary = Record<string, string>;

const en: Dictionary = {
  // Common
  "common.loading": "Loading...",
  "common.error": "Error",
  "common.save": "Save",
  "common.back": "Back",
  "common.total": "Total",
  
  // Header
  "header.title": "NutriScan AI",
  "header.theme.light": "Light Mode",
  "header.theme.dark": "Dark Mode",
  "header.lang.switch": "Switch to Indonesian",

  // Hero Section
  "hero.badge": "Powered by Google Gemini AI",
  "hero.title.1": "Scan Your Meal",
  "hero.title.2": "Know Your Nutrition",
  "hero.subtitle": "Upload a photo of your meal and get instant AI-powered nutritional analysis. Track calories, protein, carbs, and fat with precision.",
  "hero.feature.1": "AI Food Detection",
  "hero.feature.2": "Portion Control",
  "hero.feature.3": "Accuracy Scoring",

  // Image Upload
  "upload.drag": "Drag and drop your meal photo here",
  "upload.or": "or",
  "upload.browse": "Browse Files",
  "upload.camera": "Take Photo",
  "upload.analyze": "Analyze Meal",
  "upload.analyzing": "Analyzing...",
  "upload.remove": "Remove",
  "upload.support": "Supports JPG, PNG, WEBP up to 10MB",
  "upload.error.size": "Image is too large. Max size is 10MB.",

  // Reference Object
  "ref.title": "Pro Tip: Use a Reference Object",
  "ref.desc": "For more accurate portion estimates, include a common object in your photo like a fork, spoon, credit card, or coin.",
  "ref.detected": "Reference object detected:",
  "ref.not_detected": "No reference object detected — estimates may be less accurate",

  // Loading
  "loading.title": "Analyzing your meal...",
  "loading.subtitle": "AI is detecting food items and estimating nutrition",

  // Adjuster
  "adjust.title": "Adjust Portions",
  "adjust.desc": "Correct weights before final calculation",
  "adjust.estimated": "AI estimated:",
  "adjust.confirm": "Confirm Portions & Calculate Nutrition",

  // Results
  "results.detected": "Detected Foods",
  "results.items": "items",
  "results.item": "item",
  "results.scan_again": "Scan Another Meal",
  "results.complete": "Analysis Complete ✓",

  // Nutrition Table & Summary
  "nutri.food": "Food",
  "nutri.weight": "Weight",
  "nutri.calories": "Calories",
  "nutri.protein": "Protein",
  "nutri.fat": "Fat",
  "nutri.carbs": "Carbs",
  "nutri.total_cal": "Total Calories",
  "nutri.total_pro": "Total Protein",
  "nutri.total_fat": "Total Fat",
  "nutri.total_carb": "Total Carbs",

  // Daily Targets
  "targets.title": "Daily Targets",
  "targets.cal_target": "Calorie Target (kcal)",
  "targets.pro_target": "Protein Target (g)",
  "targets.save": "Save Targets",
  "targets.add_meal": "Add Meal to Daily Total",
  "targets.today": "Today's Macros",

  // Confidence Indicator
  "conf.high": "High Confidence",
  "conf.medium": "Medium Confidence",
  "conf.low": "Low Confidence",
  "conf.overall": "Overall accuracy:",
  "conf.factors": "Accuracy Factors:",
  "conf.breakdown": "Accuracy Breakdown",
  "conf.ai_recognition": "AI Recognition",
  "conf.size_reference": "Size Reference",
  "conf.none": "0% (None)",
  "conf.meal_complexity": "Meal Complexity",
  "conf.items": "items",
  
  // Calculator
  "calc.btn": "Calculate Target",
  "calc.title": "Nutrition Target Calculator",
  "calc.desc": "Calculate your daily calorie and protein needs.",
  "calc.gender": "Gender",
  "calc.male": "Male",
  "calc.female": "Female",
  "calc.age": "Age (Years)",
  "calc.height": "Height (cm)",
  "calc.current_weight": "Current Weight (kg)",
  "calc.target_weight": "Target Weight (kg)",
  "calc.activity": "Daily Activity Level",
  "calc.act.sedentary": "Sedentary (Little to no exercise)",
  "calc.act.light": "Light (Exercise 1-3x/week)",
  "calc.act.moderate": "Moderate (Exercise 3-5x/week)",
  "calc.act.active": "Active (Exercise 6-7x/week)",
  "calc.calculate_now": "Calculate Now",
  "calc.results": "Analysis Results",
  "calc.bmr": "BMR (Metabolism)",
  "calc.tdee": "TDEE (Total Burned)",
  "calc.recommendation": "Daily Target Recommendation",
  "calc.apply": "Apply Target",
  "calc.gain_info": "To gain weight to {tw}kg, you need a calorie surplus (+500 kcal from TDEE).",
  "calc.lose_info": "To lose weight to {tw}kg, you need a calorie deficit (-500 kcal from TDEE).",
  "calc.maintain_info": "Your target is the same as your current weight. You only need maintenance calories.",
};

const id: Dictionary = {
  // Common
  "common.loading": "Memuat...",
  "common.error": "Kesalahan",
  "common.save": "Simpan",
  "common.back": "Kembali",
  "common.total": "Total",

  // Header
  "header.title": "NutriScan AI",
  "header.theme.light": "Mode Terang",
  "header.theme.dark": "Mode Gelap",
  "header.lang.switch": "Beralih ke Bahasa Inggris",

  // Hero Section
  "hero.badge": "Didukung oleh Google Gemini AI",
  "hero.title.1": "Pindai Makanan Anda",
  "hero.title.2": "Ketahui Nutrisinya",
  "hero.subtitle": "Unggah foto makanan Anda dan dapatkan analisis nutrisi instan berbasis AI. Lacak kalori, protein, karbohidrat, dan lemak dengan akurat.",
  "hero.feature.1": "Deteksi Makanan AI",
  "hero.feature.2": "Kontrol Porsi",
  "hero.feature.3": "Skor Akurasi",

  // Image Upload
  "upload.drag": "Tarik dan seret foto makanan ke sini",
  "upload.or": "atau",
  "upload.browse": "Pilih File",
  "upload.camera": "Ambil Foto",
  "upload.analyze": "Analisis Makanan",
  "upload.analyzing": "Menganalisis...",
  "upload.remove": "Hapus",
  "upload.support": "Mendukung JPG, PNG, WEBP hingga 10MB",
  "upload.error.size": "Gambar terlalu besar. Ukuran maksimal adalah 10MB.",

  // Reference Object
  "ref.title": "Tips: Gunakan Objek Referensi",
  "ref.desc": "Untuk estimasi porsi yang lebih akurat, sertakan objek umum dalam foto seperti garpu, sendok, kartu kredit, atau koin.",
  "ref.detected": "Objek referensi terdeteksi:",
  "ref.not_detected": "Tidak ada objek referensi — estimasi porsi mungkin kurang akurat",

  // Loading
  "loading.title": "Menganalisis makanan Anda...",
  "loading.subtitle": "AI sedang mendeteksi makanan dan mengestimasi nutrisi",

  // Adjuster
  "adjust.title": "Sesuaikan Porsi",
  "adjust.desc": "Koreksi berat sebelum kalkulasi akhir",
  "adjust.estimated": "Estimasi AI:",
  "adjust.confirm": "Konfirmasi Porsi & Hitung Nutrisi",

  // Results
  "results.detected": "Makanan Terdeteksi",
  "results.items": "item",
  "results.item": "item",
  "results.scan_again": "Pindai Makanan Lain",
  "results.complete": "Analisis Selesai ✓",

  // Nutrition Table & Summary
  "nutri.food": "Makanan",
  "nutri.weight": "Berat",
  "nutri.calories": "Kalori",
  "nutri.protein": "Protein",
  "nutri.fat": "Lemak",
  "nutri.carbs": "Karbo",
  "nutri.total_cal": "Total Kalori",
  "nutri.total_pro": "Total Protein",
  "nutri.total_fat": "Total Lemak",
  "nutri.total_carb": "Total Karbo",

  // Daily Targets
  "targets.title": "Target Harian",
  "targets.cal_target": "Target Kalori (kcal)",
  "targets.pro_target": "Target Protein (g)",
  "targets.save": "Simpan Target",
  "targets.add_meal": "Tambahkan Makanan ke Total Harian",
  "targets.today": "Makro Hari Ini",

  // Confidence Indicator
  "conf.high": "Akurasi Tinggi",
  "conf.medium": "Akurasi Menengah",
  "conf.low": "Akurasi Rendah",
  "conf.overall": "Akurasi keseluruhan:",
  "conf.factors": "Faktor Akurasi:",
  "conf.breakdown": "Rincian Akurasi",
  "conf.ai_recognition": "Pengenalan AI",
  "conf.size_reference": "Referensi Ukuran",
  "conf.none": "0% (Tidak ada)",
  "conf.meal_complexity": "Kompleksitas Makanan",
  "conf.items": "item",

  // Calculator
  "calc.btn": "Hitung Rekomendasi Target",
  "calc.title": "Kalkulator Target Nutrisi",
  "calc.desc": "Hitung kebutuhan kalori dan protein harian berdasarkan kondisi tubuh Anda.",
  "calc.gender": "Jenis Kelamin",
  "calc.male": "Laki-laki",
  "calc.female": "Perempuan",
  "calc.age": "Usia (Tahun)",
  "calc.height": "Tinggi Badan (cm)",
  "calc.current_weight": "Berat Saat Ini (kg)",
  "calc.target_weight": "Target Berat Badan (kg)",
  "calc.activity": "Tingkat Aktivitas Harian",
  "calc.act.sedentary": "Jarang Olahraga (Sedentary)",
  "calc.act.light": "Olahraga Ringan (1-3x / minggu)",
  "calc.act.moderate": "Olahraga Sedang (3-5x / minggu)",
  "calc.act.active": "Sangat Aktif (6-7x / minggu)",
  "calc.calculate_now": "Hitung Sekarang",
  "calc.results": "Hasil Analisis",
  "calc.bmr": "BMR (Metabolisme)",
  "calc.tdee": "TDEE (Total Terbakar)",
  "calc.recommendation": "Rekomendasi Target Harian",
  "calc.apply": "Terapkan Target",
  "calc.gain_info": "Untuk naik berat badan ke {tw}kg, Anda butuh surplus kalori (+500 kcal dari TDEE).",
  "calc.lose_info": "Untuk turun berat badan ke {tw}kg, Anda butuh defisit kalori (-500 kcal dari TDEE).",
  "calc.maintain_info": "Target Anda sama dengan berat saat ini. Anda hanya butuh kalori maintenance.",
};

const dictionaries = { en, id };

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang];
}
