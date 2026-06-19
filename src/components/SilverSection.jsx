import { useState } from "react";
import ResultCard from "./ResultCard";

const s = {
  section: {
    background: "#fff",
    border: "2px solid #b0b8c0",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "24px",
    boxShadow: "0 6px 32px rgba(140,140,160,0.18)",
  },
  header: {
    background:
      "linear-gradient(135deg, #d8dde2 0%, #a8b0bc 60%, #7a8898 100%)",
    padding: "22px 28px 18px",
  },
  headerTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "14px",
  },
  headerTitle: {
    fontSize: "2rem",
    fontWeight: "900",
    color: "#0f1820",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textShadow: "0 1px 3px rgba(255,255,255,0.4)",
  },
  headerTitleHindi: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#2a3540",
    marginTop: "2px",
    letterSpacing: "0.5px",
  },
  badge: {
    background: "rgba(0,0,0,0.18)",
    color: "#f0f4f8",
    padding: "8px 16px",
    borderRadius: "10px",
    fontWeight: "700",
    border: "1px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(4px)",
    display: "inline-block",
  },
  badgeLabel: {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: "400",
    color: "#ccd8e0",
    marginBottom: "2px",
    letterSpacing: "0.5px",
  },
  badgePrice: {
    fontSize: "1.1rem",
    fontWeight: "800",
    color: "#ffffff",
  },
  body: { padding: "22px 22px 26px" },
  label: {
    display: "block",
    fontSize: "0.92rem",
    fontWeight: "700",
    color: "#3a4a58",
    marginBottom: "7px",
    letterSpacing: "0.2px",
  },
  labelSub: {
    fontWeight: "400",
    fontSize: "0.78rem",
    color: "#7a8898",
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    border: "2px solid #b8c0ca",
    borderRadius: "12px",
    fontSize: "1.05rem",
    background: "#f8fafc",
    color: "#1a1a1a",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    fontWeight: "600",
  },
  select: {
    width: "100%",
    padding: "13px 14px",
    border: "2px solid #b8c0ca",
    borderRadius: "12px",
    fontSize: "0.97rem",
    background: "#f8fafc",
    color: "#1a1a1a",
    cursor: "pointer",
    boxSizing: "border-box",
    fontWeight: "500",
  },
  field: { marginBottom: "16px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  btn: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg, #6a7a8a 0%, #4a5a6a 100%)",
    color: "#fff",
    fontWeight: "800",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "opacity 0.2s, transform 0.1s",
    marginTop: "6px",
    boxShadow: "0 5px 18px rgba(74,90,106,0.4)",
  },
  noCategories: {
    color: "#888",
    fontSize: "0.85rem",
    fontStyle: "italic",
    padding: "12px 0",
  },
  error: {
    color: "#c0392b",
    fontSize: "0.88rem",
    marginBottom: "12px",
    background: "#fff0f0",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #f5c0c0",
  },
};

export default function SilverSection({ prices, categories }) {
  const [weight, setWeight] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    const w = parseFloat(weight);
    if (!w || w <= 0) {
      setError("⚠️ कृपया सही वजन दर्ज करें।");
      return;
    }
    if (!selectedCategoryId) {
      setError("⚠️ कृपया आभूषण का प्रकार चुनें।");
      return;
    }
    const cat = categories.find((c) => c._id === selectedCategoryId);
    if (!cat) return;

    const real10gPrice = prices.silver;

    // Sale price
    const salePricePerTenG =
      (cat.saleTunch / 100) * real10gPrice + (cat.addOnPrice || 0);
    const saleMetalPrice = (w / 10) * salePricePerTenG;
    const making =
      cat.makingChargeType === "per_gram"
        ? cat.makingCharge * w
        : cat.makingChargeType === "per_10g"
          ? (w / 10) * cat.makingCharge
          : cat.makingCharge;
    const finalPrice = saleMetalPrice + making;

    // Purchase price (खरदारी मूल्य)
    const purchasePricePerTenG = (cat.purchaseTunch / 100) * real10gPrice;
    const purchaseMetalPrice = (w / 10) * purchasePricePerTenG;
    const purchaseMaking =
      cat.purchaseMakingChargeType === "per_gram"
        ? cat.purchaseMakingCharge * w
        : cat.purchaseMakingChargeType === "per_10g"
          ? (w / 10) * cat.purchaseMakingCharge
          : cat.purchaseMakingCharge;
    const purchasePrice = purchaseMetalPrice + purchaseMaking;

    setResult({
      saleMetalPrice,
      making,
      finalPrice,
      purchasePrice,
      weight: w,
      categoryName: cat.name,
      cat,
    });
  }

  return (
    <section style={s.section}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerTop}>
          <div>
            <div style={s.headerTitle}>🥈 चाँदी</div>
            <div style={s.headerTitleHindi}>
              Silver — आज का भाव (प्रति 10 ग्राम)
            </div>
          </div>
        </div>
        <div style={s.badge}>
          <span style={s.badgeLabel}>चाँदी भाव (Silver Rate)</span>
          <span style={s.badgePrice}>
            ₹ {(prices.silver || 0).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={s.body}>
        <div style={s.grid}>
          {/* Weight */}
          <div style={s.field}>
            <label style={s.label}>
              वजन <span style={s.labelSub}>(weight in grams)</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="जैसे: 50"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setResult(null);
              }}
              style={s.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#4a5a6a";
                e.target.style.boxShadow = "0 0 0 3px rgba(106,122,138,0.18)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#b8c0ca";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Category */}
          <div style={s.field}>
            <label style={s.label}>
              आभूषण का प्रकार
              {/* <span style={s.labelSub}>(Category)</span> */}
            </label>
            {categories.length === 0 ? (
              <p style={s.noCategories}>कोई श्रेणी नहीं।</p>
            ) : (
              <select
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  setResult(null);
                }}
                style={s.select}
              >
                <option value="">-- प्रकार चुनें --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {error && <p style={s.error}>{error}</p>}

        <button
          style={s.btn}
          onClick={calculate}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🧮 चाँदी का भाव निकालें
        </button>

        {result && (
          <ResultCard
            {...result}
            metalType="silver"
            real10gPrice={prices.silver}
          />
        )}
      </div>
    </section>
  );
}
