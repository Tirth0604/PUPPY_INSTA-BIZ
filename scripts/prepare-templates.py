import sys,json,re
from pathlib import Path
from urllib.parse import urlparse,parse_qs
sys.path.insert(0,'/tmp/teddy-python')
from bs4 import BeautifulSoup
R=Path(__file__).resolve().parents[1];D=R/'docs/reference';O=R/'data';O.mkdir(exist_ok=True)
def read(n):return BeautifulSoup((D/(n+'.html')).read_text(),'html.parser')
def clean(e):
 for el in list(e.select('script,canvas,template')):el.decompose()
 for el in e.find_all(True):
  for a in list(el.attrs):
   if a.startswith('on') or a in ['data-nimg','srcset']:del el[a]
  if el.name=='img':
   src=el.get('src','');el['src']=parse_qs(urlparse(src).query)['url'][0] if src.startswith('/_next/image?') else src
   el.attrs.pop('sizes',None)
 return str(e)
def slot(s,selector,name):
 e=s.select_one(selector)
 if e:
  x=s.new_tag('demo-slot');x['name']=name;e.replace_with(x)
home=read('home');head=home.header
# Keep the reference header presentation; behavior is independently implemented.
footer=home.footer
frags={'footer':clean(footer),'mascot':clean(read('home').select_one('.tp-hero .pup-buddy'))}
frags['header']=clean(head)
frags['curtain']=clean(read('home').select_one('.tp-curtain'))
frags['sticky']=clean(read('home').select_one('body > div.fixed'))
for name in ['home','puppies','gone-home','happy-families','how-it-works','faq','contact']:
 s=read(name)
 if name=='home':
  slot(s,'.tp-lineup','hero');
  if s.select_one('.tp-lineup--tags'):s.select_one('.tp-lineup--tags').decompose()
  slot(s,'.tp-photowall__prints','home-families');slot(s,'.tp-clip','clip')
 if name=='puppies':slot(s,'.tp-sketches','catalogue')
 if name=='happy-families':
  # Entire wall list replaced with React photo buttons.
  wall=s.select_one('.tp-wall__print'); print('wall parent',wall.parent.name,wall.parent.get('class'),wall.parent.parent.get('class'))
  slot(s,'.tp-wall','families')
 if name=='faq':slot(s,'.tp-notes','faq')
 if name=='contact':slot(s,'form','contact-form')
 if name=='how-it-works':slot(s,'.tp-journeys','journeys')
 frags[name]=clean(s.select_one('main > .tp-page'))
# Catalogue card markup is presentational only and compiled once per record.
s=read('puppies');frags['catalogue-cards']=[clean(li) for li in s.select('.tp-sketches > li')]
s=read('how-it-works');frags['journeys']=clean(s.select_one('.tp-journeys'))
s=read('faq');frags['faq-side']=clean(s.select_one('.tp-notes__side'));frags['faq-mascot']=clean(s.select_one('.tp-notes__teddy .pup-buddy'))
s=read('puppies__maltipoo-max-male');frags['profile-mascot']=clean(s.select_one('.tp-tag .pup-buddy'));frags['health']=clean(s.select_one('.tp-tag').find_next_sibling())
frags['profile-ribbon']=clean(s.select_one('.tp-ribbon'))
frags['profile-available']=clean(s.select_one('.tp-tag .chip'))
frags['profile-adopted']=clean(read('puppies__pomeranian-ace-boy').select_one('.tp-tag > .inline-grid'))
frags['profile-gallery-example']=clean(s.select_one('[aria-label="All photos of Max"]').parent)
# Keep intact page typography/illustration markup, sanitized at generation time.
for name,selector,key in [('home','.tp-photowall__prints','home-family-list'),('happy-families','.tp-wall','family-list')]:
 s=read(name);ls=s.select_one(selector)
 for i,b in enumerate(ls.select('button')):b['data-photo-index']=str(i)
 frags[key]=clean(ls)
photos=json.loads((D/'families-data.json').read_text());byurl={x['url']:x for x in photos};preview=[]
for b in read('home').select('.tp-photowall__print'):
 url=parse_qs(urlparse(b.img['src']).query)['url'][0];preview.append(byurl[url])
(O/'home-families.json').write_text(json.dumps(preview,ensure_ascii=False))
(O/'templates.json').write_text(json.dumps(frags,ensure_ascii=False))
for name in ['puppies','families','faqs']:(O/(name+'.json')).write_text((D/(name+'-data.json')).read_text())
print('templates saved',list(frags))
