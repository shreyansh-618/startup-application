export default function GridBackground() {
  return (
    <div className="gridbg">
      {Array.from({ length: 12 }).map((_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}
