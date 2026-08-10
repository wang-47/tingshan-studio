

const awards = [
  {
    id: "A001",
    title: "春蚕",
    image: "/awards/A001.jpg",
  },
  {
    id: "A002",
    title: "4022-23",
    image: "/awards/A002.jpg",
  },
  {
    id: "A003",
    title: "红棉",
    image: "/awards/A003.jpg",
  },
  {
    id: "A004",
    title: "4020-21",
    image: "/awards/A004.jpg",
  },
];

export default function AwardsPage() {
  return (
    <main
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "140px 60px 180px",
      }}
    >
      {/* Hero */}
      <section
        style={{
          marginBottom: "180px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            marginBottom: "22px",
          }}
        >
          Awards
        </h1>

        <p
          style={{
            maxWidth: "420px",
            color: "#777",
            lineHeight: "1.9",
            fontSize: "16px",
          }}
        >
          A visual archive of competitions, exhibitions and moments that
          continue to shape our architectural journey.
        </p>
      </section>

      {/* Awards */}
      {awards.map((award, index) => (
        <section
          key={award.id}
          style={{
            display: "flex",
            justifyContent:
              index % 2 === 0 ? "flex-start" : "flex-end",
            marginBottom: "200px",
          }}
        >
          <div
            style={{
              width: "560px",
            }}
          >
            <div
              style={{
                overflow: "hidden",
              }}
            >
              <img
  src={`/tingshan-studio${award.image}`}
  alt={award.title}
  className="award-image"
  style={{
    width: "100%",
    height: "auto",
    display: "block",
    transition: "all .6s ease",
    filter: "saturate(.88) brightness(...)",
  }}
/>
            </div>

            <div
              style={{
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: ".25em",
                  color: "#999",
                  marginBottom: "8px",
                }}
              >
                {award.id}
              </div>

              <div
                style={{
                  fontSize: "15px",
                  color: "#666",
                }}
              >
                {award.title}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <section
        style={{
          paddingTop: "120px",
          borderTop: "1px solid #ececec",
        }}
      >
        <p
          style={{
            color: "#999",
            fontSize: "15px",
          }}
        >
          More to come.
        </p>
      </section>
    </main>
  );
}