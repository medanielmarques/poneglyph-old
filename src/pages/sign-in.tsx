import { GetStaticProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  getSession,
  signIn,
} from 'next-auth/react'
import Image from 'next/image'
import {
  FaDiscord as DiscordIcon,
  FaGithub as GithubIcon,
  FaGoogle as GoogleIcon,
  FaTwitter as TwitterIcon,
} from 'react-icons/fa'

export const getStaticProps: GetStaticProps = async () => {
  // const session = await getSession()

  // console.log(session ? true : false)

  // if (session) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: '/',
  //     },
  //   }
  // }

  const providers = await getProviders()

  // const providers = Object.values(resProviders || {}).map(
  //   (provider) => provider
  // )

  return {
    props: {
      providers,
    },
  }
}

export default function SignInPage({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}) {
  return (
    <div className='min-h-screen'>
      <div className='flex min-h-screen flex-col items-center justify-center space-y-8 py-12 sm:px-6 lg:space-y-12 lg:px-8'>
        <Image src='/logo.svg' alt='Poneglyph logo' width={250} height={49} />

        <div
          aria-label='Sign in form'
          className='w-full space-y-4 sm:mx-auto sm:max-w-lg '
        >
          <div className='border-y border-slate-700 bg-slate-800 text-slate-200 py-8 px-4 shadow sm:rounded-lg sm:border-x sm:px-10 flex flex-col gap-7 justify-between'>
            <span className='text-gray-300 mx-auto'>Sign in with</span>

            {providers ? <ProvidersList providers={providers} /> : null}

            <SigninTermsAndPolicy />
          </div>
        </div>
      </div>
    </div>
  )
}

const ProvidersList = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}) => (
  <div className='flex flex-wrap gap-3'>
    {Object.values(providers).map((provider) => (
      <SignInButton key={provider.id} provider={provider} />
    ))}
  </div>
)

const providersIcons: Record<string, JSX.Element> = {
  Discord: <DiscordIcon />,
  GitHub: <GithubIcon />,
  Google: <GoogleIcon />,
  Twitter: <TwitterIcon />,
}

const SignInButton = ({ provider }: { provider: ClientSafeProvider }) => (
  <div
    className='flex gap-2 text-center items-center py-3 px-14 text-lg font-semibold rounded-md border-slate-700 border-solid border hover:bg-slate-700 cursor-pointer'
    onClick={() =>
      signIn(provider.id, {
        callbackUrl: '',
      })
    }
  >
    {providersIcons[provider.name]}
    <span>{provider.name}</span>
  </div>
)

const SigninTermsAndPolicy = () => (
  <span className='text-gray-400 mx-auto text-center w-72 text-sm'>
    By signing in, you agree to our{' '}
    <span className='text-pink-400 cursor-pointer'>Terms of service</span> and{' '}
    <span className='text-pink-400 cursor-pointer'>Privacy Policy</span>
  </span>
)
