import SecuritySettings from "@/components/Freelancer/Settings/SecuritySettings";
import PersonalSettings from "@/components/Freelancer/Settings/PersonalSettings";
import WebLayout from "@/layouts/WebLayout";
import { Tab } from "@headlessui/react";
import SkillsSettings from "@/components/Freelancer/Settings/SkillsSettings";
import ContactSettings from "@/components/Freelancer/Settings/ContactSettings";
import withRouteProtect from "@/helpers/withRouteProtect";

const profileTabs = [
  "Personal Info",
  "Skills & Experience",
  "Contact Info",
  "Portfolio",
  "Security",
  "Billing & Payments",
  "Notifications",
  "Deactivate Account",
];
function FreelancerProfileSettings() {
  return (
    <WebLayout>
      <main className="max-w-screen-2xl mx-auto">
        <div className="my-4 rounded-md shadow-custom-sm max-w-6xl mx-auto">
          <Tab.Group as={"div"} className={"flex p-4"} vertical>
            <Tab.List as="ul" className={"min-w-fit profile-tabs border-r"}>
              {profileTabs.map((tab, index) => (
                <Tab key={index} as="li">
                  {({ selected }) => (
                    <button className={selected && "profile-tab__selected"}>
                      {tab}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels as="div" className={"h-96 overflow-y-auto w-full p-4"}>
              <Tab.Panel as={"div"} tabIndex={-1}>
                <PersonalSettings />
              </Tab.Panel>
              <Tab.Panel>
                <SkillsSettings />
              </Tab.Panel>
              <Tab.Panel>
                <ContactSettings />
              </Tab.Panel>
              <Tab.Panel>
                <h1 className="font-semibold">Portfolio</h1>
              </Tab.Panel>
              <Tab.Panel>
                <SecuritySettings />
              </Tab.Panel>
              <Tab.Panel>
                <h1 className="font-semibold">Billing & Payments</h1>
              </Tab.Panel>
              <Tab.Panel>
                <h1 className="font-semibold">Notifications</h1>
              </Tab.Panel>
              <Tab.Panel>
                <p className="text-danger-600">
                  Disabling your account will remove your profile.
                </p>
                <div className="text-end">
                  <button
                    type="submit"
                    className="font-medium px-2 py-1.5 rounded bg-danger-500 text-white text-sm"
                  >
                    Deactivate Account
                  </button>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </WebLayout>
  );
}

export default withRouteProtect(FreelancerProfileSettings, ["freelancer"]);
