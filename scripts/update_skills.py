import json, pathlib
p=pathlib.Path('src/app/data/portfolio.json')
d=json.loads(p.read_text(encoding='utf-8'))
d['skills']['categories']=[
  {"title":"Frontend","items":[
    {"name":"React","icon":"react","color":"#61DAFB"},
    {"name":"Next.js","icon":"nextjs","color":"#FFFFFF"},
    {"name":"TypeScript","icon":"ts","color":"#3178C6"},
    {"name":"Tailwind CSS","icon":"tailwind","color":"#06B6D4"},
    {"name":"Vue.js","icon":"vue","color":"#42B883"},
    {"name":"HTML5","icon":"html","color":"#E34F26"}
  ]},
  {"title":"Backend","items":[
    {"name":"Python","icon":"python","color":"#3776AB"},
    {"name":"FastAPI","icon":"fastapi","color":"#009688"},
    {"name":"PostgreSQL","icon":"postgres","color":"#4169E1"},
    {"name":"Docker","icon":"docker","color":"#2496ED"},
    {"name":"Laravel","icon":"laravel","color":"#FF2D20"},
    {"name":"REST APIs","icon":"postman","color":"#FF6C37"}
  ]},
  {"title":"AI & LLMs","items":[
    {"name":"PyTorch","icon":"pytorch","color":"#EE4C2C"},
    {"name":"Scikit-learn","icon":"sklearn","color":"#F7931E"},
    {"name":"Hugging Face","icon":"huggingface","color":"#FFD21E"},
    {"name":"RAG / LLMs","icon":"openai","color":"#10A37F"},
    {"name":"LangChain","icon":"langchain","color":"#1C3C3C"},
    {"name":"Vector Search","icon":"elasticsearch","color":"#005571"}
  ]},
  {"title":"Data Science","items":[
    {"name":"Pandas","icon":"pandas","color":"#150458"},
    {"name":"NumPy","icon":"numpy","color":"#013243"},
    {"name":"SQL","icon":"mysql","color":"#4479A1"},
    {"name":"Visualization","icon":"matplotlib","color":"#11557C"},
    {"name":"Jupyter","icon":"jupyter","color":"#F37626"},
    {"name":"Statistics","icon":"r","color":"#276DC3"}
  ]}
]
p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('ok')
