import Image from "next/image";

type Props = {
  onAdd: (src: string) => void;
};

const stickers = [
  { name: "Window", src: "/stickers/architecture/window-01.svg" },
  { name: "Door", src: "/stickers/architecture/door-01.svg" },
  { name: "Arch", src: "/stickers/architecture/arch.svg" },
  { name: "Column", src: "/stickers/architecture/column.svg" },
  { name: "Roof", src: "/stickers/architecture/roof.svg" },
  { name: "Stair", src: "/stickers/architecture/stair.svg" },
  { name: "Tree", src: "/stickers/nature/tree-01.svg" },
  { name: "Cloud", src: "/stickers/nature/cloud.svg" },
  { name: "Sun", src: "/stickers/nature/sun.svg" },
  { name: "Mountain", src: "/stickers/nature/mountain.svg" },
  { name: "Stone", src: "/stickers/nature/stone.svg" },
];

export default function StickerLibrary({ onAdd }: Props) {
  return (
    <div>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 500,
          marginBottom: "28px",
        }}
      >
        Elements
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "18px",
        }}
      >
        {stickers.map((item) => (
          <button
            key={item.name}
            onClick={() => onAdd(item.src)}
            style={{
              border: "1px solid #e5e5e5",
              background: "#fff",
              padding: "18px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Image
              src={item.src}
              alt={item.name}
              width={44}
              height={44}
            />

            <span
              style={{
                fontSize: "12px",
                color: "#666",
              }}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}