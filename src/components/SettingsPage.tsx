import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(true)

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="" alt="Jane Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="font-medium">Jane Doe</span>
      </div>

      <Separator />

      {/* Tabs */}
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Jane Doe" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="jane@example.com" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" defaultValue="Designer and developer based in San Francisco. Passionate about great user experiences." />
          </div>

          <div className="space-y-1">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Email notifications</span>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Marketing emails</span>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Weekly digest</span>
            <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Two-factor authentication</span>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Session timeout</span>
            <Switch checked={sessionTimeout} onCheckedChange={setSessionTimeout} />
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Footer Actions */}
      <div className="flex items-center gap-3">
        <Button>Save Changes</Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
