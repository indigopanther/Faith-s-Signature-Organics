export default function Loading({ label = 'Loading the good stuff…' }) {
  return (
    <div className="loading-wrap">
      <div className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
