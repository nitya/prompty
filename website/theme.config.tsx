import { useRouter } from 'next/router'
import { Link, useConfig } from 'nextra-theme-docs'
import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Prompty</span>,
  project: {
    link: 'https://github.com/microsoft/prompty',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/microsoft/prompty',
  footer: {
    text: 'Prompty Documentation',
  },
}

export default config