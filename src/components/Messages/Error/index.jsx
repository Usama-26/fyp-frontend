export default function Error({ message }) {
  return (
    <div className="w-full absolute top-0 bg-danger-200 rounded-t-md py-2 px-2">
      <p className="text-sm text-danger-700">{message}</p>
    </div>
  );
}
