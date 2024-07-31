import { Pricing } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser()

  return (
    <main className="p-8">
      <h1>StampSavvy</h1>

      <SignedOut>
        <Button variant='outline'>
          <a href="/sign-up">Sign Up</a>
        </Button>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>

      <Pricing email={user?.emailAddresses[0]?.emailAddress} />
    </main>
  );
}
