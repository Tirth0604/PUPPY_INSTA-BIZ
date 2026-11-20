# Animation inventory

## Live observations

- Initial full-screen quilt curtain and walking mascot; clears to page. Reference CSS hides it after 1.04s. The clone renders the initial curtain with the observed CSS timing and hides it for reduced motion. Internal route changes use the same cover and lift CSS with the route swap between them. The quilt is skipped for reduced motion.
- Header transform: 0.5s cubic-bezier(.22,1,.36,1). Logo rotate: 0.6s cubic-bezier(.34,1.56,.64,1).
- Nav color: 0.25s; paw opacity: 0.25s; paw scale: 0.45s pounce easing.
- Buttons transform: 0.35s pounce; background 0.25s; shadow 0.35s silk.
- Hero seats: CSS tp-peek 0.75s, delay .62s + index*90ms; hover lift 12%. Selection changes over time, interval unverified.
- FAQ folds: grid rows .55s silk; unfold rotates to 0deg, scale 1.015. Search auto-opens matches.
- Scroll reveals have component-specific CSS; preserve these rather than one universal fade.

## Source stylesheet rules

```css
@layer components{.btn{min-height:3.25rem;transition:transform .35s var(--ease-pounce), background-color .25s ease, box-shadow .35s var(--ease-silk);border-radius:999px;justify-content:center;align-items:center;gap:.6rem;padding:.85rem 1.6rem;font-size:1.0625rem;font-weight:650;line-height:1.1;text-decoration:none;display:inline-flex}
.adm-input{background:#fffdf8;border:2px solid #2a170e40;border-radius:.75rem;outline:none;width:100%;min-height:2.75rem;padding:.55rem .85rem;font-size:.98rem;transition:border-color .2s,box-shadow .2s;display:block}
.adm-btn{border:2px solid var(--color-cocoa);background:#fffdf8;border-radius:999px;justify-content:center;align-items:center;gap:.4rem;min-height:2.6rem;padding:.5rem 1rem;font-size:.92rem;font-weight:650;transition:background-color .2s,transform .15s;display:inline-flex}
.tp-curtain[data-state=intro]{animation:0s linear 1.04s forwards tp-curtain-rest}
.tp-curtain[data-state=intro] .tp-curtain__blanket{animation:.48s cubic-bezier(.65,0,.3,1) .56s forwards tp-curtain-lift;transform:translate(0)}
.tp-curtain[data-state=covering] .tp-curtain__blanket{animation:.3s cubic-bezier(.22,1,.36,1) both tp-curtain-cover}
.tp-curtain[data-state=lifting] .tp-curtain__blanket{animation:.46s cubic-bezier(.65,0,.3,1) both tp-curtain-lift}
@keyframes tp-curtain-cover{0%{transform:translateY(calc(100% + 44px))}
@keyframes tp-curtain-lift{0%{transform:translate(0)}
@keyframes tp-curtain-rest{to{visibility:hidden}
.tp-curtain:not([data-state=idle]) .tp-curtain__runner{animation:1.15s cubic-bezier(.32,.1,.4,1) both tp-runner-x}
.tp-curtain:not([data-state=idle]) .tp-curtain__print{animation:1s ease-out both tp-print-step}
@keyframes tp-runner-x{0%{translate:-40%}
@keyframes tp-print-step{0%{opacity:0;scale:.4}
.tp-curtain:not([data-state=idle]) .tp-runner__leg--fn,.tp-curtain:not([data-state=idle]) .tp-runner__leg--bf{animation:.32s ease-in-out infinite alternate tp-runner-leg-a}
.tp-curtain:not([data-state=idle]) .tp-runner__leg--ff,.tp-curtain:not([data-state=idle]) .tp-runner__leg--bn{animation:.32s ease-in-out infinite alternate tp-runner-leg-b}
.tp-curtain:not([data-state=idle]) .tp-runner__body{animation:.16s ease-in-out infinite alternate tp-runner-bob}
.tp-curtain:not([data-state=idle]) .tp-runner__tail{animation:.22s ease-in-out infinite alternate tp-runner-wag}
.tp-curtain:not([data-state=idle]) .tp-runner__ear{animation:.16s ease-in-out infinite alternate tp-runner-ear}
@keyframes tp-runner-leg-a{0%{rotate:24deg}
@keyframes tp-runner-leg-b{0%{rotate:-22deg}
@keyframes tp-runner-bob{0%{translate:0}
@keyframes tp-runner-wag{0%{rotate:-16deg}
@keyframes tp-runner-ear{0%{rotate:0deg}
@media (prefers-reduced-motion:no-preference){html:has(>body>.tp-curtain[data-state=intro]){animation:1.04s tp-hold-still}
html[data-curtain]{animation:7s tp-hold-still}
@keyframes tp-hold-still{0%,to{overflow-y:hidden}
.tp-header{transition:transform .5s var(--ease-silk)}
.tp-header:before{content:"";background:var(--color-milk);opacity:0;transition:opacity .35s;position:absolute;inset:0}
.tp-header__hem{opacity:0;filter:drop-shadow(0 4px 4px #2a170e14);pointer-events:none;transition:opacity .35s;display:block;position:absolute;top:calc(100% - 1px);left:0}
.tp-header__logo{width:2.6rem;height:2.6rem;transition:rotate .6s var(--ease-pounce)}
.tp-nav-link{white-space:nowrap;color:var(--color-cocoa);align-items:center;padding:.55rem .1rem;font-size:1rem;font-weight:620;transition:color .25s;display:inline-flex;position:relative}
.tp-nav-link__paw{width:.8rem;height:.8rem;color:var(--color-toffee);opacity:0;transition:opacity .25s ease, scale .45s var(--ease-pounce);pointer-events:none;position:absolute;bottom:-.45rem;left:50%;translate:-50%;rotate:-10deg;scale:.4}
.tp-menu[open]{animation:tp-menu-in .5s var(--ease-snap)}
.tp-menu[data-closing]{animation:tp-menu-out .42s var(--ease-snap) forwards}
.tp-menu[data-closing]::backdrop{animation:.42s forwards tp-menu-backdrop-out}
.tp-menu[open] .tp-menu-link{animation:tp-menu-link .55s var(--ease-pounce) both}
@keyframes tp-menu-in{0%{clip-path:circle(0% at calc(100% - 3rem) 2rem)}
@keyframes tp-menu-out{0%{clip-path:circle(150% at calc(100% - 3rem) 2rem)}
@keyframes tp-menu-backdrop-out{to{opacity:0}
@keyframes tp-menu-link{0%{opacity:0;transform:translateY(1.2rem)rotate(-2deg)}
.tp-twinkle{animation:3.2s ease-in-out infinite tp-twinkle}
@keyframes tp-twinkle{0%,to{opacity:.35;transform:scale(.8)rotate(0)}
@keyframes tp-float{0%,to{transform:translateY(0)rotate(0)}
@supports (animation-timeline:view()){.tp-polaroid .tp-gone-stamp{animation:linear both tp-stamp-thump;animation-timeline:view();animation-range:entry 30% cover 40%}
@media (prefers-reduced-motion:reduce){.tp-gone-stamp{animation:none!important}
@keyframes tp-stamp-thump{0%{opacity:0;transform:scale(1.25)rotate(-22deg)}
.pup-bubble{border:2.5px solid var(--color-cocoa);background:var(--color-milk);color:var(--color-cocoa);font-family:var(--font-hand);white-space:nowrap;opacity:0;transform-origin:30% 100%;transition:scale .4s var(--ease-pounce), opacity .18s ease-out;border-radius:1.1rem 1.1rem 1.1rem .25rem;padding:.3rem .85rem .35rem;font-size:1.05rem;line-height:1.2;position:absolute;bottom:0;left:0;translate:-50%;scale:.4;box-shadow:2px 3px #2a170e2e}
@supports (animation-timeline:view()){.tp-horizon__sun{animation:linear both tp-sun-set;animation-timeline:view();animation-range:entry exit 30%}
@keyframes tp-sun-set{0%{translate:0 -60%}
.tp-hero__sun{pointer-events:none;animation:tp-sunrise 2.6s var(--ease-silk) both}
@keyframes tp-sunrise{0%{opacity:0;translate:-50% 16%}
.tp-lineup__ghost{height:var(--h);transition:translate .6s var(--ease-pounce);transition-delay:calc(var(--i) * 50ms);display:block;position:relative}
.tp-lineup__pup{transition:translate .6s var(--ease-pounce);transition-delay:calc(var(--i) * 50ms);animation:tp-peek .75s var(--ease-pounce) backwards;animation-delay:calc(.62s + var(--i) * 90ms);border-radius:999px 999px 0 0;display:block;position:relative}
.tp-lineup__photo{height:var(--h);border:3px solid var(--color-cocoa);background:var(--color-honey-soft);box-shadow:inset 0 0 0 4px var(--color-milk);transition:translate .45s var(--ease-pounce);border-bottom:0;border-radius:999px 999px 0 0;display:block;position:relative;overflow:hidden}
@keyframes tp-peek{0%{translate:0 100%}
.tp-lineup__name{translate:var(--tag-x,-50%) .4rem;border:2px solid var(--color-cocoa);background:var(--color-milk);white-space:nowrap;opacity:0;transition:opacity .2s, translate .35s var(--ease-pounce);border-radius:999px;padding:.1rem .7rem;font-size:.95rem;position:absolute;bottom:calc(100% + .4rem);left:50%}
.tp-lineup__pup[data-state=duck] .tp-lineup__photo{opacity:.6;transition:translate .34s var(--ease-snap), scale .34s var(--ease-snap), opacity .34s ease-in;translate:0 108%;scale:.92}
.tp-lineup__pup[data-state=pop] .tp-lineup__photo{animation:tp-pop-up .58s var(--ease-pounce) both}
@keyframes tp-pop-up{0%{opacity:.6;translate:0 108%;scale:.92}
.tp-door__room img{transition:scale .45s var(--ease-silk)}
.tp-door__leaf{border:3px solid var(--color-cocoa);background:repeating-linear-gradient(90deg, transparent 0 calc(25% - 1.5px), #2a170e2e calc(25% - 1.5px) 25%), var(--door);transform-origin:0;border-bottom:0;border-radius:999px 999px 0 0;transition:transform 1.05s cubic-bezier(.3,1.32,.48,1) 50ms;position:absolute;inset:0}
@supports (animation-timeline:view()){.tp-door__leaf{animation:linear both tp-door-open;animation-timeline:view();animation-range:entry 55% cover 48%}
.tp-meet[data-pinned] .tp-door__leaf{animation:none}
@keyframes tp-door-open{0%{transform:rotateY(0)}
@media (prefers-reduced-motion:reduce){.tp-door__leaf{transform:rotateY(var(--door-open))!important;animation:none!important}
.tp-chat__num{border:3px solid var(--color-cocoa);background:var(--color-milk);width:3.4rem;height:3.4rem;color:var(--color-cocoa);transition:background-color .4s, color .4s, scale .5s var(--ease-pounce);border-radius:50%;grid-row:span 2;place-items:center;font-size:1.75rem;display:grid}
.tp-msg-group>*{animation:tp-msg-in .5s var(--ease-pounce) both}
@keyframes tp-msg-in{0%{opacity:0;translate:0 .8rem;scale:.92}
.tp-typing span{background:var(--color-cocoa);border-radius:50%;width:.45rem;height:.45rem;animation:.9s ease-in-out infinite tp-dot}
@keyframes tp-dot{0%,60%,to{translate:0}
.tp-chat__step{opacity:.4;min-height:44vh;transition:opacity .5s}
@supports (animation-timeline:view()){.tp-stamp{animation:linear both tp-stamp-in;animation-timeline:view();animation-range:entry calc(55% + var(--i) * 9%) cover calc(42% + var(--i) * 6%)}
@keyframes tp-stamp-in{0%{opacity:0;scale:1.7;rotate:calc(var(--tilt) - 16deg)}
@media (prefers-reduced-motion:reduce){.tp-stamp{animation:none!important}
@media (prefers-reduced-motion:reduce){.tp-horizon__sun{animation:none!important}
.tp-night__wonder{color:var(--color-honey);font-size:clamp(2.4rem,4vw,3.4rem);line-height:1;animation:3.4s ease-in-out infinite tp-float;position:absolute;top:-2.4rem;left:58%}
@supports (animation-timeline:view()){.tp-house__door{animation:linear both tp-house-open;animation-timeline:view();animation-range:entry 80% cover 52%}
@keyframes tp-house-open{0%{transform:rotateY(0)}
html[data-pup] .tp-house__door{transition:transform 1.2s cubic-bezier(.3,1.25,.5,1) .3s;animation:none;transform:rotateY(0)}
@media (prefers-reduced-motion:reduce){.tp-house__door{animation:none!important}
@media (prefers-reduced-motion:no-preference){.tp-basket__pup .pup-buddy:not([data-live])>svg{transform-origin:70% 66%;animation:3.8s ease-in-out infinite tp-breathe}
.tp-basket__pup .pup-buddy:not([data-live]) [data-p=open]{animation:6.2s infinite tp-blink-open}
.tp-basket__pup .pup-buddy:not([data-live]) [data-p=shut]{animation:6.2s infinite tp-blink-shut}
.tp-basket__pup .pup-buddy:not([data-live]) [data-p=earR]{transform-box:view-box;transform-origin:250px 82px;animation:7.4s ease-in-out 2.2s infinite tp-ear-twitch}
@keyframes tp-breathe{50%{scale:1 1.014}
@keyframes tp-blink-open{0%,92%,97%,to{opacity:1}
@keyframes tp-blink-shut{0%,92%,97%,to{opacity:0}
@keyframes tp-ear-twitch{0%,84%,to{rotate:0deg}
.tp-sketchbook__underline path{fill:none;stroke:var(--color-toffee);stroke-width:7px;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0;transition:stroke-dashoffset .9s var(--ease-silk) .25s}
.tp-sticker-chip{border:2px solid var(--color-cocoa);background:var(--color-milk);min-height:2.75rem;transition:background-color .25s, color .25s, rotate .35s var(--ease-pounce), translate .35s var(--ease-pounce), box-shadow .25s;border-radius:999px;padding:.45rem 1rem;font-size:.95rem;font-weight:650;box-shadow:2px 3px #2a170e24}
.tp-sketch__frame{aspect-ratio:1;rotate:var(--tilt);transition:rotate .6s var(--ease-pounce), scale .35s var(--ease-pounce);display:block;position:relative}
.tp-sketch__wash{width:100%;height:100%;fill:var(--wash);opacity:.55;transition:opacity .6s ease, scale .8s var(--ease-silk);position:absolute;inset:0}
.tp-sketch__photo{background:var(--color-honey-soft);clip-path:circle(75%);transition:clip-path .85s var(--ease-silk) calc(var(--d) + .12s);display:block;position:absolute;inset:4.5%;overflow:hidden;-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
.tp-sketch__photo img{transition:scale .45s var(--ease-silk)}
.tp-sketch__line{fill:none;stroke:var(--color-cocoa);stroke-width:1.9px;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:0;transition:stroke-dashoffset 1s var(--ease-silk) var(--d), stroke .3s}
.tp-sketch__doodle{transform-box:fill-box;transform-origin:50%;transition:scale .5s var(--ease-pounce) calc(var(--d) + .52s), opacity .3s calc(var(--d) + .52s)}
.tp-sketch__sticker{z-index:2;border:2px solid var(--color-cocoa);background:var(--color-milk);color:var(--color-cocoa);transition:scale .45s var(--ease-pounce) calc(var(--d) + .64s), opacity .3s calc(var(--d) + .64s);border-radius:999px;padding:.05rem .7rem .15rem;font-size:.9rem;position:absolute;top:8%;right:-.2rem;rotate:8deg;box-shadow:2px 3px #2a170e33}
.tp-sketch__name{margin-top:1rem;font-size:clamp(1.35rem,2vw,1.85rem);line-height:1.02;transition:color .25s;display:block}
.tp-sketch:is(:hover,:focus-visible) .tp-sketch__doodle{animation:tp-doodle-hop .5s var(--ease-pounce)}
@keyframes tp-doodle-hop{40%{rotate:12deg;scale:1.35}
.tp-sketchbook [data-reveal]:not(.tp-sketch){transition:opacity .6s ease, translate .7s var(--ease-silk)}
.tp-viewer__sharp{opacity:0;transition:opacity .2s ease-out}
.tp-viewer__first--done{visibility:hidden;transition:visibility 0s .2s}
.tp-polaroid{rotate:var(--tilt);transition:rotate .5s var(--ease-pounce), translate .5s var(--ease-pounce), box-shadow .4s var(--ease-silk);background:#fffefb;border-radius:.2rem;padding:.6rem .6rem 0;display:block;position:relative;box-shadow:0 1px 1px #2a170e1f,0 10px 20px -8px #2a170e5c}
.tp-tape{opacity:.88;clip-path:polygon(0 10%,3% 0,50% 4%,97% 0,100% 14%,98% 40%,100% 66%,97% 100%,50% 96%,3% 100%,0 86%,2% 52%);pointer-events:none;transition:scale .35s var(--ease-pounce), opacity .3s}
.tp-wall__item[data-armed][data-revealed] .tp-polaroid{animation:tp-print-bound .62s var(--d) backwards}
@keyframes tp-print-bound{0%{opacity:0;animation-timing-function:cubic-bezier(.2,.7,.3,1);translate:0 1.6rem;scale:.9}
.tp-wall__item[data-armed][data-revealed] .tp-wall__paw{animation:tp-paw-pat .7s calc(var(--d) + .2s) both}
@keyframes tp-paw-pat{0%{opacity:0;animation-timing-function:cubic-bezier(.4,0,.7,.6);transform:translateY(-1.2rem)rotate(-16deg)scale(1.15)}
.tp-wall__item .tp-tape{transition:scale .35s var(--ease-pounce) calc(var(--d) + .42s), opacity .2s calc(var(--d) + .42s)}
.tp-memories [data-reveal]:not(.tp-wall__item){transition:opacity .6s ease, translate .7s var(--ease-silk)}
.tp-photowall .tp-polaroid{transition:opacity .45s ease var(--d), translate .75s var(--ease-pounce) var(--d), rotate .75s var(--ease-pounce) var(--d), box-shadow .4s var(--ease-silk)}
.tp-photowall .tp-tape{transition:scale .35s var(--ease-pounce) calc(var(--d) + .52s), opacity .25s calc(var(--d) + .52s)}
.tp-notes__search input{border:3px solid var(--color-cocoa);background:var(--color-milk);width:100%;height:3.5rem;color:var(--color-cocoa);border-radius:999px;outline:none;padding:0 1.4rem 0 3.4rem;font-size:1.0625rem;transition:box-shadow .25s;box-shadow:0 6px 0 -2px #2a170e59}
.tp-notes__bubble{z-index:1;aspect-ratio:1;border:3px solid var(--color-cocoa);background:var(--color-milk);width:3.1rem;color:var(--color-toffee-deep);pointer-events:none;transform-origin:0 100%;transition:opacity .2s ease, scale .35s var(--ease-pounce);border-radius:50% 50% 50% .4rem;place-items:center;font-size:1.9rem;line-height:1;display:grid;position:absolute;bottom:94%;left:76%}
.tp-notes__bubble>span{transition:opacity .3s ease, scale .45s var(--ease-pounce);grid-area:1/1}
.tp-note{--shift:0rem;border:3px solid var(--color-cocoa);color:var(--color-cocoa);translate:var(--shift) 0;rotate:var(--tilt);transition:rotate .5s var(--ease-pounce), translate .5s var(--ease-pounce), box-shadow .4s var(--ease-silk), scale .5s var(--ease-pounce);background:linear-gradient(#fffcf3,#fff5e2);border-radius:.5rem;position:relative;box-shadow:4px 7px #2a170e40}
.tp-note:after{content:"";border:3px solid var(--color-cocoa);clip-path:polygon(0 0,100% 0,0 100%);width:1.7rem;height:1.7rem;transition:width .4s var(--ease-silk), height .4s var(--ease-silk), opacity .3s ease;background:linear-gradient(135deg,#f0dcb6 50%,#c99a62 50%);border-bottom:0;border-right:0;border-radius:0 0 .5rem;position:absolute;bottom:-3px;right:-3px}
.tp-note__chevron{border-right:3px solid var(--color-toffee-deep);border-bottom:3px solid var(--color-toffee-deep);width:.85rem;height:.85rem;transition:rotate .45s var(--ease-pounce), translate .45s var(--ease-pounce);flex:none;margin-right:.3rem;translate:0 -.2rem;rotate:45deg}
.tp-note__answer{transition:grid-template-rows .55s var(--ease-silk);grid-template-rows:0fr;display:grid}
.tp-note__flap p{color:var(--color-cocoa-soft);white-space:pre-line;transform-origin:50% 0;opacity:0;transition:transform .6s var(--ease-silk), opacity .35s ease;border-top:2px dashed #2a170e47;margin:0 1.4rem 1.4rem;padding-top:1rem;transform:rotateX(-82deg)}
.tp-note[data-armed]{transition:opacity .5s ease calc(min(var(--i), 6) * 70ms), translate .7s var(--ease-pounce) calc(min(var(--i), 6) * 70ms), rotate .7s var(--ease-pounce) calc(min(var(--i), 6) * 70ms), box-shadow .4s var(--ease-silk), scale .5s var(--ease-pounce)}
.tp-note[data-armed] .tp-note__pin{transition:scale .45s var(--ease-pounce) calc(min(var(--i), 6) * 70ms + .35s)}
.tp-note[data-revealed]{transition:rotate .5s var(--ease-pounce), translate .5s var(--ease-pounce), box-shadow .4s var(--ease-silk), scale .5s var(--ease-pounce)}
@media (prefers-reduced-motion:reduce){.tp-note,.tp-note:after,.tp-note__answer,.tp-note__flap p,.tp-note__chevron,.tp-notes__bubble>span{transition:none!important}
.tp-blank :is(input,select){width:100%;height:2.2rem;color:var(--color-toffee-ink);font-family:var(--font-hand);background:0 0;border:0;border-bottom:2.5px dashed #2a170e73;border-radius:.3rem .3rem 0 0;outline:none;padding:0 .25rem;font-size:1.12rem;transition:background-color .25s,border-color .25s}
.tp-post[data-phase=sealing] .tp-letterform,.tp-post[data-phase=posting] .tp-letterform{animation:tp-letter-fold .65s var(--ease-snap) forwards}
@keyframes tp-letter-fold{55%{opacity:.7;transform:perspective(1100px)rotateX(62deg)scale(.8)}
.tp-post__envelope{z-index:1;width:11rem;animation:tp-env-in .45s .3s var(--ease-pounce) both;position:absolute;top:0;left:50%;translate:-50%}
@keyframes tp-env-in{0%{opacity:0;scale:.4}
.tp-post__flap{transform-box:fill-box;transform-origin:50% 0;animation:.3s ease-in .55s both tp-flap}
@keyframes tp-flap{0%{transform:scaleY(-1)}
.tp-post[data-phase=posting] .tp-post__envelope{animation:tp-env-post .85s var(--ease-snap) forwards}
@keyframes tp-env-post{0%{translate:-50%;scale:1}
.tp-post[data-phase=posting] .tp-post__box{animation:tp-box-up .5s var(--ease-pounce) forwards}
@keyframes tp-box-up{to{translate:-50%}
.tp-post[data-phase=posting] .tp-post__flag{animation:tp-flag .4s .75s var(--ease-pounce) forwards}
@keyframes tp-flag{to{rotate:0deg}
.tp-post__sent{border:3px solid var(--color-cocoa);background:var(--color-honey);color:var(--color-cocoa);text-align:center;animation:tp-sent-in .55s var(--ease-pounce) both;border-radius:1.6rem;outline:none;padding:clamp(2rem,5vw,3rem) 1.5rem}
@keyframes tp-sent-in{0%{opacity:0;transform:translateY(1rem)scale(.96)}
@media (prefers-reduced-motion:reduce){.tp-post *,.tp-post__sent{animation:none!important}
.tp-tag[data-revealed]{animation:tp-tag-swing 1.7s var(--ease-silk) both}
@media (hover:hover){.tp-tag[data-revealed]:hover{animation:tp-tag-nudge 1.3s var(--ease-silk)}
@keyframes tp-tag-swing{0%{rotate:calc(-7deg * var(--swing,1));opacity:0}
@keyframes tp-tag-nudge{25%{rotate:calc(1.6deg * var(--swing,1))}
@media (prefers-reduced-motion:reduce){.tp-tag,.tp-tag[data-revealed],.tp-tag[data-revealed]:hover{opacity:1;animation:none;rotate:0deg}
.tp-ticket{rotate:var(--tilt);transition:rotate .45s var(--ease-pounce)}
.tp-ticket__link{filter:drop-shadow(5px 7px #2a170e29);min-height:9.5rem;transition:translate .45s var(--ease-pounce), filter .45s var(--ease-silk);border-radius:1rem;display:flex;position:relative}
.tp-ticket__stub{background:var(--color-honey);transform-origin:0 0;width:3.4rem;transition:rotate .5s var(--ease-pounce);border-left:3px dashed #2a170e8c;border-radius:0 1rem 1rem 0;flex:none;place-items:center;display:grid;-webkit-mask:radial-gradient(circle at 0 0,#0000 .62rem,#000 .66rem) 0 0/51% 51% no-repeat,radial-gradient(circle at 0 100%,#0000 .62rem,#000 .66rem) 0 100%/51% 51% no-repeat,linear-gradient(#000,#000) 100%/50% 100% no-repeat;mask:radial-gradient(circle at 0 0,#0000 .62rem,#000 .66rem) 0 0/51% 51% no-repeat,radial-gradient(circle at 0 100%,#0000 .62rem,#000 .66rem) 0 100%/51% 51% no-repeat,linear-gradient(#000,#000) 100%/50% 100% no-repeat}
.tp-ticket[data-armed] .tp-ticket__link{transition:clip-path .7s var(--ease-silk) calc(var(--i) * 80ms), translate .7s var(--ease-silk) calc(var(--i) * 80ms), filter .45s var(--ease-silk)}
@media (prefers-reduced-motion:reduce){.tp-ticket,.tp-ticket__link,.tp-ticket__stub{transition:none!important}
.tp-poster{border:3px solid var(--color-cocoa);width:min(100%,34rem);color:var(--color-cocoa);text-align:center;animation:tp-poster-in .9s var(--ease-pounce) both;background:radial-gradient(at 20% 10%,#fff9,#0000 60%),#fff6df;border-radius:.6rem;padding:clamp(1.6rem,5vw,2.6rem) clamp(1.2rem,4.5vw,2.4rem) 0;position:relative;rotate:-1.2deg;box-shadow:8px 12px #2a170e29}
.tp-poster__tab{writing-mode:vertical-rl;transform-origin:50% 0;height:8.5rem;transition:rotate .45s var(--ease-pounce), background-color .25s ease;place-items:center;padding:.6rem .2rem;font-size:.95rem;font-weight:700;display:grid}
@keyframes tp-poster-in{0%{opacity:0;transform:translateY(-1.5rem)rotate(3deg)}
@media (prefers-reduced-motion:reduce){.tp-poster{animation:none}
.tp-poster__tab{transition:none}
.tp-switch__thumb{width:calc((100% - .8rem) / var(--n));background:var(--color-toffee-deep);translate:calc(var(--at) * 100%) 0;transition:translate .5s var(--ease-pounce);border-radius:999px;position:absolute;top:.4rem;bottom:.4rem;left:.4rem}
.tp-switch__tab{z-index:1;color:var(--color-cocoa);border-radius:999px;justify-items:center;gap:.15rem;padding:.75rem 1rem;transition:color .3s;display:grid;position:relative}
.tp-step{border:3px solid var(--color-cocoa);background:var(--color-milk);transition:translate .4s var(--ease-pounce), rotate .4s var(--ease-pounce), box-shadow .4s var(--ease-silk);border-radius:1.6rem;align-content:start;gap:.5rem;padding:1.5rem 1.4rem 1.6rem;display:grid;position:relative;box-shadow:6px 8px #2a170e1a}
@media (prefers-reduced-motion:no-preference){.tp-journeys[data-ready] .tp-step{animation:tp-step-in .55s var(--ease-pounce) both;animation-delay:calc(var(--i) * 90ms)}
.tp-postcard__plane{animation:3.2s ease-in-out infinite tp-plane-bob}
@keyframes tp-step-in{0%{opacity:0;translate:0 1.25rem;rotate:1.5deg}
@keyframes tp-plane-bob{50%{translate:0 -6px;rotate:-3deg}
@media (prefers-reduced-motion:reduce){.tp-switch__thumb,.tp-step{transition:none}
```

Desktop samples confirm the reference pointer-follow response, single-seat duck/pop rotation and staged chat. The clone uses the reference’s 750 ms typing delay on forward chat steps, a directional 700 ms page turn in profiles, and a directional slide in the full screen viewer. The contact letter folds and posts only after persistence succeeds. The mobile menu uses the recorded clip-path open and close rules and link stagger. Journey tabs animate the selector and steps. Teddy now uses a persistent fixed actor with scroll-following movement, a hallway treadmill, idle animation, mobile peekaboo and pointer reactions. The source has additional pose and cue logic. Its exact mascot choreography and native mobile visual parity have not been independently verified.
