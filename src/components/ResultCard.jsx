import { numberToHindiWords, toHindiNumerals } from "../utils/numberToHindi";

function fmt(num) {
  return Math.round(num).toLocaleString("en-IN");
}
function fmtDec(num) {
  return Number(num).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

const s = {
  card: (isGold) => ({
    background: isGold
      ? "linear-gradient(145deg, #fffde0, #fff8c0)"
      : "linear-gradient(145deg, #f0f4f8, #e4eaf0)",
    border: `2px solid ${isGold ? "#d4a800" : "#a0b0be"}`,
    borderRadius: "16px",
    padding: "0",
    marginTop: "20px",
    boxShadow: isGold
      ? "0 6px 28px rgba(212,168,0,0.22)"
      : "0 6px 28px rgba(100,120,140,0.18)",
    overflow: "hidden",
  }),
  cardHeader: (isGold) => ({
    background: isGold
      ? "linear-gradient(135deg, #d4a800, #a07800)"
      : "linear-gradient(135deg, #6a7a8a, #4a5a6a)",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
  cardHeaderText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "0.9rem",
    letterSpacing: "0.5px",
  },
  body: { padding: "20px 20px 24px" },
  finalPriceBlock: {
    textAlign: "center",
    marginBottom: "18px",
    padding: "14px",
    background: "rgba(255,255,255,0.6)",
    borderRadius: "12px",
  },
  finalLabel: {
    fontSize: "0.78rem",
    fontWeight: "600",
    color: "#888",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  finalPriceRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: "4px",
    flexWrap: "wrap",
  },
  currency: { fontSize: "1.4rem", fontWeight: "700", color: "#444" },
  finalPrice: (isGold) => ({
    fontSize: "2.6rem",
    fontWeight: "900",
    color: isGold ? "#a07000" : "#3a5068",
    letterSpacing: "-1.5px",
    lineHeight: 1,
  }),
  hindiPrice: (isGold) => ({
    fontSize: "1rem",
    color: isGold ? "#8a6000" : "#4a6070",
    fontWeight: "600",
    marginTop: "8px",
    background: isGold ? "rgba(212,168,0,0.1)" : "rgba(74,90,110,0.08)",
    padding: "6px 14px",
    borderRadius: "8px",
    display: "inline-block",
  }),
  divider: (isGold) => ({
    height: "1px",
    background: isGold ? "rgba(180,130,0,0.2)" : "rgba(100,120,140,0.2)",
    margin: "12px 0",
  }),
  sectionTitle: (isGold) => ({
    fontSize: "0.72rem",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: isGold ? "#b08000" : "#5a7080",
    marginBottom: "6px",
    marginTop: "4px",
  }),
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "5px 0",
    flexWrap: "wrap",
    gap: "2px",
  },
  rowLabel: { color: "#666", fontWeight: "500", fontSize: "0.88rem" },
  rowLabelSub: { display: "block", fontSize: "0.72rem", color: "#aaa", fontWeight: "400" },
  rowValue: { color: "#1a1a1a", fontWeight: "700", fontSize: "0.95rem", textAlign: "right" },
  purchaseBlock: (isGold) => ({
    background: isGold ? "rgba(212,168,0,0.06)" : "rgba(74,90,110,0.06)",
    borderRadius: "10px",
    padding: "12px 14px",
    marginTop: "4px",
  }),
  totalRow: (isGold) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 14px",
    background: isGold ? "rgba(212,168,0,0.14)" : "rgba(74,90,110,0.12)",
    borderRadius: "10px",
    marginTop: "8px",
    flexWrap: "wrap",
    gap: "4px",
  }),
  totalLabel: { fontWeight: "700", color: "#333", fontSize: "0.97rem" },
  totalValue: (isGold) => ({
    fontWeight: "900",
    fontSize: "1.25rem",
    color: isGold ? "#9a6800" : "#3a5068",
  }),
};

export default function ResultCard({
  saleMetalPrice,
  making,
  finalPrice,
  purchasePrice,
  weight,
  categoryName,
  metalType,
  goldType,
  cat,
  real10gPrice,
}) {
  const isGold = metalType === "gold";
  const makingLabel = cat?.makingChargeType === "per_gram"
    ? `बनाई (₹${fmtDec(cat.makingCharge)}/ग्राम)`
    : `बनाई (Fixed)`;

  return (
    <div style={s.card(isGold)}>
      {/* Header */}
      <div style={s.cardHeader(isGold)}>
        <span>{isGold ? "🥇" : "🥈"}</span>
        <span style={s.cardHeaderText}>
          {isGold ? "सोने का मूल्य विवरण" : "चाँदी का मूल्य विवरण"} — Calculation Result
        </span>
      </div>

      <div style={s.body}>
        {/* Final Price */}
        <div style={s.finalPriceBlock}>
          <div style={s.finalLabel}>कुल विक्रय मूल्य / Total Sale Price</div>
          <div style={s.finalPriceRow}>
            <span style={s.currency}>₹</span>
            <span style={s.finalPrice(isGold)}>{fmt(finalPrice)}</span>
          </div>
          <div>
            <span style={s.hindiPrice(isGold)}>
              {numberToHindiWords(Math.round(finalPrice))}
            </span>
          </div>
        </div>

        <div style={s.divider(isGold)} />

        {/* Item Info */}
        <div style={s.sectionTitle(isGold)}>आभूषण विवरण</div>
        <div style={s.row}>
          <span style={s.rowLabel}>
            आभूषण <span style={s.rowLabelSub}>(Category)</span>
          </span>
          <span style={s.rowValue}>{categoryName}</span>
        </div>
        <div style={s.row}>
          <span style={s.rowLabel}>
            वजन <span style={s.rowLabelSub}>(Weight)</span>
          </span>
          <span style={s.rowValue}>
            {weight} ग्राम{" "}
            <span style={{ color: "#999", fontWeight: "500", fontSize: "0.82rem" }}>
              ({toHindiNumerals(String(weight))} ग्राम)
            </span>
          </span>
        </div>
        {isGold && goldType && (
          <div style={s.row}>
            <span style={s.rowLabel}>
              कैरेट / KDM <span style={s.rowLabelSub}>(Gold Type)</span>
            </span>
            <span style={s.rowValue}>
              {goldType} KDM — {goldType === "916" ? "22 कैरेट" : "18 कैरेट"}
            </span>
          </div>
        )}
        <div style={s.row}>
          <span style={s.rowLabel}>
            बिक्री टंच <span style={s.rowLabelSub}>(Sale Tunch)</span>
          </span>
          <span style={s.rowValue}>{fmtDec(cat?.saleTunch)}%</span>
        </div>

        <div style={s.divider(isGold)} />

        {/* Sale breakdown */}
        <div style={s.sectionTitle(isGold)}>विक्रय मूल्य विवरण (Sale Breakdown)</div>
        <div style={s.row}>
          <span style={s.rowLabel}>
            धातु मूल्य <span style={s.rowLabelSub}>(Sale Tunch × {real10gPrice?.toLocaleString('en-IN')}/10g)</span>
          </span>
          <span style={s.rowValue}>₹ {fmt(saleMetalPrice)}</span>
        </div>
        {cat?.addOnPrice > 0 && (
          <div style={s.row}>
            <span style={s.rowLabel}>
              ऐड-ऑन भाव <span style={s.rowLabelSub}>(Add-on per 10g)</span>
            </span>
            <span style={s.rowValue}>₹ {fmt((weight / 10) * cat.addOnPrice)}</span>
          </div>
        )}
        <div style={s.row}>
          <span style={s.rowLabel}>
            {makingLabel} <span style={s.rowLabelSub}>(Making Charge)</span>
          </span>
          <span style={s.rowValue}>₹ {fmt(making)}</span>
        </div>

        <div style={s.divider(isGold)} />

        {/* Purchase price */}
        <div style={s.sectionTitle(isGold)}>खरदारी मूल्य (Purchase Price)</div>
        <div style={s.purchaseBlock(isGold)}>
          <div style={s.row}>
            <span style={s.rowLabel}>
              खरीद टंच <span style={s.rowLabelSub}>(Purchase Tunch)</span>
            </span>
            <span style={s.rowValue}>{fmtDec(cat?.purchaseTunch)}%</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>
              खरदारी मूल्य <span style={s.rowLabelSub}>(Purchase Price)</span>
            </span>
            <span style={{ ...s.rowValue, color: isGold ? "#a07000" : "#3a5068" }}>
              ₹ {fmt(purchasePrice)}
            </span>
          </div>
          <div style={{ marginTop: "6px" }}>
            <span style={{ ...s.hindiPrice(isGold), fontSize: "0.88rem", padding: "4px 10px" }}>
              {numberToHindiWords(Math.round(purchasePrice))}
            </span>
          </div>
        </div>

        {/* Total */}
        <div style={s.totalRow(isGold)}>
          <span style={s.totalLabel}>💰 कुल देय राशि</span>
          <span style={s.totalValue(isGold)}>₹ {fmt(finalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
