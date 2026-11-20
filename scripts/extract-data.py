import sys,json,re
from pathlib import Path
sys.path.insert(0,'/tmp/teddy-python')
from bs4 import BeautifulSoup
R=Path(__file__).resolve().parents[1];D=R/'docs/reference'
def soup(name):return BeautifulSoup((D/(name+'.html')).read_text(),'html.parser')
def walk(v):
 if isinstance(v,dict):
  yield v
  for val in v.values():yield from walk(val)
 if isinstance(v,list):
  for val in v:yield from walk(val)
def flight(s):
 for sc in s.select('script'):
  t=sc.get_text();m=re.match(r'self\.__next_f\.push\((.*)\)',t,re.S)
  if not m:continue
  try: st=json.loads(m[1])[1]
  except:continue
  if not isinstance(st,str):continue
  for line in st.split('\n'):
   try: yield from walk(json.loads(line.split(':',1)[1]))
   except Exception:pass
puppies=[]
for f in D.glob('puppies__*.html'):
 s=soup(f.stem); h=s.find('h1');tag=h.parent
 props=list(flight(s));media=next((v['media'] for v in props if 'media' in v and isinstance(v['media'],list)),[])
 vals={d.dt.get_text(' ',strip=True):d.dd.get_text(' ',strip=True) for d in tag.select('dl > div') if d.dt and d.dd}
 puppy=next((v['puppy'] for v in props if isinstance(v.get('puppy'),dict)),{})
 puppies.append({'id':puppy.get('id',f.stem),'slug':f.stem.split('__')[1],'name':h.get_text(' ',strip=True),'breed':vals.get('Breed',''),'gender':vals.get('Boy or girl',''),'age_display':vals.get('Age',''),'origin':'imported' if 'Imported' in vals.get('Where','') else 'local','status':'adopted' if 'Gone home' in tag.get_text() else 'available','media':media,'color':media[0].get('color','#fbe3b4') if media else '#fbe3b4'})
order=[]
for name,sel in [('puppies','.tp-sketches a'),('gone-home','.tp-tickets a')]:
 for a in soup(name).select(sel):
  slug=a['href'].split('/')[-1]
  if slug not in order:order.append(slug)
puppies.sort(key=lambda x:order.index(x['slug']) if x['slug'] in order else 100)
for i,p in enumerate(puppies):p['sort_order']=i;p['status']='available' if i<15 else 'adopted'
faqs=[{'id':n.button['id'][2:],'question':n.button.get_text(' ',strip=True),'answer':n.select_one('.tp-note__flap').get_text(' ',strip=True),'sort_order':i} for i,n in enumerate(soup('faq').select('.tp-note'))]
families=[]
for v in flight(soup('happy-families')):
 if isinstance(v.get('photos'),list): families=v['photos'];break
if not families:
 for v in flight(soup('happy-families')):
  if any(k in v for k in ['images','items']):print('candidate',list(v.keys()))
for n,ls in [('puppies',puppies),('faqs',faqs),('families',families)]:
 (D/(n+'-data.json')).write_text(json.dumps(ls,indent=2,ensure_ascii=False));print(n,len(ls))
print('Origins',[(p['name'],p['origin'],len(p['media'])) for p in puppies])
