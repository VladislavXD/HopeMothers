import toast from 'react-hot-toast'
import React from 'react'

interface CustomToastProps {
  title: string
  description: string
  type: 'success' | 'error'
}

const CustomToast: React.FC<CustomToastProps> = ({ title, description, type }) => (
  <div className="flex flex-col space-y-1">
    <div className={`font-semibold text-sm ${type === 'success' ? 'text-success' : 'text-danger'}`}>
      {title}
    </div>
    <div className={`text-xs ${type === 'success' ? 'text-success/80' : 'text-danger/80'}`}>
      {description}
    </div>
  </div>
)

export const showSuccessToast = (title: string, description: string) => {
  toast.success(
    <CustomToast title={title} description={description} type="success" />,
    {
      duration: 4000,
      position: 'top-center',
      style: {
        background: 'hsl(var(--nextui-success-50))',
        color: 'hsl(var(--nextui-success-900))',
        border: '1px solid hsl(var(--nextui-success-200))',
        padding: '16px',
        borderRadius: '8px',
      },
    }
  )
}

export const showErrorToast = (title: string, description: string) => {
  toast.error(
    <CustomToast title={title} description={description} type="error" />,
    {
      duration: 4000,
      position: 'top-center',
      style: {
        background: 'hsl(var(--nextui-danger-50))',
        color: 'hsl(var(--nextui-danger-900))',
        border: '1px solid hsl(var(--nextui-danger-200))',
        padding: '16px',
        borderRadius: '8px',
      },
    }
  )
}
