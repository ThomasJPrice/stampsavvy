import { PricingGrid } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default async function Home() {
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

      <PricingGrid />
    </main>
  );
}
