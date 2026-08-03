"use client";

import { useEffect, useRef, useState } from "react";

export default function BuildGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = 400;
    canvas.height = 600;

    let blocks: any[] = [
      {
        x: 100,
        y: 550,
        width: 200,
        height: 30,
      },
    ];

    let current = {
      x: 0,
      y: 520,
      width: 200,
      height: 30,
      speed: 3,
    };

    let running = true;


    function draw() {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      // 背景
      ctx.fillStyle = "#eeeeee";
      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      // 已经盖好的楼
      blocks.forEach(block=>{
        ctx.fillStyle="#4a90e2";

        ctx.fillRect(
          block.x,
          block.y,
          block.width,
          block.height
        );
      });


      // 当前楼层
      ctx.fillStyle="#ff8c42";

      ctx.fillRect(
        current.x,
        current.y,
        current.width,
        current.height
      );


      if(running){

        current.x += current.speed;


        if(
          current.x <=0 ||
          current.x+current.width >= canvas.width
        ){
          current.speed *= -1;
        }

      }


      requestAnimationFrame(draw);
    }


    function place(){

      if(!running) return;


      let last =
      blocks[blocks.length-1];


      let left =
      Math.max(
        current.x,
        last.x
      );


      let right =
      Math.min(
        current.x+current.width,
        last.x+last.width
      );


      let overlap =
      right-left;


      if(overlap<=0){

        running=false;
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


      current={
        x:0,
        y:current.y-30,
        width:overlap,
        height:30,
        speed:3
      };

    }


    canvas.onclick=place;


    draw();


  },[]);



  return (
    <div
      style={{
        textAlign:"center",
        padding:"40px"
      }}
    >

      <h1>
        🏢 盖楼小游戏
      </h1>


      <p>
        分数：{score}
      </p>


      {gameOver &&
      <h2>
        游戏结束
      </h2>
      }


      <canvas
        ref={canvasRef}
        style={{
          border:"2px solid black"
        }}
      />


      <p>
        点击鼠标放下楼层
      </p>


    </div>
  );
}