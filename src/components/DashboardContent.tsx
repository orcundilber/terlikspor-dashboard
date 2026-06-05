'use client'

import { ReactNode } from 'react'
import { useAutoRefresh } from '@/hooks/useAutoRefresh'

export default function DashboardContent({ children }: { children: ReactNode }) {
  useAutoRefresh(120000) // 2 minutes

  return <>{children}</>
}
