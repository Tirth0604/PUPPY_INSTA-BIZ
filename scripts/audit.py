import sys,json,time,re
from pathlib import Path
from urllib.parse import urlparse,urljoin,unquote,parse_qs
sys.path.insert(0,'/tmp/teddy-python')
import requests
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]; out=ROOT/'docs/reference';out.mkdir(parents=True,exist_ok=True)
base='https://puppy.instabizweb.com'; queue=['/'];seen=set(); pages=[];assets={}
s=requests.Session()
for path in ['/robots.txt','/sitemap.xml']:
 r=s.get(base+path,timeout=30);(out/path[1:]).write_text(r.text);print(path,r.status_code,flush=True)
while queue:
 path=queue.pop(0)
 if path in seen:continue
 seen.add(path);r=s.get(base+path,timeout=30)
 soup=BeautifulSoup(r.text,'html.parser');name=path.strip('/').replace('/','__') or 'home';(out/(name+'.html')).write_text(r.text)
 links=[{'text':a.get_text(' ',strip=True),'href':a.get('href')} for a in soup.select('a[href]')]
 for a in links:
  u=urlparse(urljoin(base,a['href']))
  if u.netloc=='puppy.instabizweb.com' and u.path not in seen and not u.path.startswith('/_next'):queue.append(u.path)
 for el in soup.select('img,video,source,link[rel=stylesheet],script[src]'):
  url=el.get('src') or el.get('href');
  if not url:continue
  if url.startswith('/_next/image?'):url=parse_qs(urlparse(url).query)['url'][0]
  assets.setdefault(url,{'url':url,'tag':el.name,'uses':[]})['uses'].append(path)
 pages.append({'path':path,'status':r.status_code,'title':soup.title.get_text() if soup.title else '', 'headings':[h.get_text(' ',strip=True) for h in soup.select('h1,h2,h3')], 'links':links,'forms':[str(f) for f in soup.select('form')],'images':[{'src':im.get('src'),'alt':im.get('alt')} for im in soup.select('img')],'text':soup.find('main').get_text(' ',strip=True) if soup.find('main') else ''})
 print(path,r.status_code,len(pages),flush=True)
(out/'pages.json').write_text(json.dumps(pages,indent=2,ensure_ascii=False));(out/'assets.json').write_text(json.dumps(list(assets.values()),indent=2))
for url in list(assets):
 if assets[url]['tag']=='link':
  r=s.get(urljoin(base,url)); (out/url.split('/')[-1]).write_text(r.text)
print('DONE',len(pages),'pages',len(assets),'assets')
