import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
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
import { CircleAlert, HelpCircle, X } from 'lucide-react'

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(true)
  const [isDirty, setIsDirty] = useState(false)
  const [alertDismissed, setAlertDismissed] = useState(false)

  const handleChange = () => {
    setIsDirty(true)
    setAlertDismissed(false)
  }

  const showAlert = isDirty && !alertDismissed

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="" alt="Jane Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <span className="font-medium">Jane Doe</span>
          <Badge>Pro</Badge>
        </div>
      </div>

      <Separator />

      {/* Unsaved changes alert */}
      {showAlert && (
        <Alert>
          <CircleAlert className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>You have unsaved changes.</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 -mr-1"
              onClick={() => setAlertDismissed(true)}
            >
              <X className="h-3 w-3" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Jane Doe" onChange={handleChange} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jane@example.com" onChange={handleChange} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label htmlFor="bio">Bio</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-muted-foreground hover:text-foreground">
                        <HelpCircle className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Displayed on your public profile. Keep it short.</TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="bio"
                  defaultValue="Designer and developer based in San Francisco."
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en" onValueChange={handleChange}>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={(v) => { setEmailNotifications(v); handleChange() }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Marketing emails</span>
                <Switch
                  checked={marketingEmails}
                  onCheckedChange={(v) => { setMarketingEmails(v); handleChange() }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly digest</span>
                <Switch
                  checked={weeklyDigest}
                  onCheckedChange={(v) => { setWeeklyDigest(v); handleChange() }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-sm">Two-factor authentication</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-muted-foreground hover:text-foreground">
                        <HelpCircle className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Adds a second layer of security to your account.</TooltipContent>
                  </Tooltip>
                </div>
                <Switch
                  checked={twoFactor}
                  onCheckedChange={(v) => { setTwoFactor(v); handleChange() }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Session timeout</span>
                <Switch
                  checked={sessionTimeout}
                  onCheckedChange={(v) => { setSessionTimeout(v); handleChange() }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Footer Actions */}
      <div className="flex items-center gap-3">
        <Button onClick={() => setIsDirty(false)}>Save Changes</Button>

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
