(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),s=n(9),c=n.n(s),i=n(1);var o=function(){var e=Object(a.useState)(0),t=Object(i.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)("reset"),c=Object(i.a)(s,2),o=c[0],u=c[1],l=Object(a.useRef)(null);return{time:n,state:o,handleStart:function(){u("running"),l.current=setInterval((function(){return r((function(e){return e+10}))}),10)},handleStop:function(){u("stopped"),clearInterval(l.current)},handleReset:function(){u("reset"),clearInterval(l.current),r(0)}}},u=n(6),l=n(3);function d(e,t){return e[t]}var h=n(4),j=n.p+"static/media/flag.12de066e.svg",f=n.p+"static/media/mine.99a3231c.svg",b=n.p+"static/media/flagged-mine.419c9e8a.svg",m=n.p+"static/media/clicked-mine.90b81e3c.svg",g=n(0),O=Object(g.jsx)("img",{src:j,alt:"F"}),p=Object(g.jsx)("img",{src:f,alt:"M"}),v=Object(g.jsx)("img",{src:b,alt:"FM"}),w=Object(g.jsx)("img",{src:m,alt:"!!!"});function x(e,t,n,a){if("reset"===a||"ongoing"===a)switch(t){case"hide":return"";case"show":return n;case"flag":return O;default:return"Error!"}else{if("won"===a)return e?"hide"===t?p:v:n;if("lost"===a)if(e)switch(t){case"hide":return p;case"show":return w;case"flag":return v;default:return"Error!"}else switch(t){case"hide":return"";case"show":return n;case"flag":return O;default:return"Error!"}}}function y(e,t,n,a){return"show"===t?"cell":"cell hidden"}function C(e,t,n,a){return"won"===a||"lost"===a?"_"+n.toString():"hide"===t?"clickable":"_"+n.toString()}function S(e,t,n,a,r,s,c,o,u,l){if("won"!==r&&"lost"!==r){var d=c[e][t];if("reset"===r&&"hide"===d.state&&(s("ongoing"),function(e,t,n,a,r){var s=[a.length,a[0].length],c=s[0],o=s[1],u=c*o,l=R(e,t,c,o).length,d=Math.max(0,n-(u-(l+1))),j=N(u-(l+1),n-d),f=N(l,d);(function(e,t,n,a,r,s){for(var c=Object(h.a)(r),i=0;i<r.length;i++)for(var o=0;o<r[0].length;o++)i===e&&o===t?c[i][o].hasMine=!1:I(i,o,e,t)?c[i][o].hasMine=a.pop():c[i][o].hasMine=n.pop();s(c)})(e,t,j,f,a,r),function(e,t){for(var n=Object(h.a)(e),a=function(t){for(var a=function(a){R(t,a,e.length,e[0].length).forEach((function(r){var s=Object(i.a)(r,2),c=s[0],o=s[1];e[c][o].hasMine&&(n[t][a].adjCount+=1)}))},r=0;r<e[0].length;r++)a(r)},r=0;r<e.length;r++)a(r);t(n)}(a,r)}(e,t,n,c,o),u()),"hide"===d.state&&d.hasMine){var j=Object(h.a)(c);j[e][t].state="show",o(j),s("lost"),l()}else"hide"===d.state?T([[e,t]],a,s,c,o):"show"===d.state&&function(e,t,n){var a=[n.length,n[0].length],r=a[0],s=a[1];return n[e][t].adjCount===R(e,t,r,s).filter((function(e){var t=Object(i.a)(e,2),a=t[0],r=t[1];return"flag"===n[a][r].state})).length}(e,t,c)&&function(e,t,n,a,r,s){var c=[r.length,r[0].length],i=c[0],o=c[1];T(R(e,t,i,o),n,a,r,s)}(e,t,a,s,c,o)}}var k=function(e){var t=e.args,n=t.rowInd,a=t.colInd,r=t.hasMine,s=t.setRevealCount,c=t.setFlagCount,i=t.state,o=t.adjCount,u=t.mineCount,l=t.gameState,d=t.setGameState,j=t.field,f=t.setField,b=t.handleStart,m=t.handleStop;return Object(g.jsx)("td",{className:y(0,i),children:Object(g.jsx)("button",{type:"button",className:C(0,i,o,l),onClick:function(){return S(n,a,u,s,l,d,j,f,b,m)},onContextMenu:function(e){return function(e,t,n,a,r,s,c){if(e.preventDefault(),"won"!==a&&"lost"!==a){var i=s[t][n];"hide"===i.state?(c((function(e){var a=Object(h.a)(e);return a[t][n].state="flag",a})),r((function(e){return e+1}))):"flag"===i.state&&(c((function(e){var a=Object(h.a)(e);return a[t][n].state="hide",a})),r((function(e){return e-1})))}}(e,n,a,l,c,j,f)},children:x(r,i,o,l)})})},M=[[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]];function F(e,t){for(var n=[],a=0;a<e;a++){for(var r=[],s=0;s<t;s++)r.push({state:"hide",adjCount:0});n.push(r)}return n}function N(e,t){for(var n=[],a=0;a<e;a++)a<t?n.push(!0):n.push(!1);return function(e){for(var t=0;t<e.length;t++){var n=G(t,e.length-1),a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}return e}(n)}function I(e,t,n,a){var r=Math.abs(e-n),s=Math.abs(t-a);return r<=1&&s<=1&&r+s>0}function R(e,t,n,a){return M.map((function(n){var a=Object(i.a)(n,2),r=a[0],s=a[1];return[e+r,t+s]})).filter((function(e){var t=Object(i.a)(e,2),r=t[0],s=t[1];return 0<=r&&r<n&&0<=s&&s<a}))}function G(e,t){return Math.floor(Math.random()*(t-e+1))+e}function E(e,t,n,a,r,s,c){var i=e.rows,o=e.columns,u=e.mines;r("reset"),t(u),n(0),a(0),c(),s(F(i,o))}function T(e,t,n,a,r){for(;e.length>0;){var s=e.pop(),c=Object(i.a)(s,2),o=c[0],u=c[1];if("hide"===a[o][u].state){var l=Object(h.a)(a);l[o][u].state="show",r(l),a[o][u].hasMine?n("lost"):(t((function(e){return e+1})),0===a[o][u].adjCount&&R(o,u,a.length,a[0].length).forEach((function(t){var n=Object(i.a)(t,2),r=n[0],s=n[1];"hide"===a[r][s].state&&e.push([r,s])})))}}}var z=function(e){var t=e.args,n=t.mineCount,a=t.setRevealCount,r=t.setFlagCount,s=t.gameState,c=t.setGameState,i=t.field,o=t.setField,u=t.handleStart,d=t.handleStop;return Object(g.jsx)("table",{className:"field",children:Object(g.jsx)("tbody",{children:i.map((function(e,t){return Object(g.jsx)("tr",{children:e.map((function(e,h){return Object(g.jsx)(k,{args:Object(l.a)(Object(l.a)({},e),{},{rowInd:t,colInd:h,mineCount:n,setRevealCount:a,setFlagCount:r,gameState:s,setGameState:c,field:i,setField:o,handleStart:u,handleStop:d})},h)}))},t)}))})})},L=["Easy","Medium","Hard"],_=["Rows","Columns","Mines"];function A(e,t){var n=t.rows,a=t.columns,r=t.mines;switch(e){case"mines":return 0<=r&&r<n*a;case"rows":return 0<n&&n<=24;case"columns":return 0<a&&a<=30;default:return!1}}function H(e){switch(e){case"easy":return{rows:9,columns:9,mines:10};case"medium":return{rows:16,columns:16,mines:40};case"hard":return{rows:16,columns:30,mines:99};default:return{rows:10,columns:10,mines:99}}}function Y(e){var t=H(e.toLowerCase());return t.rows+"x"+t.columns+", "+t.mines+" mines"}function J(e){return Object(g.jsxs)("div",{className:"density",children:["Mine density:"," ",e.rows>0&&e.columns>0?Math.round(100*e.mines/(e.rows*e.columns))+"%":"N/A"]})}function B(e){switch(e){case"rows":return"Must be between 1 and 24 inclusive.";case"columns":return"Must be between 1 and 30 inclusive.";case"mines":return"Must be fewer mines than cells.";default:return"An unknown error has occured."}}function D(e,t,n,a){var r=d(t,e);(a>0||r>0)&&n(Object(l.a)(Object(l.a)({},t),{},Object(u.a)({},e,r+a)))}function U(e){var t=e.difficulty,n=e.inputs,a=e.setInputs,r=t.toLowerCase();return Object(g.jsxs)("div",{className:"radio",children:[Object(g.jsx)("input",{type:"radio",id:r,name:"difficulty",value:r,checked:n.difficulty===r,onChange:function(e){return function(e,t,n){n(Object(l.a)(Object(l.a)({},t),{},{difficulty:e.target.value}))}(e,n,a)}}),Object(g.jsxs)("label",{htmlFor:r,children:[Object(g.jsx)("div",{className:"diff",children:t+":"}),Object(g.jsx)("div",{className:"desc",children:Y(t)})]})]})}function W(e){var t=e.input,n=e.inputs,a=e.setInputs,r=t.toLowerCase();return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"input",children:[Object(g.jsxs)("label",{htmlFor:r,children:[t,":"]}),Object(g.jsx)("button",{type:"button",onClick:function(){return D(r,n,a,-1)},children:"-"}),Object(g.jsx)("input",{type:"text",id:r,name:r,value:d(n,r),onChange:function(e){return function(e,t,n,a){var r=e.target.value,s=+r;(function(e){return""===e||/^[0-9\b]+$/.test(e)})(r)&&n(Object(l.a)(Object(l.a)({},t),{},Object(u.a)({},a,s)))}(e,n,a,r)}}),Object(g.jsx)("button",{type:"button",onClick:function(){return D(r,n,a,1)},children:"+"}),A(r,n)?Object(g.jsx)("span",{style:{color:"green"},children:"\u2713"}):Object(g.jsxs)("span",{className:"toolcontainer",style:{color:"red"},children:["\u2717",Object(g.jsx)("span",{className:"tooltip",children:B(r)})]})]})})}var $=function(e){var t=e.args,n=t.setMineCount,r=t.setRevealCount,s=t.setFlagCount,c=t.setGameState,o=t.setField,u=t.handleReset,l=Object(a.useState)({rows:9,columns:9,mines:10,difficulty:"easy"}),d=Object(i.a)(l,2),h=d[0],j=d[1];return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"options",children:[Object(g.jsxs)("div",{className:"option",children:[Object(g.jsx)("h4",{children:"Standard Game"}),L.map((function(e){return Object(g.jsx)(U,{difficulty:e,inputs:h,setInputs:j},e)})),J(H(h.difficulty)),Object(g.jsx)("button",{type:"button",className:"start",onClick:function(){return function(e,t,n,a,r,s,c){E(H(e),t,n,a,r,s,c)}(h.difficulty,n,r,s,c,o,u)},children:"Start Standard Game"})]}),Object(g.jsxs)("div",{className:"option",children:[Object(g.jsx)("h4",{children:"Custom Game"}),_.map((function(e){return Object(g.jsx)(W,{input:e,inputs:h,setInputs:j},e)})),J(h),Object(g.jsx)("button",{type:"button",className:"start",onClick:function(){return function(e,t,n,a,r,s,c){_.every((function(t){return A(t.toLowerCase(),e)}))?E(e,t,n,a,r,s,c):alert('Invalid parameters. However over red "x"s for details.')}(h,n,r,s,c,o,u)},children:"Start Custom Game"})]})]})})};function q(){return Object(g.jsxs)("div",{className:"rules",children:[Object(g.jsx)("h4",{children:"Rules"}),Object(g.jsx)("p",{children:"All cells start covered. Certain cells have mines hidden underneath them. The goal is to uncover all the cells without mines. If you uncover a mine, you lose."}),Object(g.jsx)("p",{children:"When you uncover a non-mine cell, it will show you how many of the (up to 8) adjacent cells contain mines -- or, if there are no adjacent mines, it will automatically uncover all adjacent cells for you."}),Object(g.jsx)("p",{children:"You can mark cells that you think contain mines with a flag by right-clicking on them. Clicking a flagged cell will do nothing -- so you can't accidentally click it later. To unflag a cell, simply right-click it again."}),Object(g.jsx)("p",{children:"If you click an aready-uncovered cell and it's number matches the number of adjacent flags, all other adjecent cells will be uncovered. This can save you some clicks, but isn't necessary."}),Object(g.jsx)("p",{children:"For a custom game, a mine density between 12% and 20% is recommended."}),Object(g.jsxs)("p",{children:["If you like minesweeper, consider"," ",Object(g.jsx)("a",{href:"https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/mines.html",target:"_blank",rel:"noopener noreferrer",children:"this superior implementation"})," ","which guarantees you will never need to guess, and"," ",Object(g.jsx)("a",{href:"https://pwmarcz.pl/kaboom/",target:"_blank",rel:"noopener noreferrer",children:"this neat variation"})," ","which always penalizes a guess, unless guessing is necessary in which case any guess will be fine."]})]})}var K=function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],r=t[1];return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("button",{type:"button",className:"rules-button",onClick:function(){return r(!n)},children:n?"Hide Rules":"Show Rules"}),n&&Object(g.jsx)(q,{})]})};function P(e){switch(e){case"reset":return"The field is reset. Click anywhere to begin.";case"ongoing":return"The game is in progress.";case"won":return"Congratulations, you won!";case"lost":return"Uh oh, you uncovered a mine. You lost.";default:return"You found an error!"}}var Q=function(e){var t=e.args,n=t.time,a=t.gameState,r=t.flagCount,s=Math.floor(n/1e3);return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("p",{children:["Flags: ",Object(g.jsx)("span",{className:"fixed-width-span",children:r})]}),Object(g.jsxs)("p",{children:["Time: ",Object(g.jsx)("span",{className:"fixed-width-span",children:s})]}),Object(g.jsx)("p",{children:P(a)}),Object(g.jsx)(K,{})]})};n(15),n(16),n(17),n(18),n(19);var V=function(){var e=Object(a.useState)(10),t=Object(i.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(0),c=Object(i.a)(s,2),u=c[0],l=c[1],d=Object(a.useState)(0),h=Object(i.a)(d,2),j=h[0],f=h[1],b=Object(a.useState)("reset"),m=Object(i.a)(b,2),O=m[0],p=m[1],v=Object(a.useState)(F(9,9)),w=Object(i.a)(v,2),x=w[0],y=w[1],C=o(),S=C.time,k=C.handleStart,M=C.handleStop,N=C.handleReset;return Object(a.useEffect)((function(){u+n===x.length*x[0].length&&(p("won"),M())}),[u,n,x,M]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h1",{children:"Minesweeper"}),Object(g.jsx)($,{args:{setMineCount:r,setRevealCount:l,setFlagCount:f,setGameState:p,setField:y,handleReset:N}}),Object(g.jsx)(z,{args:{mineCount:n,gameState:O,setGameState:p,field:x,setField:y,setRevealCount:l,setFlagCount:f,handleStart:k,handleStop:M}}),Object(g.jsx)(Q,{args:{time:S,gameState:O,flagCount:j}})]})};c.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(V,{})}),document.getElementById("root"))}],[[20,1,2]]]);
//# sourceMappingURL=main.df7ad039.chunk.js.map