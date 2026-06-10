export default function TrustBar() {
  const items = [
    { label: "users powered", value: "2M+" },
    { label: "MAU, zero downtime", value: "1M+" },
    { label: "startups shipped", value: "100+" },
    { label: "AI built for", value: "unicorns" },
  ];

  return (
    <div className="trust">
      <div className="wrap">
        {items.map((item) => (
          <div key={item.value + item.label} className="t">
            <b>{item.value}</b> {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
