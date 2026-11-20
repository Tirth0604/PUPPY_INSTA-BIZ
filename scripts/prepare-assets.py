import sys,re,json,concurrent.futures
from pathlib import Path
from urllib.parse import urljoin,urlparse,parse_qs
sys.path.insert(0,'/tmp/teddy-python')
import requests
from bs4 import BeautifulSoup
R=Path(__file__).resolve().parents[1];D=R/'docs/reference';P=R/'public';P.mkdir(exist_ok=True)
assets={}
def add(url,use,**meta):
 if not url or url.startswith('data:'):return
 if url.startswith('/_next/image?'):url=parse_qs(urlparse(url).query)['url'][0]
 if not url.startswith('/'):return
 if url.startswith('/_next/static/chunks'):return
 a=assets.setdefault(url,{'source_url':'https://puppy.instabizweb.com'+url,'local_path':('public'+url).replace('public/_next/static/media/','public/fonts/'),'uses':[],'permission':'User confirmed reuse authorization, 2026-11-20','replacement':False,**meta});a['uses'].append(use)
for f in D.glob('*.html'):
 s=BeautifulSoup(f.read_text(),'html.parser')
 for e in s.select('img,video,source'):add(e.get('src'),f.stem,width=e.get('width'),height=e.get('height'))
for f in D.glob('*-data.json'):
 def walk(v):
  if isinstance(v,dict):
   if isinstance(v.get('url'),str):add(v['url'],f.stem,width=v.get('width'),height=v.get('height'),kind=v.get('kind'))
   for x in v.values():walk(x)
  if isinstance(v,list):
   for x in v:walk(x)
 walk(json.loads(f.read_text()))
css='\n'.join(f.read_text() for f in D.glob('*.css'))
for url in re.findall(r'url\(([^)]+)\)',css):
 url=url.strip('\"\'')
 if not url.startswith('data:'):
  full=urljoin('/_next/static/chunks/x.css',url);add(full,'styles');css=css.replace(url,full)
(R/'app').mkdir(exist_ok=True);(R/'app/reference.css').write_text(css.replace('/_next/static/media/','/fonts/'))
def download(item):
 url,a=item;p=R/a['local_path'];p.parent.mkdir(parents=True,exist_ok=True)
 try:
  r=requests.get(a['source_url'],timeout=60);r.raise_for_status();p.write_bytes(r.content);a['bytes']=len(r.content);a['content_type']=r.headers.get('content-type');a['download_status']='ok'
 except Exception as e:a['download_status']=str(e)
 return a
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
 result=list(ex.map(download,assets.items()))
(D/'asset-manifest.json').write_text(json.dumps(result,indent=2));print('Assets',len(result),'failed',[(a['source_url'],a['download_status']) for a in result if a['download_status']!='ok'])
