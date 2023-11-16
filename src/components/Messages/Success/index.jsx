export default function Success({ message }) {
  return (
    <div className="w-full absolute top-0 bg-success-200 rounded-t-md py-2 px-2">
      <p className="text-sm text-success-700">{message}</p>
    </div>
  );
}
