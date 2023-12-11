import WebLayout from "@/layouts/WebLayout";
import { Tab } from "@headlessui/react";
import withRouteProtect from "@/helpers/withRouteProtect";
import Head from "next/head";
import WarningAlert from "@/components/Alerts/WarningAlert";
import PersonalSettings from "@/components/Settings/PersonalSettings";
import SecuritySettings from "@/components/Settings/SecuritySettings";
import ProfileSettings from "@/components/Client/ProfileSettings";
import PaymentSettings from "@/components/Settings/PaymentSettings";
import NotificationSettings from "@/components/Settings/NotificationSettings";
import AccountDeactivation from "@/components/Settings/AccountDeactivation";

const profileTabs = [
  "Personal",
  "Profile",
  "Security",
  "Billing & Payments",
  "Notifications",
  "Deactivate Account",
];
function ClientProfileSettings() {
  return (
    <>
      <Head>
        <title>Profile Settings | ChainWork</title>
      </Head>
      <WebLayout>
        <main className="relative max-w-screen-2xl mx-auto">
          <WarningAlert>
            <p>
              Your profile is <b>50%</b> completed. Complete your profile to 100% to start
              posting projects.
            </p>
          </WarningAlert>
          <div className="my-4 rounded-md shadow-custom-sm shadow-neutral-300 min-h-[25rem] max-w-7xl mx-auto">
            <Tab.Group as={"div"}>
              <Tab.List as="ul" className={"w-full justify-between flex profile-tabs"}>
                {profileTabs.map((tab, index) => (
                  <Tab key={index} as="li" className={"w-full"}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? " text-primary-700 border-b-2 border-primary-700"
                            : "border-b text-neutral-500 hover:border-neutral-400 hover:text-neutral-700"
                        }
                      >
                        {tab}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels as="div" className={"p-4"}>
                <Tab.Panel tabIndex={-1}>
                  <PersonalSettings />
                </Tab.Panel>
                <Tab.Panel>
                  <ProfileSettings />
                </Tab.Panel>
                <Tab.Panel>
                  <SecuritySettings />
                </Tab.Panel>
                <Tab.Panel>
                  <PaymentSettings />
                </Tab.Panel>
                <Tab.Panel>
                  <NotificationSettings />
                </Tab.Panel>
                <Tab.Panel>
                  <AccountDeactivation />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </main>
      </WebLayout>
    </>
  );
}

export default withRouteProtect(ClientProfileSettings, ["client"]);
