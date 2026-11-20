// Accept the managed preview's Vite-style flags while running the requested Next.js app.
const {spawn}=require('node:child_process');
const args=process.argv.slice(2),port=args.includes('--port')?args[args.indexOf('--port')+1]:'3000';
const child=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'dev','--hostname','0.0.0.0','--port',port],{stdio:'inherit'});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));child.on('exit',code=>process.exit(code||0));
