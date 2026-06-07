import { memo } from 'react'

import { View } from 'react-native'
import { createStyle } from '@/utils/tools'
import Text from '@/components/common/Text'
import { useTheme } from '@/store/theme/hook'

export default memo(({ title, children }: {
  title: string
  children: React.ReactNode | React.ReactNode[]
}) => {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <Text style={styles.title} color={theme['c-font-label']} size={13}>{title}</Text>
      {children}
    </View>
  )
})


const styles = createStyle({
  container: {
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 18,
  },
  title: {
    marginLeft: -2,
    marginBottom: 10,
    // lineHeight: 16,
  },
})
