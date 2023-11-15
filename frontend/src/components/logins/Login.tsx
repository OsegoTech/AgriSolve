import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Login</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>Welcome back!</DialogTitle>
          <DialogDescription className='text-center'>
           Login to your account to access more!
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='Email'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='password' className='text-right'>
              Password
            </Label>
            <Input
              id='password'
              placeholder='Password'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' className='w-full'>Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
