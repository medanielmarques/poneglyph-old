import { getProviders, getSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import { IconType } from 'react-icons'
import {
  FaDiscord as DiscordIcon,
  FaGithub as GithubIcon,
  FaGoogle as GoogleIcon,
  FaTwitter as TwitterIcon,
} from 'react-icons/fa'

// export async function getServerSideProps(context) {
//   const session = await getSession(cof ntext)
//   if (session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     }
//   }
//   return {
//     props: {
//       providers: await getProviders(context),
//     },
//   }
// }

export async function getInitialProps(context) {
  const { req, res } = context
  const session = await getSession({ req })

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
    return
  }

  return {
    session: undefined,
    providers: await getProviders(context),
    csrfToken: await csrfToken(context),
  }
}

export default function SignInPage({ providers }) {
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

            {Object.values(providers).map((provider) => {
              if (provider.name === 'Email') return

              return <SignInButton appName={provider.name} Icon={DiscordIcon} />
            })}

            <div className='flex flex-wrap gap-3'>
              <SignInButton appName='Discord' Icon={DiscordIcon} />
              <SignInButton appName='Github' Icon={GithubIcon} />
              <SignInButton appName='Google' Icon={GoogleIcon} />
              <SignInButton appName='Twitter' Icon={TwitterIcon} />
            </div>

            <span className='text-gray-500 mx-auto text-center w-72 text-sm'>
              By signing in, you agree to our{' '}
              <span className='text-pink-400 cursor-pointer'>
                Terms of service
              </span>{' '}
              and{' '}
              <span className='text-pink-400 cursor-pointer'>
                Privacy Policy
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const SignInButton = ({
  appName,
  Icon,
}: {
  appName: string
  Icon: IconType
}) => (
  <div className='flex gap-2 text-center items-center py-3 px-14 text-lg font-semibold rounded-md border-slate-700 border-solid border hover:bg-slate-700 cursor-pointer'>
    <Icon size={22} />
    <span>{appName}</span>
  </div>
)
