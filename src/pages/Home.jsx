import { useNavigate } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(160deg, #1a1200 0%, #2d1f00 40%, #1a1a2e 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
  },
  topBadge: {
    background: "rgba(255,215,0,0.12)",
    border: "1px solid rgba(255,215,0,0.3)",
    borderRadius: "20px",
    padding: "6px 18px",
    color: "#FFD700",
    fontSize: "0.8rem",
    letterSpacing: "2px",
    marginBottom: "20px",
    fontWeight: "600",
  },
  logo: {
    height: "90px",
    width: "auto",
    objectFit: "contain",
    marginBottom: "10px",
    filter: "drop-shadow(0 4px 16px rgba(255,215,0,0.5))",
    borderRadius: "12px",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "#FFD700",
    letterSpacing: "-0.5px",
    textAlign: "center",
    textShadow: "0 2px 20px rgba(255,215,0,0.4)",
    lineHeight: 1.1,
  },
  titleHindi: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#f0c040",
    textAlign: "center",
    marginTop: "6px",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#a8b8d0",
    marginTop: "10px",
    textAlign: "center",
    fontWeight: "400",
  },
  tagline: {
    fontSize: "0.92rem",
    color: "#8a9ab8",
    marginTop: "4px",
    textAlign: "center",
    fontStyle: "italic",
  },
  divider: {
    width: "80px",
    height: "3px",
    background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
    borderRadius: "2px",
    margin: "28px auto",
  },
  cardsRow: {
    display: "flex",
    gap: "20px",
    marginTop: "4px",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: "500px",
  },
  calcCard: {
    background:
      "linear-gradient(145deg, rgba(255,215,0,0.12), rgba(255,165,0,0.06))",
    border: "1.5px solid rgba(255,215,0,0.35)",
    borderRadius: "18px",
    padding: "36px 40px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    minWidth: "170px",
    backdropFilter: "blur(10px)",
  },
  loginCard: {
    background:
      "linear-gradient(145deg, rgba(192,192,192,0.1), rgba(128,128,128,0.05))",
    border: "1.5px solid rgba(192,192,192,0.25)",
    borderRadius: "18px",
    padding: "36px 40px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    minWidth: "170px",
    backdropFilter: "blur(10px)",
  },
  cardIcon: { fontSize: "2.6rem", lineHeight: 1 },
  cardTitleHindi: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#ffffff",
  },
  cardTitleEn: {
    fontSize: "0.78rem",
    color: "#8a9ab8",
  },
  footer: {
    marginTop: "48px",
    color: "#3d5070",
    fontSize: "0.78rem",
    textAlign: "center",
    lineHeight: 1.8,
  },
};

export default function Home() {
  const navigate = useNavigate();

  function calcHover(e, enter) {
    if (enter) {
      e.currentTarget.style.background =
        "linear-gradient(145deg, rgba(255,215,0,0.22), rgba(255,165,0,0.14))";
      e.currentTarget.style.border = "1.5px solid rgba(255,215,0,0.7)";
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 16px 48px rgba(255,215,0,0.2)";
    } else {
      e.currentTarget.style.background =
        "linear-gradient(145deg, rgba(255,215,0,0.12), rgba(255,165,0,0.06))";
      e.currentTarget.style.border = "1.5px solid rgba(255,215,0,0.35)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }
  }

  function loginHover(e, enter) {
    if (enter) {
      e.currentTarget.style.background =
        "linear-gradient(145deg, rgba(192,192,192,0.2), rgba(128,128,128,0.12))";
      e.currentTarget.style.border = "1.5px solid rgba(192,192,192,0.55)";
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.3)";
    } else {
      e.currentTarget.style.background =
        "linear-gradient(145deg, rgba(192,192,192,0.1), rgba(128,128,128,0.05))";
      e.currentTarget.style.border = "1.5px solid rgba(192,192,192,0.25)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.topBadge}>✦ खत्री अलंकार ✦</div>
      <img
        src="/Khatri.ai.png"
        alt="Khatri Alankar"
        style={styles.logo}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <h1 style={styles.title}>KA Calculator</h1>
      <p style={styles.titleHindi}>सोना-चाँदी भाव कैलकुलेटर</p>
      <p style={styles.subtitle}>Khatri Alankar Jewellers</p>
      <p style={styles.tagline}>सटीक कीमत, तुरंत हिसाब</p>

      <div style={styles.divider} />

      <div style={styles.cardsRow}>
        <div
          style={styles.calcCard}
          onClick={() => navigate("/calculator")}
          onMouseEnter={(e) => calcHover(e, true)}
          onMouseLeave={(e) => calcHover(e, false)}
        >
          <span style={styles.cardIcon}>🧮</span>
          <span style={styles.cardTitleHindi}>भाव देखें</span>
          <span style={styles.cardTitleEn}>Calculator</span>
        </div>

        <div
          style={styles.loginCard}
          onClick={() => navigate("/login")}
          onMouseEnter={(e) => loginHover(e, true)}
          onMouseLeave={(e) => loginHover(e, false)}
        >
          <span style={styles.cardIcon}>🔐</span>
          <span style={styles.cardTitleHindi}>लॉगिन</span>
          <span style={styles.cardTitleEn}>Admin Login</span>
        </div>
      </div>

      <p style={styles.footer}>
        © 2026 Khatri Alankar Jewellers
        <br />
        खत्री अलंकार ज्वेलर्स
      </p>
    </div>
  );
}
