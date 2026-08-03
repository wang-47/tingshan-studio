"use client";

import Image from "next/image";
import type { ElementItem } from "@/app/build-your-space/page";

type Props = {
  elements: ElementItem[];
  onReset: () => void;
};

export default function PosterCanvas({
  elements,
  onReset,
}: Props) {
  return (
    <div>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 500,
          marginBottom: "28px",
        }}
      >
        Poster
      </h2>

      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 5",
          border: "1px solid #ddd",
          background: "#fafafa",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {elements.length === 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#bbb",
              fontSize: "15px",
            }}
          >
            Click an element to start creating
          </div>
        )}

        {elements.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: 30 + (index % 4) * 70,
              top: 30 + Math.floor(index / 4) * 70,
            }}
          >
            <Image
              src={item.src}
              alt=""
              width={48}
              height={48}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "28px",
        }}
      >
        <button
          onClick={onReset}
          style={{
            border: "1px solid #ddd",
            background: "#fff",
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>

        <button
          style={{
            border: "1px solid black",
            background: "black",
            color: "white",
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Export Poster
        </button>
      </div>
    </div>
  );
}