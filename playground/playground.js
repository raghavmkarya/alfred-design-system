/* Alfred AI — component playground.
   Live prop controls over the real _ds_bundle.js, across all three themes plus
   the density and direction scales. Authored in plain React.createElement so
   there is no build step and no runtime compiler: the page is a committed
   static artifact like everything else here, which is what lets it publish to
   GitHub Pages and sync to claude.ai/design unchanged.

   Its schema comes from playground/props.json, generated from the .d.ts files
   by scripts/gen-playground.mjs and gated by scripts/verify-playground.mjs. */
(function () {
  "use strict";
  var h = React.createElement;
  var ns = window.AlfredAIDesignSystem_1ce241;
  var FN = "__fn__";
  var noop = function () {};

  var THEMES = [
    { id: "light", label: "Light", attr: null },
    { id: "app-dark", label: "App dark", attr: "app-dark" },
    { id: "dark", label: "Marketing dark", attr: "dark" },
  ];
  var DENSITIES = ["compact", "comfortable", "spacious"];
  var DIRS = ["ltr", "rtl"];

  // props.json carries handlers as a marker and nested elements as their text,
  // because neither survives JSON. Rehydrate before handing anything to React.
  function hydrate(v) {
    if (v === FN) return noop;
    if (Array.isArray(v)) return v.map(hydrate);
    if (v && typeof v === "object") {
      var o = {};
      for (var k in v) o[k] = hydrate(v[k]);
      return o;
    }
    return v;
  }

  function initialProps(c) {
    var p = hydrate(c.sample || {});
    // a documented @default that the sample doesn't already pin
    c.props.forEach(function (d) {
      if (d.default !== undefined && p[d.name] === undefined) p[d.name] = d.default;
    });
    return p;
  }

  /* —— JSX snippet for copy-paste ——————————————————————————————————— */
  function fmt(v) {
    if (typeof v === "string") return JSON.stringify(v);
    if (typeof v === "function") return "{() => {}}";
    return "{" + JSON.stringify(v) + "}";
  }
  function snippet(c, props) {
    var parts = [];
    var children = null;
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v === undefined || v === null || v === "") return;
      if (k === "children") { children = v; return; }
      if (k === "style") return;
      if (typeof v === "boolean") { if (v) parts.push(k); return; }
      if (typeof v === "string") { parts.push(k + "=" + JSON.stringify(v)); return; }
      parts.push(k + "=" + fmt(v));
    });
    var attrs = parts.length ? " " + parts.join(" ") : "";
    var open = "<" + c.name + attrs;
    if (children == null) return open + " />";
    return open + ">" + (typeof children === "string" ? children : "…") + "</" + c.name + ">";
  }

  /* —— error boundary: a component that throws must not blank the page ——— */
  var Boundary = (function () {
    function B(props) { React.Component.call(this, props); this.state = { err: null }; }
    B.prototype = Object.create(React.Component.prototype);
    B.prototype.constructor = B;
    B.prototype.componentDidCatch = function () {};
    B.prototype.render = function () {
      if (this.state.err) {
        return h("div", { className: "pg-err" },
          "This combination of props threw: " + this.state.err.message);
      }
      return this.props.children;
    };
    B.getDerivedStateFromError = function (err) { return { err: err }; };
    B.prototype.componentDidUpdate = function (prev) {
      if (prev.resetKey !== this.props.resetKey && this.state.err) this.setState({ err: null });
    };
    return B;
  })();

  /* —— controls ——————————————————————————————————————————————————— */
  function Field(props) {
    var d = props.def, value = props.value, onChange = props.onChange;
    var ctl = d.control;
    var input;
    if (ctl.kind === "boolean") {
      input = h("div", { className: "pg-check" },
        h("input", { type: "checkbox", id: "f-" + d.name, checked: !!value, onChange: function (e) { onChange(e.target.checked); } }),
        h("span", { style: { fontSize: "var(--text-xs)", color: "var(--text-secondary)" } }, value ? "true" : "false"));
    } else if (ctl.kind === "select") {
      input = h("select", { id: "f-" + d.name, value: value === undefined ? "" : String(value), onChange: function (e) { onChange(e.target.value || undefined); } },
        [h("option", { key: "_", value: "" }, d.required ? "— choose —" : "— unset —")].concat(
          ctl.options.map(function (o) { return h("option", { key: o, value: o }, o); })));
    } else if (ctl.kind === "number") {
      input = h("input", { type: "number", id: "f-" + d.name, value: value === undefined ? "" : value,
        onChange: function (e) { onChange(e.target.value === "" ? undefined : Number(e.target.value)); } });
    } else {
      input = h("input", { type: "text", id: "f-" + d.name, value: value === undefined ? "" : String(value),
        onChange: function (e) { onChange(e.target.value === "" ? undefined : e.target.value); } });
    }
    return h("div", { className: "pg-field" },
      h("label", { htmlFor: "f-" + d.name }, d.name, d.required ? h("span", { style: { color: "var(--danger-500)" } }, " *") : null),
      d.doc ? h("div", { className: "doc" }, d.doc) : null,
      d.documentedDefault ? h("div", { className: "doc" }, "Default: ", h("code", null, d.documentedDefault)) : null,
      input);
  }

  /* —— app ————————————————————————————————————————————————————————— */
  function App(props) {
    var data = props.data;
    var all = data.components;
    var state = React.useState(all[0].name), current = state[0], setCurrent = state[1];
    var ps = React.useState(function () { return initialProps(all[0]); }), propVals = ps[0], setPropVals = ps[1];
    var th = React.useState("light"), theme = th[0], setTheme = th[1];
    var de = React.useState("comfortable"), density = de[0], setDensity = de[1];
    var di = React.useState("ltr"), dir = di[0], setDir = di[1];
    var q = React.useState(""), query = q[0], setQuery = q[1];
    var cp = React.useState(false), copied = cp[0], setCopied = cp[1];

    var comp = all.filter(function (c) { return c.name === current; })[0];

    function select(name) {
      var c = all.filter(function (x) { return x.name === name; })[0];
      setCurrent(name);
      setPropVals(initialProps(c));
      setCopied(false);
    }

    // group the index, filtered by the search box
    var visible = all.filter(function (c) {
      return !query || c.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    var groups = {};
    visible.forEach(function (c) { (groups[c.group] = groups[c.group] || []).push(c); });

    var editable = comp.props.filter(function (p) { return p.control; });
    var readonly = comp.props.filter(function (p) { return !p.control; });

    var themeAttr = THEMES.filter(function (t) { return t.id === theme; })[0].attr;
    var Comp = ns[comp.name];

    var rail = h("aside", { className: "pg-rail" },
      h("div", { className: "pg-brand" },
        h("img", { src: "../assets/logos/alfred-logo-primary.svg", alt: "Alfred" }),
        h("span", null, "Playground")),
      h("input", {
        type: "text", value: query, placeholder: "Search " + all.length + " components",
        "aria-label": "Search components",
        onChange: function (e) { setQuery(e.target.value); },
        style: {
          width: "100%", height: "var(--density-field-h-sm)", padding: "0 var(--density-field-pad-x)",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)",
          background: "var(--surface-input-plain)", border: "1.5px solid var(--border-default)",
          borderRadius: "var(--radius-md)", marginBlockEnd: 6,
        },
      }),
      Object.keys(groups).sort().map(function (g) {
        return h("div", { key: g },
          h("div", { className: "pg-group" }, g),
          groups[g].map(function (c) {
            return h("button", {
              key: c.name, className: "pg-item", type: "button",
              "aria-current": c.name === current ? "true" : undefined,
              onClick: function () { select(c.name); },
            }, c.name);
          }));
      }),
      visible.length === 0 ? h("div", { className: "pg-group" }, "No match") : null);

    function seg(label, items, value, set, keyOf, labelOf) {
      return h("div", { role: "group", "aria-label": label, className: "pg-seg" },
        items.map(function (it) {
          var k = keyOf(it);
          return h("button", {
            key: k, type: "button", "aria-pressed": k === value ? "true" : "false",
            onClick: function () { set(k); },
          }, labelOf(it));
        }));
    }

    var main = h("main", { className: "pg-main" },
      h("div", { className: "pg-bar" },
        h("div", null,
          h("h1", null, comp.name),
          comp.subtitle ? h("div", { className: "sub" }, comp.subtitle) : null),
        h("div", { style: { flex: 1 } }),
        seg("Theme", THEMES, theme, setTheme, function (t) { return t.id; }, function (t) { return t.label; }),
        seg("Density", DENSITIES, density, setDensity, function (d) { return d; }, function (d) { return d; }),
        seg("Direction", DIRS, dir, setDir, function (d) { return d; }, function (d) { return d.toUpperCase(); })),
      h("div", { className: "pg-stage" },
        h("div", {
          className: "pg-canvas",
          "data-theme": themeAttr || undefined,
          "data-density": density,
          dir: dir,
        }, h(Boundary, { resetKey: comp.name + JSON.stringify(propVals) },
             Comp ? h(Comp, propVals) : h("div", { className: "pg-err" }, "Not in the bundle."))),
        h("div", { className: "pg-code" },
          h("div", { className: "pg-code-head" },
            h("div", { className: "pg-group", style: { margin: 0 } }, "Usage"),
            h("button", {
              type: "button", className: "pg-copy",
              style: { width: "auto", border: "1px solid var(--border-default)", fontSize: "var(--text-2xs)" },
              onClick: function () {
                navigator.clipboard.writeText(snippet(comp, propVals)).then(function () {
                  setCopied(true); setTimeout(function () { setCopied(false); }, 1600);
                });
              },
            }, copied ? "Copied" : "Copy")),
          h("pre", null, h("code", null, snippet(comp, propVals))),
          h("div", { className: "pg-readonly", style: { borderBlockEnd: "none", marginBlockStart: 8 } },
            h("span", null, "Source"), h("code", null, comp.sourcePath)))));

    var panel = h("aside", { className: "pg-panel" },
      h("div", { className: "pg-group", style: { marginBlockStart: 0 } }, "Props"),
      editable.length === 0 ? h("div", { className: "pg-note" }, "This component takes no directly editable props.") : null,
      editable.map(function (d) {
        return h(Field, {
          key: d.name, def: d, value: propVals[d.name],
          onChange: function (v) {
            var next = Object.assign({}, propVals);
            if (v === undefined) delete next[d.name]; else next[d.name] = v;
            setPropVals(next); setCopied(false);
          },
        });
      }),
      readonly.length ? h("div", null,
        h("div", { className: "pg-group" }, "Not editable here"),
        h("div", { className: "pg-note" },
          "Handlers, element slots and style objects are part of the API but can't be typed into a form. They're listed so the API stays complete."),
        readonly.map(function (d) {
          return h("div", { className: "pg-readonly", key: d.name },
            h("span", null, d.name, d.required ? " *" : ""),
            h("code", null, d.type + (d.documentedDefault ? "  = " + d.documentedDefault : "")));
        })) : null);

    return h("div", { className: "pg" }, rail, main, panel);
  }

  fetch("props.json")
    .then(function (r) { if (!r.ok) throw new Error("props.json " + r.status); return r.json(); })
    .then(function (data) {
      ReactDOM.createRoot(document.getElementById("root")).render(h(App, { data: data }));
      document.body.dataset.ready = "1";
    })
    .catch(function (err) {
      document.getElementById("root").innerHTML =
        '<p style="font-family:var(--font-sans);padding:40px">Could not load the playground schema: ' +
        String(err.message) + '. Run <code>node scripts/gen-playground.mjs</code>.</p>';
    });
})();
