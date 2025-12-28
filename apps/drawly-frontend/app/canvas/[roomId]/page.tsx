"use client";
import { initDraw } from "@/app/draw";
import { stat } from "fs";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
     initDraw(canvasRef.current)
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
  );
}
