import { memo, useMemo } from 'react'
import { createStyle } from '@/utils/tools'
import { useTheme } from '@/store/theme/hook'
import Text from './Text'
// const menuItemHeight = 42
// const menuItemWidth = 100

const styles = createStyle({
  text: {
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 2,
    // lineHeight: 12,
    // marginTop: 2,
    marginRight: 5,
    fontWeight: '400',
    // marginRight: 5,
    // marginBottom: 2,
    // alignSelf: 'flex-start',
    alignSelf: 'center',
  },
})

export type BadgeType = 'normal' | 'secondary' | 'tertiary'

export default memo(({ type = 'normal', children }: {
  type?: BadgeType
  children: string
}) => {
  const theme = useTheme()
  // console.log(visible)
  const colors = useMemo(() => {
    const colors = { textColor: '', bgColor: '' }
    switch (type) {
      case 'normal':
        colors.textColor = theme['c-badge-primary']
        colors.bgColor = theme['c-primary-alpha-900']
        break
      case 'secondary':
        colors.textColor = theme['c-badge-secondary']
        colors.bgColor = theme.isDark ? theme['c-150'] : '#eef6ff'
        break
      case 'tertiary':
        colors.textColor = theme['c-badge-tertiary']
        colors.bgColor = theme.isDark ? theme['c-150'] : '#fff6e5'
        break
    }
    return colors
  }, [type, theme])

  return <Text style={{ ...styles.text, backgroundColor: colors.bgColor }} size={9} color={colors.textColor}>{children}</Text>
})
