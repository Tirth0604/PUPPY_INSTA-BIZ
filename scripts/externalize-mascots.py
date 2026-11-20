import sys,json,hashlib
from pathlib import Path
sys.path.insert(0,'/tmp/teddy-python')
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parents[1];file=root/'data/templates.json';templates=json.loads(file.read_text());out=root/'public/images/illustrations';out.mkdir(parents=True,exist_ok=True);records={}
def transform(html,usage):
 s=BeautifulSoup(html,'html.parser')
 for svg in s.select('.pup-buddy svg, .pup-stop svg'):
  alt=svg.get('aria-label','');svg['xmlns']='http://www.w3.org/2000/svg'
  for el in [svg,*svg.find_all(True)]:
   for low,camel in [('viewbox','viewBox'),('preserveaspectratio','preserveAspectRatio'),('gradientunits','gradientUnits'),('gradienttransform','gradientTransform'),('patternunits','patternUnits'),('patterntransform','patternTransform'),('clippathunits','clipPathUnits')]:
    if low in el.attrs:el[camel]=el.attrs.pop(low)
  content=str(svg);key=hashlib.sha256(content.encode()).hexdigest()[:16];path=out/f'mascot-{key}.svg';path.write_text(content)
  records[key]={'source_url':'https://puppy.instabizweb.com/ (authorized inline SVG)', 'local_path':str(path.relative_to(root)), 'uses':[usage], 'permission':'User authorized original illustrations', 'replacement':False,'kind':'derived-svg','width':300,'height':240,'bytes':path.stat().st_size,'content_type':'image/svg+xml','optimization':{'method':'Externalized exact static SVG markup to reduce DOM and hydration work'}}
  img=s.new_tag('img',src='/images/illustrations/'+path.name,alt=alt);img['class']='mascot-art';img['width']='300';img['height']='240';img['loading']='eager' if usage in ['home','mascot'] else 'lazy';svg.replace_with(img)
 return str(s)
for key,v in templates.items():
 if isinstance(v,str):templates[key]=transform(v,key)
 elif isinstance(v,list):templates[key]=[transform(h,key) for h in v]
file.write_text(json.dumps(templates,ensure_ascii=False));manifestfile=root/'docs/reference/asset-manifest.json';manifest=json.loads(manifestfile.read_text());manifest=[x for x in manifest if x.get('kind')!='derived-svg'];manifestfile.write_text(json.dumps(manifest+list(records.values()),indent=2));print('Externalized',len(records),'static mascot SVGs')
