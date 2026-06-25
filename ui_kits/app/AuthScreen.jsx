const { Logo, Input, Button, Checkbox, IconButton, ProgressBar } = window.AlfredAIDesignSystem_1ce241;
const ICONROOT = "../../assets/icons";
const LOGOROOT = "../../assets/logos";

/* Alfred AI — Auth + onboarding flow (faithful to the Figma login screens) */
function AuthScreen({ onSignedIn }) {
  const [stage, setStage] = React.useState("login"); // login | loading
  const [email, setEmail] = React.useState("priya@northwind.com");
  const [pw, setPw] = React.useState("alfred");
  const [show, setShow] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (stage !== "loading") return;
    setProgress(8);
    const t1 = setTimeout(() => setProgress(64), 350);
    const t2 = setTimeout(() => setProgress(100), 1100);
    const t3 = setTimeout(() => onSignedIn && onSignedIn(), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [stage]);

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--glow-periwinkle), var(--glow-orange), #fff", overflow: "hidden",
    }}>
      {stage === "login" ? (
        <div style={{
          width: 468, background: "var(--surface-card)", borderRadius: "var(--radius-3xl)",
          boxShadow: "var(--shadow-xl)", padding: "44px 44px 30px",
          display: "flex", flexDirection: "column", gap: 26,
        }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Logo height={38} root={LOGOROOT} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setStage("loading"); }}
            style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <Input label="Email Address" type="email" value={email} fill="tint"
              onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            <Input label="Password" type={show ? "text" : "password"} value={pw} fill="tint"
              onChange={(e) => setPw(e.target.value)} placeholder="••••••••"
              trailing={<IconButton name={show ? "fullscreen" : "read-only"} iconRoot={ICONROOT}
                variant="ghost" size={30} iconSize={16} onClick={() => setShow(!show)} title="Toggle password" />} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
              <a href="#" onClick={(e) => e.preventDefault()}
                style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--text-sm)", color: "var(--orange-500)" }}>Forgot Password?</a>
            </div>
            <Button type="submit" variant="primary" size="lg" fullWidth>Sign in</Button>
          </form>
          <p style={{ textAlign: "center", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      ) : (
        <div style={{
          width: 620, background: "var(--surface-card)", borderRadius: "var(--radius-3xl)",
          boxShadow: "var(--shadow-xl)", padding: "56px 56px 40px", textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
        }}>
          <div style={{
            width: 96, height: 96, borderRadius: "var(--radius-2xl)", marginBottom: 6,
            background: "var(--gradient-brand)", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-brand)",
          }}>
            <img src={`${LOGOROOT}/alfred-icon-white.svg`} alt="" style={{ height: 52 }} />
          </div>
          <h2 style={{ fontSize: 40, fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-tight)" }}>Setting up your workspace…</h2>
          <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)" }}>Reconciling your connected channels.</p>
          <div style={{ width: "100%", marginTop: 16 }}>
            <ProgressBar value={progress} height={10} />
          </div>
        </div>
      )}
    </div>
  );
}
window.AuthScreen = AuthScreen;
