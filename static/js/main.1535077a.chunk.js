(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),s=n(9),c=n.n(s),i=n(1);var o=function(){var e=Object(a.useState)(0),t=Object(i.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)("reset"),c=Object(i.a)(s,2),o=c[0],l=c[1],u=Object(a.useRef)(null);return{time:n,state:o,handleStart:function(){l("running"),u.current=setInterval((function(){return r((function(e){return e+10}))}),10)},handleStop:function(){clearInterval(u.current),l("stopped")},handleReset:function(){clearInterval(u.current),r(0),l("reset")}}},l=n(5),u=n(3);var h=function(){var e=Object(a.useState)(JSON.parse(localStorage.getItem("HS"))||{}),t=Object(i.a)(e,2),n=t[0],r=t[1];function s(e,t,n){return e+"-"+t+"-"+n}function c(e,t,a){var r=s(e,t,a),c=n[r];return void 0===c?Number.POSITIVE_INFINITY:c}return{getHighScore:c,updateHighScore:function(e,t,a,i){var o=s(e,t,a),h=c(e,t,a),j=Math.min(h,i),d=Object(u.a)(Object(u.a)({},n),{},Object(l.a)({},o,j));r(d),localStorage.setItem("HS",JSON.stringify(d))},resetHighScore:function(e,t,a){var c=s(e,t,a),i=Object(u.a)({},n);delete i[c],r(i),localStorage.setItem("HS",JSON.stringify(i))},resetHighScores:function(){r({}),localStorage.setItem("HS",JSON.stringify({}))}}},j=n(4),d=n.p+"static/media/flag.12de066e.svg",f=n.p+"static/media/mine.99a3231c.svg",b=n.p+"static/media/flagged-mine.419c9e8a.svg",m=n.p+"static/media/clicked-mine.90b81e3c.svg",g=n(0),O=Object(g.jsx)("img",{src:d,alt:"F"}),p=Object(g.jsx)("img",{src:f,alt:"M"}),v=Object(g.jsx)("img",{src:b,alt:"FM"}),x=Object(g.jsx)("img",{src:m,alt:"!!!"});function S(e,t,n,a){if("reset"===a||"ongoing"===a)switch(t){case"hide":return"";case"show":return n;case"flag":return O;default:return"Error!"}else{if("won"===a)return e?"hide"===t?p:v:n;if("lost"===a)if(e)switch(t){case"hide":return p;case"show":return x;case"flag":return v;default:return"Error!"}else switch(t){case"hide":return"";case"show":return n;case"flag":return O;default:return"Error!"}}}function w(e,t,n,a){return"show"===t?"cell":"cell hidden"}function y(e,t,n,a){return"won"===a||"lost"===a?"_"+n.toString():"hide"===t?"clickable":"_"+n.toString()}function C(e,t,n,a,r,s,c,o,l,u){if("won"!==r&&"lost"!==r){var h=c[e][t];if("reset"===r&&"hide"===h.state&&(s("ongoing"),function(e,t,n,a,r){var s=[a.length,a[0].length],c=s[0],o=s[1],l=c*o,u=H(e,t,c,o).length,h=Math.max(0,n-(l-(u+1))),d=M(l-(u+1),n-h),f=M(u,h);(function(e,t,n,a,r,s){for(var c=Object(j.a)(r),i=0;i<r.length;i++)for(var o=0;o<r[0].length;o++)i===e&&o===t?c[i][o].hasMine=!1:F(i,o,e,t)?c[i][o].hasMine=a.pop():c[i][o].hasMine=n.pop();s(c)})(e,t,d,f,a,r),function(e,t){for(var n=Object(j.a)(e),a=function(t){for(var a=function(a){H(t,a,e.length,e[0].length).forEach((function(r){var s=Object(i.a)(r,2),c=s[0],o=s[1];e[c][o].hasMine&&(n[t][a].adjCount+=1)}))},r=0;r<e[0].length;r++)a(r)},r=0;r<e.length;r++)a(r);t(n)}(a,r)}(e,t,n,c,o),l()),"hide"===h.state&&h.hasMine){var d=Object(j.a)(c);d[e][t].state="show",o(d),s("lost"),u()}else"hide"===h.state?E([[e,t]],a,s,c,o,u):"show"===h.state&&function(e,t,n){var a=[n.length,n[0].length],r=a[0],s=a[1];return n[e][t].adjCount===H(e,t,r,s).filter((function(e){var t=Object(i.a)(e,2),a=t[0],r=t[1];return"flag"===n[a][r].state})).length}(e,t,c)&&function(e,t,n,a,r,s,c){var i=[r.length,r[0].length],o=i[0],l=i[1];E(H(e,t,o,l),n,a,r,s,c)}(e,t,a,s,c,o,u)}}var N=function(e){var t=e.args,n=t.rowInd,a=t.colInd,r=t.hasMine,s=t.setRevealCount,c=t.setFlagCount,i=t.state,o=t.adjCount,l=t.mineCount,u=t.gameState,h=t.setGameState,d=t.field,f=t.setField,b=t.handleStart,m=t.handleStop;return Object(g.jsx)("td",{className:w(0,i),children:Object(g.jsx)("button",{type:"button",className:y(0,i,o,u),onClick:function(){return C(n,a,l,s,u,h,d,f,b,m)},onContextMenu:function(e){return function(e,t,n,a,r,s,c){if(e.preventDefault(),"won"!==a&&"lost"!==a){var i=s[t][n];"hide"===i.state?(c((function(e){var a=Object(j.a)(e);return a[t][n].state="flag",a})),r((function(e){return e+1}))):"flag"===i.state&&(c((function(e){var a=Object(j.a)(e);return a[t][n].state="hide",a})),r((function(e){return e-1})))}}(e,n,a,u,c,d,f)},children:S(r,i,o,u)})})},k=[[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]];function I(e,t){for(var n=[],a=0;a<e;a++){for(var r=[],s=0;s<t;s++)r.push({state:"hide",adjCount:0});n.push(r)}return n}function M(e,t){for(var n=[],a=0;a<e;a++)a<t?n.push(!0):n.push(!1);return function(e){for(var t=0;t<e.length;t++){var n=R(t,e.length-1),a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}return e}(n)}function F(e,t,n,a){var r=Math.abs(e-n),s=Math.abs(t-a);return r<=1&&s<=1&&r+s>0}function H(e,t,n,a){return k.map((function(n){var a=Object(i.a)(n,2),r=a[0],s=a[1];return[e+r,t+s]})).filter((function(e){var t=Object(i.a)(e,2),r=t[0],s=t[1];return 0<=r&&r<n&&0<=s&&s<a}))}function R(e,t){return Math.floor(Math.random()*(t-e+1))+e}function T(e,t,n,a,r,s,c){var i=e.rows,o=e.columns,l=e.mines;r("reset"),t(l),n(0),a(0),c(),s(I(i,o))}function E(e,t,n,a,r,s){for(;e.length>0;){var c=e.pop(),o=Object(i.a)(c,2),l=o[0],u=o[1];if("hide"===a[l][u].state){var h=Object(j.a)(a);h[l][u].state="show",r(h),a[l][u].hasMine?(n("lost"),s()):(t((function(e){return e+1})),0===a[l][u].adjCount&&H(l,u,a.length,a[0].length).forEach((function(t){var n=Object(i.a)(t,2),r=n[0],s=n[1];"hide"===a[r][s].state&&e.push([r,s])})))}}}var G=function(e){var t=e.args,n=t.mineCount,a=t.setRevealCount,r=t.setFlagCount,s=t.gameState,c=t.setGameState,i=t.field,o=t.setField,l=t.handleStart,h=t.handleStop;return Object(g.jsx)("table",{className:"field",children:Object(g.jsx)("tbody",{children:i.map((function(e,t){return Object(g.jsx)("tr",{children:e.map((function(e,j){return Object(g.jsx)(N,{args:Object(u.a)(Object(u.a)({},e),{},{rowInd:t,colInd:j,mineCount:n,setRevealCount:a,setFlagCount:r,gameState:s,setGameState:c,field:i,setField:o,handleStart:l,handleStop:h})},j)}))},t)}))})})},J=["Easy","Medium","Hard"],_=["Rows","Columns","Mines"];function Y(e,t){var n=t.rows,a=t.columns,r=t.mines;switch(e){case"mines":return 0<=r&&r<n*a;case"rows":return 0<n&&n<=24;case"columns":return 0<a&&a<=30;default:return!1}}function z(e){switch(e){case"easy":return{rows:9,columns:9,mines:10};case"medium":return{rows:16,columns:16,mines:40};case"hard":return{rows:16,columns:30,mines:99};default:return{rows:10,columns:10,mines:99}}}function A(e){var t=z(e.toLowerCase());return t.rows+"x"+t.columns+", "+t.mines+" mines"}function L(e){return Object(g.jsxs)("div",{className:"density",children:["Mine density:"," ",e.rows>0&&e.columns>0?Math.round(100*e.mines/(e.rows*e.columns))+"%":"N/A"]})}function D(e){switch(e){case"rows":return"Must be between 1 and 24 inclusive.";case"columns":return"Must be between 1 and 30 inclusive.";case"mines":return"Must be fewer mines than cells.";default:return"An unknown error has occured."}}function P(e,t,n,a){var r=t[e];(a>0||r>0)&&n(Object(u.a)(Object(u.a)({},t),{},Object(l.a)({},e,r+a)))}function V(e){var t=e.difficulty,n=e.inputs,a=e.setInputs,r=t.toLowerCase();return Object(g.jsxs)("div",{className:"radio",children:[Object(g.jsx)("input",{type:"radio",id:r,name:"difficulty",value:r,checked:n.difficulty===r,onChange:function(e){return function(e,t,n){n(Object(u.a)(Object(u.a)({},t),{},{difficulty:e.target.value}))}(e,n,a)}}),Object(g.jsxs)("label",{htmlFor:r,children:[Object(g.jsx)("div",{className:"diff",children:t+":"}),Object(g.jsx)("div",{className:"desc",children:A(t)})]})]})}function W(e){var t=e.input,n=e.inputs,a=e.setInputs,r=t.toLowerCase();return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"input",children:[Object(g.jsxs)("label",{htmlFor:r,children:[t,":"]}),Object(g.jsx)("button",{type:"button",onClick:function(){return P(r,n,a,-1)},children:"-"}),Object(g.jsx)("input",{type:"text",id:r,name:r,value:n[r],onChange:function(e){return function(e,t,n,a){var r=e.target.value,s=+r;(function(e){return""===e||/^[0-9\b]+$/.test(e)})(r)&&n(Object(u.a)(Object(u.a)({},t),{},Object(l.a)({},a,s)))}(e,n,a,r)}}),Object(g.jsx)("button",{type:"button",onClick:function(){return P(r,n,a,1)},children:"+"}),Y(r,n)?Object(g.jsx)("span",{style:{color:"green"},children:"\u2713"}):Object(g.jsxs)("span",{className:"toolcontainer",style:{color:"red"},children:["\u2717",Object(g.jsx)("span",{className:"tooltip",children:D(r)})]})]})})}var B=function(e){var t=e.args,n=t.setMineCount,r=t.setRevealCount,s=t.setFlagCount,c=t.setGameState,o=t.setField,l=t.handleReset,u=Object(a.useState)({rows:9,columns:9,mines:10,difficulty:"easy"}),h=Object(i.a)(u,2),j=h[0],d=h[1];return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"options",children:[Object(g.jsxs)("div",{className:"option",children:[Object(g.jsx)("h4",{children:"Standard Game"}),J.map((function(e){return Object(g.jsx)(V,{difficulty:e,inputs:j,setInputs:d},e)})),L(z(j.difficulty)),Object(g.jsx)("button",{type:"button",className:"start",onClick:function(){return function(e,t,n,a,r,s,c){T(z(e),t,n,a,r,s,c)}(j.difficulty,n,r,s,c,o,l)},children:"Start Standard Game"})]}),Object(g.jsxs)("div",{className:"option",children:[Object(g.jsx)("h4",{children:"Custom Game"}),_.map((function(e){return Object(g.jsx)(W,{input:e,inputs:j,setInputs:d},e)})),L(j),Object(g.jsx)("button",{type:"button",className:"start",onClick:function(){return function(e,t,n,a,r,s,c){_.every((function(t){return Y(t.toLowerCase(),e)}))?T(e,t,n,a,r,s,c):alert('Invalid parameters. However over red "x"s for details.')}(j,n,r,s,c,o,l)},children:"Start Custom Game"})]})]})})};var U=function(e){var t=e.txt,n=e.action,r=e.setReset,s=Object(a.useState)(""),c=Object(i.a)(s,2),o=c[0],l=c[1];return Object(g.jsx)("div",{className:"resets",children:Object(g.jsxs)("form",{children:[Object(g.jsx)("label",{htmlFor:"input",children:'Type "'.concat(t,'": ')}),Object(g.jsx)("input",{type:"text",id:"input",name:"input",onChange:function(e){l(e.target.value)}}),Object(g.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault(),o===t?(n(),r("")):alert("Wrong confirmation; not reset.")},children:"Confirm reset"}),Object(g.jsx)("button",{type:"button",onClick:function(){l(""),r("")},children:"Cancel"})]})})};function $(){return Object(g.jsxs)("div",{className:"rules",children:[Object(g.jsx)("h4",{children:"Rules"}),Object(g.jsx)("p",{children:"All cells start covered. Certain cells have mines hidden underneath them. The goal is to uncover all the cells without mines. If you uncover a mine, you lose."}),Object(g.jsx)("p",{children:"When you uncover a non-mine cell, it will show you how many of the (up to 8) adjacent cells contain mines -- or, if there are no adjacent mines, it will automatically uncover all adjacent cells for you."}),Object(g.jsx)("p",{children:"You can mark cells that you think contain mines with a flag by right-clicking on them. Clicking a flagged cell will do nothing -- so you can't accidentally click it later. To unflag a cell, simply right-click it again."}),Object(g.jsx)("p",{children:"If you click an aready-uncovered cell and it's number matches the number of adjacent flags, all other adjecent cells will be uncovered. This can save you some clicks, but isn't necessary."}),Object(g.jsx)("p",{children:"For a custom game, a mine density between 12% and 20% is recommended."}),Object(g.jsxs)("p",{children:["If you like minesweeper, consider"," ",Object(g.jsx)("a",{href:"https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/mines.html",target:"_blank",rel:"noopener noreferrer",children:"this superior implementation"})," ","which guarantees you will never need to guess, and"," ",Object(g.jsx)("a",{href:"https://pwmarcz.pl/kaboom/",target:"_blank",rel:"noopener noreferrer",children:"this neat variation"})," ","which always penalizes a guess, unless guessing is necessary in which case any guess will be fine."]})]})}var q=function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],r=t[1];return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("button",{type:"button",className:"rules-button",onClick:function(){return r(!n)},children:n?"Hide Rules":"Show Rules"}),n&&Object(g.jsx)($,{})]})};function K(e,t){switch(e){case"reset":return"The field is reset. Click anywhere to begin.";case"ongoing":return"The game is in progress.";case"won":return t?"Congratulations, you set a high score!":"Congratulations, you won!";case"lost":return"Uh oh, you uncovered a mine. You lost.";default:return"You found an error!"}}function Q(e){if(e===Number.POSITIVE_INFINITY)return["N/A",""];var t=e%1e3/10;return[Math.floor(e/1e3).toString(),t<10?"0"+t:t.toString()]}var X=function(e){var t=e.args,n=t.m,r=t.n,s=t.time,c=t.highScore,o=t.gameState,l=t.mineCount,u=t.flagCount,h=t.resetHighScore,j=t.resetHighScores,d=Object(a.useState)(""),f=Object(i.a)(d,2),b=f[0],m=f[1],O=Q(s),p=Object(i.a)(O,2),v=p[0],x=p[1],S=Q(c),w=Object(i.a)(S,2),y=w[0],C=w[1],N=s===c;return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("p",{className:"stat",children:[Object(g.jsx)("span",{className:"name",children:"Flags: "}),Object(g.jsx)("span",{className:"value",children:u}),Object(g.jsx)("span",{className:"decimal"})]}),Object(g.jsxs)("p",{className:"stat",children:[Object(g.jsx)("span",{className:"name",children:"Time: "}),Object(g.jsx)("span",{className:"value",children:v}),Object(g.jsx)("span",{className:"decimal",children:"won"===o||"lost"===o?"."+x:""})]}),Object(g.jsxs)("p",{className:"stat",children:[Object(g.jsx)("span",{className:"name",children:"High Score: "}),Object(g.jsx)("span",{className:"value",children:y}),Object(g.jsx)("span",{className:"decimal",children:C&&"."+C})]}),Object(g.jsx)("p",{children:K(o,N)}),""===b&&Object(g.jsxs)("div",{className:"resets",children:[Object(g.jsx)("button",{type:"button",onClick:function(){return m("one")},children:"Reset this high score"}),Object(g.jsx)("button",{type:"button",onClick:function(){return m("all")},children:"Reset all high scores"})]}),"one"===b&&Object(g.jsx)(U,{txt:"reset one",action:function(){return h(n,r,l)},setReset:m}),"all"===b&&Object(g.jsx)(U,{txt:"reset all",action:j,setReset:m}),Object(g.jsx)(q,{})]})};n(15),n(16),n(17),n(18),n(19);var Z=function(){var e=Object(a.useState)(10),t=Object(i.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(0),c=Object(i.a)(s,2),l=c[0],u=c[1],j=Object(a.useState)(0),d=Object(i.a)(j,2),f=d[0],b=d[1],m=Object(a.useState)("reset"),O=Object(i.a)(m,2),p=O[0],v=O[1],x=Object(a.useState)(I(9,9)),S=Object(i.a)(x,2),w=S[0],y=S[1],C=o(),N=C.time,k=C.handleStart,M=C.handleStop,F=C.handleReset,H=h(),R=H.getHighScore,T=H.updateHighScore,E=H.resetHighScore,J=H.resetHighScores,_=R(w.length,w[0].length,n);return Object(a.useEffect)((function(){"ongoing"===p&&l+n===w.length*w[0].length&&(M(),v("won"),T(w.length,w[0].length,n,N))}),[l,n,w,M,p,T,N]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h1",{children:"Minesweeper"}),Object(g.jsx)(B,{args:{setMineCount:r,setRevealCount:u,setFlagCount:b,setGameState:v,setField:y,handleReset:F}}),Object(g.jsx)(G,{args:{mineCount:n,gameState:p,setGameState:v,field:w,setField:y,setRevealCount:u,setFlagCount:b,handleStart:k,handleStop:M}}),Object(g.jsx)(X,{args:{m:w.length,n:w[0].length,time:N,highScore:_,gameState:p,mineCount:n,flagCount:f,resetHighScore:E,resetHighScores:J}})]})};c.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(Z,{})}),document.getElementById("root"))}],[[20,1,2]]]);
//# sourceMappingURL=main.1535077a.chunk.js.map