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

export function SignUpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Sign Up</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>Create An Account</DialogTitle>
          <DialogDescription className='text-center'>
            Browse the marketplace, create forecasts, and more!
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              type='text'
              placeholder='Pedro Duarte'
              className='col-span-3'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input type='email' id='email' placeholder='Email' className='col-span-3' />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='password' className='text-right'>
              Password
            </Label>
            <Input id='password' type='password' placeholder='Password' className='col-span-3' />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='confirmPassword' className='text-right'>
              Password
            </Label>
            <Input id='confirmPassword' type='password' placeholder='Confirm Password' className='col-span-3' />
          </div>
        </div>

        <DialogFooter>
          <Button type='submit' className='w-full'>
            Sign Up
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
