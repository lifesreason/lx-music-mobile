import { View } from 'react-native'

import { createStyle } from '@/utils/tools'
import { useTheme } from '@/store/theme/hook'
import Text from '@/components/common/Text'


interface Props {
  title: string
  children: React.ReactNode | React.ReactNode[]
}

export default ({ title, children }: Props) => {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: theme['c-font-label'] }} size={13} >{title}</Text>
      <View style={{ ...styles.body, backgroundColor: theme['c-content-background'] }}>
        {children}
      </View>
    </View>
  )
}


const styles = createStyle({
  container: {
    paddingHorizontal: 12,
    marginBottom: 14,
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
  title: {
    paddingLeft: 6,
    marginBottom: 8,
    // lineHeight: 16,
  },
  body: {
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 2,
    overflow: 'hidden',
  },
})
