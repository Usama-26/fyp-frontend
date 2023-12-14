export default function Chip({ value }) {
  return (
    <span className="px-2 py-1 bg-primary-100  rounded-md text-primary-700 text-xs ">
      <span>{value}</span>
    </span>
  );
}
