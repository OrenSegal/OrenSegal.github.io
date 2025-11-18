import { Metadata } from 'next'
import SpotifyGenesDemo from '@/components/demos/SpotifyGenesDemo'

export const metadata: Metadata = {
  title: 'Spotify Genes | Oren Segal',
  description: 'Genetic music taste analysis - discover your musical DNA',
}

export default function SpotifyGenesPage() {
  return <SpotifyGenesDemo />
}
