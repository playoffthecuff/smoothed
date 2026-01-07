// Posted by Mingye Wang, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-17, License - CC BY-SA 4.0

// This is just https://bottosson.github.io/posts/gamutclipping/ crudely translated to TS by Mingye Wang (https://gist.github.com/Artoria2e5/9c7ba0bcda480b5bc2ae0b0ffe0bfb91)

type Lab = { L: number; a: number; b: number; };
type RGB = { r: number; g: number; b: number; };

function oklab_to_linear_srgb(c: Lab): RGB {
  const l_ = c.L + 0.3963377774 * c.a + 0.2158037573 * c.b;
  const m_ = c.L - 0.1055613458 * c.a - 0.0638541728 * c.b;
  const s_ = c.L - 0.0894841775 * c.a - 1.2914855480 * c.b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return {
    r: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  };
}

type LC = { L: number; C: number; };
function compute_max_saturation(a: number, b: number): number {
  let k0: number, k1: number, k2: number, k3: number, k4: number, wl: number, wm: number, ws: number;

  if (-1.88170328 * a - 0.80936493 * b > 1) {
    k0 = +1.19086277;
    k1 = +1.76576728;
    k2 = +0.59662641;
    k3 = +0.75515197;
    k4 = +0.56771245;
    wl = +4.0767416621;
    wm = -3.3077115913;
    ws = +0.2309699292;
  } else if (1.81444104 * a - 1.19445276 * b > 1) {
    k0 = +0.73956515;
    k1 = -0.45954404;
    k2 = +0.08285427;
    k3 = +0.12541070;
    k4 = +0.14503204;
    wl = -1.2684380046;
    wm = +2.6097574011;
    ws = -0.3413193965;
  } else {
    k0 = +1.35733652;
    k1 = -0.00915799;
    k2 = -1.15130210;
    k3 = -0.50559606;
    k4 = +0.00692167;
    wl = -0.0041960863;
    wm = -0.7034186147;
    ws = +1.7076147010;
  }

  let S = k0 + k1 * a + k2 * b + k3 * a * a + k4 * a * b;

  const k_l = +0.3963377774 * a + 0.2158037573 * b;
  const k_m = -0.1055613458 * a - 0.0638541728 * b;
  const k_s = -0.0894841775 * a - 1.2914855480 * b;

  {
    const l_ = 1 + S * k_l;
    const m_ = 1 + S * k_m;
    const s_ = 1 + S * k_s;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    const l_dS = 3 * k_l * l_ * l_;
    const m_dS = 3 * k_m * m_ * m_;
    const s_dS = 3 * k_s * s_ * s_;

    const l_dS2 = 6 * k_l * k_l * l_;
    const m_dS2 = 6 * k_m * k_m * m_;
    const s_dS2 = 6 * k_s * k_s * s_;

    const f = wl * l + wm * m + ws * s;
    const f1 = wl * l_dS + wm * m_dS + ws * s_dS;
    const f2 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;

    S = S - f * f1 / (f1 * f1 - 0.5 * f * f2);
  }

  return S;
}

export function find_cusp(a: number, b: number): LC {
  const S_cusp = compute_max_saturation(a, b);

  const rgb_at_max = oklab_to_linear_srgb({ L: 1, a: S_cusp * a, b: S_cusp * b });
  const L_cusp = Math.cbrt(1 / Math.max(rgb_at_max.r, rgb_at_max.g, rgb_at_max.b));
  const C_cusp = L_cusp * S_cusp;

  return { L: L_cusp, C: C_cusp };
}

function find_gamut_intersection(a: number, b: number, L1: number, C1: number, L0: number): number {
  const cusp = find_cusp(a, b);

  let t: number;
  if ((L1 - L0) * cusp.C - (cusp.L - L0) * C1 <= 0) {
    t = (cusp.C * L0) / (C1 * cusp.L + cusp.C * (L0 - L1));
  } else {
    t = (cusp.C * (L0 - 1)) / (C1 * (cusp.L - 1) + cusp.C * (L0 - L1));

    {
      const dL = L1 - L0;
      const dC = C1;

      const k_l = +0.3963377774 * a + 0.2158037573 * b;
      const k_m = -0.1055613458 * a - 0.0638541728 * b;
      const k_s = -0.0894841775 * a - 1.2914855480 * b;

      const l_dt = dL + dC * k_l;
      const m_dt = dL + dC * k_m;
      const s_dt = dL + dC * k_s;

      {
        const L = L0 * (1 - t) + t * L1;
        const C = t * C1;

        const l_ = L + C * k_l;
        const m_ = L + C * k_m;
        const s_ = L + C * k_s;

        const l = l_ * l_ * l_;
        const m = m_ * m_ * m_;
        const s = s_ * s_ * s_;

        const ldt = 3 * l_dt * l_ * l_;
        const mdt = 3 * m_dt * m_ * m_;
        const sdt = 3 * s_dt * s_ * s_;

        const ldt2 = 6 * l_dt * l_dt * l_;
        const mdt2 = 6 * m_dt * m_dt * m_;
        const sdt2 = 6 * s_dt * s_dt * s_;

        const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1;
        const r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
        const r2 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;

        const u_r = r1 / (r1 * r1 - 0.5 * r * r2);
        let t_r = -r * u_r;

        const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1;
        const g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
        const g2 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;

        const u_g = g1 / (g1 * g1 - 0.5 * g * g2);
        let t_g = -g * u_g;

        const b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s - 1;
        const b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.7076147010 * sdt;
        const b2 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.7076147010 * sdt2;

        const u_b = b1 / (b1 * b1 - 0.5 * b * b2);
        let t_b = -b * u_b;

        t_r = u_r >= 0 ? t_r : Number.MAX_VALUE;
        t_g = u_g >= 0 ? t_g : Number.MAX_VALUE;
        t_b = u_b >= 0 ? t_b : Number.MAX_VALUE;

        t += Math.min(t_r, Math.min(t_g, t_b));
      }
    }
  }

  return t;
}

function clamp(x: number, min: number, max: number): number {
  return x < min ? min : x > max ? max : x;
}

export function maximum_chroma_for_lh(L: number, h: number): number {
  const a = Math.cos(h);
  const b = Math.sin(h);

  const L0 = clamp(L, 0, 1);

  const t = find_gamut_intersection(a, b, L, 1, L0);

  return t;
}
export function maximum_chroma_for_lh2(L1: number, h: number): number {
  const a = Math.cos(h);
  const b = Math.sin(h);
  const L0 = Math.max(0, Math.min(1, L1));
  const S_cusp = compute_max_saturation(a, b);
  const rgb_at_max = oklab_to_linear_srgb({ L: 1, a: S_cusp * a, b: S_cusp * b });
  const L_cusp = Math.cbrt(1 / Math.max(rgb_at_max.r, rgb_at_max.g, rgb_at_max.b));
  const C_cusp = L_cusp * S_cusp;
  let t: number;
  if ((L1 - L0) * C_cusp - (L_cusp - L0) * 1 <= 0) {
    t = (C_cusp * L0) / (1 * L_cusp + C_cusp * (L0 - L1));
  } else {
    t = (C_cusp * (L0 - 1)) / (1 * (L_cusp - 1) + C_cusp * (L0 - L1));
    {
      const dL = L1 - L0;
      const dC = 1;
      const k_l = +0.3963377774 * a + 0.2158037573 * b;
      const k_m = -0.1055613458 * a - 0.0638541728 * b;
      const k_s = -0.0894841775 * a - 1.2914855480 * b;
      const l_dt = dL + dC * k_l;
      const m_dt = dL + dC * k_m;
      const s_dt = dL + dC * k_s;
      {
        const L = L0 * (1 - t) + t * L1;
        const C = t * 1;
        const l_ = L + C * k_l;
        const m_ = L + C * k_m;
        const s_ = L + C * k_s;
        const l = l_ * l_ * l_;
        const m = m_ * m_ * m_;
        const s = s_ * s_ * s_;
        const ldt = 3 * l_dt * l_ * l_;
        const mdt = 3 * m_dt * m_ * m_;
        const sdt = 3 * s_dt * s_ * s_;
        const ldt2 = 6 * l_dt * l_dt * l_;
        const mdt2 = 6 * m_dt * m_dt * m_;
        const sdt2 = 6 * s_dt * s_dt * s_;
        const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1;
        const r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
        const r2 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;
        const u_r = r1 / (r1 * r1 - 0.5 * r * r2);
        let t_r = -r * u_r;
        const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1;
        const g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
        const g2 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;
        const u_g = g1 / (g1 * g1 - 0.5 * g * g2);
        let t_g = -g * u_g;
        const b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s - 1;
        const b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.7076147010 * sdt;
        const b2 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.7076147010 * sdt2;
        const u_b = b1 / (b1 * b1 - 0.5 * b * b2);
        let t_b = -b * u_b;
        t_r = u_r >= 0 ? t_r : Number.MAX_VALUE;
        t_g = u_g >= 0 ? t_g : Number.MAX_VALUE;
        t_b = u_b >= 0 ? t_b : Number.MAX_VALUE;
        t += Math.min(t_r, Math.min(t_g, t_b));
      }
    }
  }
  return t;
}