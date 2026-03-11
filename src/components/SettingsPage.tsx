import { useState } from 'react'
import { Avatar } from '@base-ui/react/avatar'
import { Tabs } from '@base-ui/react/tabs'
import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import { Select } from '@base-ui/react/select'
import { Switch } from '@base-ui/react/switch'
import { Separator } from '@base-ui/react/separator'
import { Button } from '@base-ui/react/button'
import { AlertDialog } from '@base-ui/react/alert-dialog'

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(true)

  return (
    <div>
      {/* Header */}
      <div>
        <Avatar.Root>
          <Avatar.Image src="" alt="Jane Doe" />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar.Root>
        <span>Jane Doe</span>
      </div>

      <Separator />

      {/* Tabs */}
      <Tabs.Root defaultValue="profile">
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
          <Tabs.Tab value="account">Account</Tabs.Tab>
        </Tabs.List>

        {/* Profile Tab */}
        <Tabs.Panel value="profile">
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input defaultValue="Jane Doe" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input type="email" defaultValue="jane@example.com" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Bio</Field.Label>
            <Input defaultValue="Designer and developer based in San Francisco. Passionate about great user experiences." />
          </Field.Root>

          <Field.Root>
            <Field.Label>Language</Field.Label>
            <Select.Root defaultValue="en">
              <Select.Trigger>
                <Select.Value />
              </Select.Trigger>
              <Select.Positioner>
                <Select.Popup>
                  <Select.Item value="en">
                    <Select.ItemText>English</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="es">
                    <Select.ItemText>Spanish</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="fr">
                    <Select.ItemText>French</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="de">
                    <Select.ItemText>German</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="ja">
                    <Select.ItemText>Japanese</Select.ItemText>
                  </Select.Item>
                </Select.Popup>
              </Select.Positioner>
            </Select.Root>
          </Field.Root>

          <div>
            <span>Email notifications</span>
            <Switch.Root
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            >
              <Switch.Thumb />
            </Switch.Root>
          </div>
        </Tabs.Panel>

        {/* Notifications Tab */}
        <Tabs.Panel value="notifications">
          <div>
            <span>Marketing emails</span>
            <Switch.Root
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            >
              <Switch.Thumb />
            </Switch.Root>
          </div>

          <div>
            <span>Weekly digest</span>
            <Switch.Root
              checked={weeklyDigest}
              onCheckedChange={setWeeklyDigest}
            >
              <Switch.Thumb />
            </Switch.Root>
          </div>
        </Tabs.Panel>

        {/* Account Tab */}
        <Tabs.Panel value="account">
          <div>
            <span>Two-factor authentication</span>
            <Switch.Root
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            >
              <Switch.Thumb />
            </Switch.Root>
          </div>

          <div>
            <span>Session timeout</span>
            <Switch.Root
              checked={sessionTimeout}
              onCheckedChange={setSessionTimeout}
            >
              <Switch.Thumb />
            </Switch.Root>
          </div>
        </Tabs.Panel>
      </Tabs.Root>

      <Separator />

      {/* Footer Actions */}
      <div>
        <Button>Save Changes</Button>

        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete Account</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Delete Account</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </AlertDialog.Description>
              <div>
                <AlertDialog.Close>Cancel</AlertDialog.Close>
                <AlertDialog.Close>Confirm Delete</AlertDialog.Close>
              </div>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
    </div>
  )
}
