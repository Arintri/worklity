"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const factor = {
  ft: 0.3048,
  m: 1,
  yd: 0.9144,
  in: 0.0254,
};

const f = (n, d = 4) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: d,
  }).format(n || 0);

export default function Page() {
  const [l, setL] = useState("");
  const [w, setW] = useState("");
  const [u, setU] = useState("ft");

  const r = useMemo(() => {
    if (!(l > 0 && w > 0)) return null;

    const sqm =
      Number(l) *
      Number(w) *
      factor[u] ** 2;

    const sqft = sqm * 10.7639104167;

    return {
      sqft,
      sqm,
      sqyd: sqft / 9,
      acre: sqft / 43560,
      hectare: sqm / 10000,
      decimal: sqft / 435.6,

      // West Bengal commonly used land units
      kathaWB: sqft / 720,
      bighaWB: sqft / 14400,
    };
  }, [l, w, u]);

  const copy = () => {
    if (!r) return;

    navigator.clipboard.writeText(
      `Area: ${f(r.sqft)} sq ft | ${f(r.sqm)} sq m | ${f(
        r.acre,
        6
      )} acre | ${f(r.decimal)} decimal | ${f(
        r.kathaWB
      )} Katha (WB) | ${f(r.bighaWB)} Bigha (WB)`
    );
  };

  const reset = () => {
    setL("");
    setW("");
  };

  return (
    <main>
      <header className="nav">
        <Link className="brand" href="/">
          <span>W</span>
          Worklity
        </Link>

        <Link href="/">← Home</Link>
      </header>

      <section className="toolHero">
        <b>LAND & AREA</b>

        <h1>Land Area Calculator</h1>

        <p>
          Enter length and width once and instantly convert land area
          into Square Feet, Decimal, Katha, Bigha, Acre and more.
        </p>
      </section>

      <div className="calcWrap">
        <section className="calc">

          <div className="inputs">
            <label>
              Length
              <input
                type="number"
                value={l}
                onChange={(e) => setL(e.target.value)}
                placeholder="e.g. 50"
              />
            </label>

            <label>
              Width
              <input
                type="number"
                value={w}
                onChange={(e) => setW(e.target.value)}
                placeholder="e.g. 30"
              />
            </label>
          </div>

          <label>
            Input unit

            <select
              value={u}
              onChange={(e) => setU(e.target.value)}
            >
              <option value="ft">Feet</option>
              <option value="m">Meter</option>
              <option value="yd">Yard</option>
              <option value="in">Inch</option>
            </select>
          </label>

          <div className="result">
            <small>CALCULATED AREA</small>

            <h2>
              {r
                ? `${f(r.sqft)} sq ft`
                : "Enter length & width"}
            </h2>

            {r && (
              <div className="results">

                <div>
                  Square Meter
                  <b>{f(r.sqm)}</b>
                </div>

                <div>
                  Square Yard
                  <b>{f(r.sqyd)}</b>
                </div>

                <div>
                  Decimal / Disimil
                  <b>{f(r.decimal)}</b>
                </div>

                <div>
                  Katha (West Bengal)
                  <b>{f(r.kathaWB)}</b>
                </div>

                <div>
                  Bigha (West Bengal)
                  <b>{f(r.bighaWB)}</b>
                </div>

                <div>
                  Acre
                  <b>{f(r.acre, 6)}</b>
                </div>

                <div>
                  Hectare
                  <b>{f(r.hectare, 6)}</b>
                </div>

              </div>
            )}
          </div>

          <div className="buttons">

            <button
              onClick={copy}
              disabled={!r}
            >
              Copy result
            </button>

            <button
              className="reset"
              onClick={reset}
            >
              Reset
            </button>

          </div>
        </section>

        <aside>
          <h3>West Bengal Land Units</h3>

          <p>
            For this calculator, the commonly used West Bengal
            conversion is:
          </p>

          <p>
            <b>1 Katha = 720 sq ft</b>
          </p>

          <p>
            <b>1 Bigha = 20 Katha = 14,400 sq ft</b>
          </p>

          <p>
            <b>1 Decimal / Disimil = 435.6 sq ft</b>
          </p>

          <p>
            <small>
              Note: Traditional land units such as Katha and Bigha
              can vary by region and local practice. Verify local
              records for legal or official land transactions.
            </small>
          </p>
        </aside>
      </div>

      <section className="explain">

        <h2>How is land area calculated?</h2>

        <p>
          For a rectangular plot:
          <b> Area = Length × Width</b>.
          Worklity then automatically converts the calculated area
          into commonly used land units.
        </p>

        <h2>West Bengal Katha & Bigha Conversion</h2>

        <p>
          In the commonly used West Bengal system, 1 Katha is
          calculated as 720 square feet and 20 Katha make 1 Bigha.
          This means 1 Bigha equals 14,400 square feet.
        </p>

      </section>
    </main>
  );
}
