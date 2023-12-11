export default function AccountDeactivation() {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-danger-600">Disabling your account will remove your profile.</p>
      <div className="text-end">
        <button
          type="submit"
          className="font-medium px-2 py-1.5 rounded bg-danger-500 text-white text-sm"
        >
          Deactivate Account
        </button>
      </div>
    </div>
  );
}
