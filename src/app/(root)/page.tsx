import dynamic from 'next/dynamic'
import { Footer } from './_components'

const Scene = dynamic(() => import('./_components/scene/index'), { ssr: false })

export default function Page() {
  return (
    /* Viewport Height: header + GSAP Scroll Trigger + Footer */
    <div className="h-[calc(25vh+5000px+180vh)] w-full grid grid-rows-[25vh_1fr_100vh]">
      <div className="italic grid place-items-center">
        scroll <br /> down
      </div>

      <Scene />

      <Footer />
    </div>
  )
}

export const metadata = {
  title: 'BB8 with Scroll Animation | Just Mila',
}
