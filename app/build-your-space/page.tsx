"use client";

import { useEffect, useRef, useState } from "react";



export default function BuildYourSpace(){


const canvasRef = useRef<HTMLCanvasElement>(null);



const [started,setStarted]=useState(false);

const [material,setMaterial]=useState("玻璃幕墙");

const [style,setStyle]=useState("现代主义");


const [score,setScore]=useState(0);

const [gameOver,setGameOver]=useState(false);

const [finished,setFinished]=useState(false);


const [night,setNight]=useState(false);


const [restart,setRestart]=useState(0);



const colors:any={

"玻璃幕墙":"#5b9bd5",

"清水混凝土":"#888888",

"木结构":"#a66a3f",

"金属结构":"#555555"

};



const targetFloor=30;




useEffect(()=>{


if(!started)return;


const canvas=canvasRef.current;

if(!canvas)return;


const ctx = canvas.getContext("2d")!;

if(!ctx)return;



canvas.width=500;

canvas.height=650;



let camera=0;

let running=true;



let blocks:any[]=[

{

x:100,

y:580,

width:300,

height:30

}

];




let current={

x:100,

y:550,

width:300,

height:30,

speed:3

};






function placeBlock(){


if(!running)return;



running=false;



let last=
blocks[blocks.length-1];



let left=Math.max(
current.x,
last.x
);



let right=Math.min(
current.x+current.width,
last.x+last.width
);



let overlap=
right-left;



if(overlap<=0){


setGameOver(true);


return;


}




blocks.push({

x:left,

y:current.y,

width:overlap,

height:30

});



setScore(
blocks.length-1
);





if(blocks.length-1>=targetFloor){


setFinished(true);

running=false;

return;


}





current={


x:100,


y:current.y-30,


width:overlap,


height:30,


speed:
Math.min(
7,
Math.abs(current.speed)+0.15
)


};



setTimeout(()=>{

running=true;

},300);



}




canvas.onclick=placeBlock;






function draw(){


ctx.clearRect(
0,
0,
500,
650
);





// 天空


if(night){


ctx.fillStyle="#111827";


}else{


ctx.fillStyle="#cfeaff";


}



ctx.fillRect(
0,
0,
500,
650
);





// 城市


ctx.fillStyle=
night?
"#374151":
"#d8dde2";



[
[20,360,60,250],
[120,300,80,310],
[250,350,70,260],
[370,280,80,330]

].forEach(b=>{


ctx.fillRect(

b[0],

b[1]+camera*0.2,

b[2],

b[3]

);


});






// 地面


ctx.fillStyle="#555";


ctx.fillRect(

0,

610+camera,

500,

40

);






// 塔吊


ctx.strokeStyle="#555";

ctx.lineWidth=4;



ctx.beginPath();

ctx.moveTo(
400,
100
);

ctx.lineTo(
400,
520
);

ctx.stroke();



ctx.beginPath();

ctx.moveTo(
220,
100
);

ctx.lineTo(
450,
100
);

ctx.stroke();





// 楼层


blocks.forEach((b)=>{


ctx.fillStyle=
colors[material];



ctx.fillRect(

b.x,

b.y+camera,

b.width,

b.height

);





ctx.fillStyle=
night?
"#ffe58a":
"#ffffff";



for(
let x=b.x+15;
x<b.x+b.width-10;
x+=30
){


ctx.fillRect(

x,

b.y+8+camera,

12,

12

);


}



});





// 当前楼层


ctx.fillStyle=
colors[material];


ctx.fillRect(

current.x,

current.y+camera,

current.width,

current.height

);





if(current.y<250){

camera=
250-current.y;

}





if(running){


current.x+=current.speed;



if(
current.x<=0 ||
current.x+current.width>=500
){

current.speed=
-current.speed;


}


}



requestAnimationFrame(draw);


}



draw();



return()=>{

running=false;

};



},[started,restart,night,material]);
const stability =
Math.max(
40,
100-score*2
);



const rating =
score>=30
?
"A+"
:
score>=20
?
"A"
:
score>=10
?
"B"
:
"C";




if(!started){


return(

<div

style={{

height:"100vh",

display:"flex",

flexDirection:"column",

justifyContent:"center",

alignItems:"center",

fontFamily:"Arial",

textAlign:"center"

}}

>


<h1>
🏢 BUILD YOUR SPACE
</h1>



<h2>
设计你的建筑
</h2>



<h3>
选择建筑材料
</h3>



<div>


<button

onClick={()=>setMaterial("玻璃幕墙")}

style={{margin:"5px"}}

>
🪟 玻璃幕墙
</button>



<button

onClick={()=>setMaterial("清水混凝土")}

style={{margin:"5px"}}

>
🧱 清水混凝土
</button>



<button

onClick={()=>setMaterial("木结构")}

style={{margin:"5px"}}

>
🌲 木结构
</button>



<button

onClick={()=>setMaterial("金属结构")}

style={{margin:"5px"}}

>
⚙️ 金属结构
</button>


</div>




<h3>
选择建筑风格
</h3>



<div>


<button

onClick={()=>setStyle("现代主义")}

style={{margin:"5px"}}

>
现代主义
</button>



<button

onClick={()=>setStyle("未来科技")}

style={{margin:"5px"}}

>
未来科技
</button>



<button

onClick={()=>setStyle("极简主义")}

style={{margin:"5px"}}

>
极简主义
</button>



</div>




<p>

当前方案：

{material}

+

{style}

</p>




<button

onClick={()=>setStarted(true)}

style={{

marginTop:"30px",

padding:"18px 70px",

fontSize:"20px",

background:"#222",

color:"#fff",

border:"none",

cursor:"pointer"

}}

>

🏗️ 开始建造

</button>



</div>


)

}






return(


<div

style={{

height:"100vh",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

fontFamily:"Arial"

}}

>


<h1>
🏗️ 正在建造：未来之塔
</h1>



<p>

目标高度：

{targetFloor}层

&nbsp;&nbsp;

当前：

{score}层

</p>




<div>


<button

onClick={()=>setNight(!night)}

style={{

marginBottom:"15px"

}}

>

{

night?

"☀️ 白天模式"

:

"🌙 夜景模式"

}

</button>


</div>





<div

style={{

display:"flex",

gap:"30px",

alignItems:"center"

}}

>



<canvas

ref={canvasRef}

style={{

border:"2px solid #333"

}}

/>






<div

style={{

width:"230px",

padding:"20px",

border:"1px solid #ccc",

background:"#fafafa"

}}

>


<h3>
📐 建筑数据
</h3>


<p>
高度：
{score}层
</p>


<p>
目标：
{targetFloor}层
</p>


<p>
材料：
{material}
</p>


<p>
风格：
{style}
</p>


<p>
稳定度：
{stability}%
</p>


<p>
评级：
{rating}
</p>



</div>



</div>







{


(gameOver || finished) &&


<div

style={{

marginTop:"20px",

padding:"20px",

border:"2px solid #333"

}}

>


<h2>

{

finished

?

"🎉 建筑完成"

:

"🏗️ 建筑结构失败"

}

</h2>




<h3>
📁 建筑作品档案
</h3>


<p>
项目：
未来之塔
</p>


<p>
高度：
{score}层
</p>


<p>
材料：
{material}
</p>


<p>
风格：
{style}
</p>


<p>
综合评分：
{rating}
</p>




<button

onClick={()=>{


setScore(0);

setGameOver(false);

setFinished(false);

setStarted(false);

setRestart(
restart+1
);


}}

style={{

padding:"10px 30px",

cursor:"pointer"

}}

>

重新设计

</button>



</div>


}





</div>


);


}