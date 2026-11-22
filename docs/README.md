# Portfolio Documentation

This folder contains project proof, architecture notes, and generated visuals for the portfolio.

## Contents

- `images/` — matplotlib/PIL-generated visuals used in README and website.
- `projects/talentos.md` — TalentOS proof of concept and architecture summary.
- `projects/waly-presentation.md` — Waly_Presentation proof of concept, capabilities, and evidence.

## Regenerate visuals

```bash
python scripts/generate_visuals.py
```

Outputs are written to `docs/images/` and mirrored to `public/assets/generated/` for the Next.js site.