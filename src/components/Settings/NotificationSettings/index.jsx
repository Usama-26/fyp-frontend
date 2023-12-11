export default function NotificationSettings() {
  return (
    <div className="grid grid-cols-3 mx-auto">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Manage your notification preferences here.
        </p>
      </div>
      <fieldset className="border-b border-t border-neutral-200">
        <legend className="sr-only">Notifications</legend>
        <div className="divide-y divide-neutral-200">
          <div className="relative flex items-start pb-4 pt-3.5">
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-neutral-900">
                Comments
              </label>
              <p id="comments-description" className="text-neutral-500">
                Get notified when someones posts a comment on a posting.
              </p>
            </div>
            <div className="ml-3 flex h-6 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
              />
            </div>
          </div>
          <div className="relative flex items-start pb-4 pt-3.5">
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor="candidates" className="font-medium text-neutral-900">
                Candidates
              </label>
              <p id="candidates-description" className="text-neutral-500">
                Get notified when a candidate applies for a job.
              </p>
            </div>
            <div className="ml-3 flex h-6 items-center">
              <input
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
              />
            </div>
          </div>
          <div className="relative flex items-start pb-4 pt-3.5">
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor="offers" className="font-medium text-neutral-900">
                Offers
              </label>
              <p id="offers-description" className="text-neutral-500">
                Get notified when a candidate accepts or rejects an offer.
              </p>
            </div>
            <div className="ml-3 flex h-6 items-center">
              <input
                id="offers"
                aria-describedby="offers-description"
                name="offers"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
