import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

export const colors = fullConfig.theme.colors

// Helper function to get color from Tailwind class name
export const getTailwindColor = (colorClass) => {
  // colorClass: "red-500" -> colors.red[500]
  const [colorName, shade] = colorClass.split('-')

  return colors[colorName]?.[shade] || '#6B7280'
}
