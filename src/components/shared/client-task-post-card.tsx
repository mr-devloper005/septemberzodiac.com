'use client'

import dynamic from 'next/dynamic'

const TaskPostCard = dynamic(() => import('./task-post-card').then((mod) => mod.TaskPostCard), {
  ssr: false,
  loading: () => <div className="min-w-[260px] h-32 bg-muted/20 rounded-lg animate-pulse" />,
})

export { TaskPostCard }
