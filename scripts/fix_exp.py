import json, pathlib
p=pathlib.Path('src/app/data/portfolio.json')
d=json.loads(p.read_text(encoding='utf-8'))
d['experience'][0] = {
  "title": "Volunteer Software Developer – Programming Team",
  "company": "Port Said Engineering Syndicate",
  "location": "Port Said, Egypt",
  "date_range": "19 Oct 2025 – Present",
  "description_points": [
    "Delivered an internal operations system using Google Apps and Google Apps Script (.gs/.gcode-style automation scripts) to streamline syndicate workflows.",
    "Contributing to the planning and development of the syndicate organization website using PHP Laravel and Vue.js, enabling engineers across Port Said to access services digitally.",
    "Collaborating with the programming team to translate operational requirements into maintainable, user-focused digital solutions."
  ]
}
p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('ok')