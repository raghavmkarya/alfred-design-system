function Site() {
  return (
    <div>
      <window.SiteNav />
      <window.Hero />
      <window.AlfredCore />
      <window.Products />
      <window.HowItWorks />
      <window.Outcomes />
      <window.Security />
      <window.Faq />
      <window.CTA />
      <window.SiteFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site />);
